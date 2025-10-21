using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TUGAS2_risma_xpplg2
{
    internal class Program
    {
        // Fungsi menghitung rata-rata dari 3 nilai
        static double RataRata(double a, double b, double c)
        {
            double hasil = (a + b + c) / 3;
            return hasil; // mengembalikan nilai
        }

        static void Main(string[] args)
        {
            Console.Write("Masukkan nilai pertama: ");
            double n1 = double.Parse(Console.ReadLine());
            Console.Write("Masukkan nilai kedua: ");
            double n2 = double.Parse(Console.ReadLine());
            Console.Write("Masukkan nilai ketiga: ");
            double n3 = double.Parse(Console.ReadLine());

            // Panggil fungsi dan simpan hasilnya
            double hasilRata = RataRata(n1, n2, n3);

            // Tampilkan hasil ke layar
            Console.WriteLine("Hasil rata-rata: " + hasilRata);
        }

    }
}