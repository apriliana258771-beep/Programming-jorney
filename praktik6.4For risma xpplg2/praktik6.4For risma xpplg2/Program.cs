using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace praktik6._4For_risma_xpplg2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //1.Inisialisasi variabel penghitung(counter)
            int hitungan = 5;

            Console.WriteLine("Memulai hitungan mundur:");
            // 2. Perulangan 'while'
            // Kondisi: Selama nilai 'hitungan' lebih besar dari 0
            while (hitungan > 0)
            {
                // Blok kode di dalam perulangan
                Console.WriteLine($"Hitungan: {hitungan}");

                // 3. Update variabel penghitungan (decrement/pengurangan)
                // Ini PENTING agar perulangan tidak menjadi loop tak terbatas (infinite loop)
                hitungan = hitungan - 1;
                // atau bisa juga ditulis: hitungan--;
            }
            // Kode setelah perulangan selesai
            Console.WriteLine("Selesai! Hitungan mundur telah berakhir.");
        }
    }
}
