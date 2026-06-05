let riwayatVisible = true;
let calendarDate = new Date();
let selectedScheduleDate = new Date();
const weekDays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const showScreen = (screen) => {
    document.querySelectorAll(".main-screen, .diary-screen, .schedule-screen").forEach(el => el.style.display = "none");
    document.getElementById(screen).style.display = "block";
};

function bukaDiary() {
    showScreen("diaryScreen");
    tampilkanDiary();
}

function bukaAgenda() {
    showScreen("scheduleScreen");
    requestNotificationPermission();
    renderCalendar();
    tampilkanAgenda();
    renderNotificationLog();
}

const kembaliKeUtama = () => showScreen("mainScreen");

const escapeHtml = s => String(s).replace(/[&<>"]+/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const createEntry = (text, date, deleteBtn, classes = "") => {
    const div = document.createElement("div");
    div.className = `entry ${classes}`;
    div.innerHTML = `<p>${escapeHtml(text)}</p><span class="date">${escapeHtml(date)}</span>${deleteBtn}`;
    return div;
};

function simpanDiary() {
    const input = document.getElementById("diaryInput").value.trim();
    if (!input) return alert("Isi dulu bang diarynya!");

    const diary = JSON.parse(localStorage.getItem("diary")) || [];
    diary.unshift({ text: input, date: new Date().toLocaleString() });
    localStorage.setItem("diary", JSON.stringify(diary));
    document.getElementById("diaryInput").value = "";
    tampilkanDiary();
}

function renderCalendar() {
    const g = document.getElementById("calendarGrid");
    if (!g) return;
    g.innerHTML = "";
    const y = calendarDate.getFullYear(), m = calendarDate.getMonth();
    const fd = new Date(y, m, 1).getDay(), dm = new Date(y, m + 1, 0).getDate();
    const today = new Date().toDateString(), sel = selectedScheduleDate.toDateString();
    document.getElementById("calendarMonth").textContent = `${monthNames[m]} ${y}`;
    document.getElementById("selectedDateLabel").textContent = selectedScheduleDate.toLocaleDateString();
    document.getElementById("agendaTanggal").value = selectedScheduleDate.toISOString().slice(0, 10);
    weekDays.forEach(d => { const e = document.createElement("div"); e.className = "calendar-weekday"; e.textContent = d; g.appendChild(e); });
    for (let i = 0; i < fd; i++) g.appendChild(Object.assign(document.createElement("div"), { className: "day-empty" }));
    for (let d = 1; d <= dm; d++) {
        const dt = new Date(y, m, d), el = document.createElement("div");
        el.className = "calendar-day"; el.textContent = d;
        if (dt.toDateString() === today) el.classList.add("today");
        if (dt.toDateString() === sel) el.classList.add("selected");
        el.onclick = () => pilihTanggal(y, m, d);
        g.appendChild(el);
    }
}

const pilihTanggal = (y, m, d) => { selectedScheduleDate = new Date(y, m, d); document.getElementById("agendaTanggal").value = selectedScheduleDate.toISOString().slice(0, 10); document.getElementById("selectedDateLabel").textContent = selectedScheduleDate.toLocaleDateString(); renderCalendar(); };
const ubahBulan = d => { calendarDate.setMonth(calendarDate.getMonth() + d); renderCalendar(); };

function tampilkanDiary() {
    const list = document.getElementById("daftarDiary"), hist = document.getElementById("riwayatHapus"), title = document.getElementById("riwayatTitle");
    list.innerHTML = hist.innerHTML = "";
    const d = JSON.parse(localStorage.getItem("diary")) || [], del = JSON.parse(localStorage.getItem("deletedDiary")) || [];
    d.forEach((i, x) => list.appendChild(createEntry(i.text, i.date, `<button class="delete-button" onclick="hapusDiary(${x})">Hapus</button>`)));
    if (!riwayatVisible) {
        hist.style.display = "none";
        document.getElementById("kosongkanRiwayat").style.display = "none";
        title.textContent = "Riwayat Hapusan ▼";
        return;
    }
    hist.style.display = "block";
    document.getElementById("kosongkanRiwayat").style.display = "inline-block";
    title.textContent = "Riwayat Hapusan ▲";
    hist.innerHTML = del.length ? "" : '<p class="empty-state">Belum ada riwayat hapusan.</p>';
    del.forEach((i, x) => hist.appendChild(createEntry(i.text, `Dihapus: ${i.date}`, `<button class="delete-button" onclick="hapusRiwayat(${x})">Hapus permanen</button>`, "history-entry")));
}

function hapusDiary(index) {
    const diary = JSON.parse(localStorage.getItem("diary")) || [];
    const deletedDiary = JSON.parse(localStorage.getItem("deletedDiary")) || [];
    const removed = diary.splice(index, 1)[0];
    if (removed) {
        deletedDiary.unshift({ text: removed.text, date: new Date().toLocaleString() });
        localStorage.setItem("deletedDiary", JSON.stringify(deletedDiary));
    }
    localStorage.setItem("diary", JSON.stringify(diary));
    riwayatVisible = true;
    tampilkanDiary();
}

const hapusRiwayat = i => { const d = JSON.parse(localStorage.getItem("deletedDiary")) || []; d.splice(i, 1); localStorage.setItem("deletedDiary", JSON.stringify(d)); tampilkanDiary(); };
const kosongkanRiwayat = () => { if (confirm("Yakin ingin menghapus semua riwayat hapusan?")) { localStorage.removeItem("deletedDiary"); tampilkanDiary(); } };
const toggleRiwayat = () => { riwayatVisible = !riwayatVisible; tampilkanDiary(); };

function simpanAgenda() {
    const judul = document.getElementById("agendaJudul").value.trim();
    const tanggal = document.getElementById("agendaTanggal").value;
    const waktu = document.getElementById("agendaWaktu").value;
    const deskripsi = document.getElementById("agendaDeskripsi").value.trim();

    if (!judul || !tanggal || !waktu) return alert("Isi judul, tanggal, dan waktu terlebih dahulu.");

    const datetime = new Date(`${tanggal}T${waktu}`);
    if (isNaN(datetime)) return alert("Tanggal atau waktu tidak valid.");

    const agenda = JSON.parse(localStorage.getItem("agenda")) || [];
    agenda.push({ id: Date.now(), title: judul, description: deskripsi, datetime: datetime.toISOString(), notified: false });
    localStorage.setItem("agenda", JSON.stringify(agenda));

    document.getElementById("agendaJudul").value = document.getElementById("agendaTanggal").value = document.getElementById("agendaWaktu").value = document.getElementById("agendaDeskripsi").value = "";
    selectedScheduleDate = calendarDate = new Date();
    renderCalendar();
    tampilkanAgenda();
}

function tampilkanAgenda() {
    const daftar = document.getElementById("daftarAgenda");
    if (!daftar) return;
    daftar.innerHTML = "";
    let agenda = JSON.parse(localStorage.getItem("agenda")) || [];
    agenda.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    if (agenda.length === 0) { daftar.innerHTML = '<p class="empty-state">Belum ada agenda. Tambahkan agenda baru.</p>'; return; }
    agenda.forEach(item => {
        const d = new Date(item.datetime);
        const ds = `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        const el = document.createElement("div");
        el.className = "entry schedule-entry";
        el.innerHTML = `<h4>${item.title}</h4><p>${item.description || "Tidak ada deskripsi."}</p><span class="date">${ds}</span><button class="delete-button" onclick="hapusAgenda(${item.id})">Hapus Agenda</button>`;
        daftar.appendChild(el);
    });
}

const hapusAgenda = id => { let a = JSON.parse(localStorage.getItem("agenda")) || []; localStorage.setItem("agenda", JSON.stringify(a.filter(i => i.id !== id))); tampilkanAgenda(); };

const requestNotificationPermission = () => { if ("Notification" in window && Notification.permission !== "granted") Notification.requestPermission(); };
const showNotificationBanner = m => { const b = document.getElementById("notificationBanner"); if (b) { b.textContent = m; b.style.display = "block"; setTimeout(() => b.style.display = "none", 10000); } };
const getNotificationLog = () => JSON.parse(localStorage.getItem("notificationLog")) || [];
function renderNotificationLog() {
    const c = document.getElementById("notificationLog");
    if (!c) return;
    const log = getNotificationLog();
    c.innerHTML = log.length ? "" : '<p class="empty-state">Belum ada notifikasi.</p>';
    log.forEach(i => {
        const d = new Date(i.datetime), ds = `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        const el = document.createElement("div");
        el.className = "entry";
        el.innerHTML = `<h4>${i.title}</h4><p>${i.description || "Tidak ada deskripsi."}</p><span class="date">${ds}</span>`;
        c.appendChild(el);
    });
}
const addNotificationLog = i => { const l = getNotificationLog(); l.unshift({ title: i.title, description: i.description, datetime: i.datetime, createdAt: new Date().toISOString() }); localStorage.setItem("notificationLog", JSON.stringify(l.slice(0, 10))); renderNotificationLog(); };
const kirimNotifikasi = i => { const m = i.description ? `${i.title}: ${i.description}` : i.title; showNotificationBanner(`Agenda: ${m}`); addNotificationLog(i); ("Notification" in window && Notification.permission === "granted") ? new Notification("Waktu Agendamu", { body: m }) : alert(`Waktu agenda: ${i.title}\n${i.description || ""}`); };

const checkNotifikasi = () => { let a = JSON.parse(localStorage.getItem("agenda")) || [], u = false; a = a.map(i => { if (!i.notified && new Date(i.datetime).getTime() <= Date.now()) { kirimNotifikasi(i); u = true; return { ...i, notified: true }; } return i; }); if (u) { localStorage.setItem("agenda", JSON.stringify(a)); tampilkanAgenda(); } };
const startNotificationChecker = () => { requestNotificationPermission(); checkNotifikasi(); setInterval(checkNotifikasi, 60000); };
startNotificationChecker();
renderNotificationLog();
tampilkanDiary();