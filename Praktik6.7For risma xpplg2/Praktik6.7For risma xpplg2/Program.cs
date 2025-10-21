using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Praktik6._7For_risma_xpplg2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int pilihan;
            do
            {
            // Tampilkan menu
            Console.WriteLine("\n=== Menu Aplikasi ===");
            Console.WriteLine("1. Lihat Data");
            Console.WriteLine("2. Tambah Data");
            Console.WriteLine("3. Keluar");
            Console.WriteLine("Masukkan pilihan Anda (1-3): ");

            // Baca input pengguna
            if (!int.TryParse(Console.ReadLine(), out pilihan))
            {
                Console.WriteLine("Pilihan tidak valid. Harap masukkan angka 1, 2, atau 3.");
                // Tetapkan nilai selain 3 agar loop berlanjut
                pilihan = 0;
                continue;
            }

            // Proses pilihan
            switch (pilihan)
            {
                case 1:
                    Console.WriteLine("Anda memilih: Lihat Data.");
                    break;
                case 2:
                    Console.WriteLine("Anda memilih: Tambah Data.");
                    break;
                    case 3:
                    Console.WriteLine("Programm akan berhenti...");
                    break;
                    break; // Keluar dari switch
                default:
                    Console.WriteLine("Pilihan di jangkauan. Harap masukkan 1, 2, atau 3.");
                    break;
            }

            // Kondisi loop: Lanjutkan selama pilihan BUKAN 3.
             } while (pilihan != 3);
            Console.WriteLine("Terima kasih telah menggunakan aplikasi.");
            
        }
    }
}
