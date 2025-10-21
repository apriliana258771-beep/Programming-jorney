using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Praktik6._8_for_risma_xpplg2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string ulangiPIlihan;

            do
            {
                // --- blok proses yang akan diulang ---
                Console.WriteLine("-----------------------------");
                Console.Write("Masukkan nama anda:  ");
                string nama = Console.ReadLine();
                Console.WriteLine($"Halo, {nama}! Proses telah selesai.");
                // -----------------------------------------------
                // Pertanyaam untuk mengulang
                Console.Write("Apakah anda ingin mengulangi lagi? (ya/tidak): ");
                ulangiPIlihan = Console.ReadLine().ToLower(); // Mengambil input dan mengubah ke huruf kecil

                Console.WriteLine(); // Baris kosong untuk kerapian

                // kondisi diperiksa di akhir: Ulangi selama pengguna mengetik "ya"
            } while (ulangiPIlihan == "ya");
            Console.WriteLine("Terima kasih. Program selesai.");
        }
    }
}
