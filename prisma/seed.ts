import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  await prisma.package.create({
    data: {
      name: "Pranata Komputer Ahli Pertama",
      slug: slugify("Pranata Komputer Ahli Pertama", { lower: true }),
      description:
        "Materi mencakup dasar-dasar teknologi informasi, pemrograman, pengelolaan data, dan manajemen sistem informasi.",
      questions: {
        create: [
          {
            question:
              "Program Powerpoint dapat Anda temukan jika Anda secara berurutan mulai mengklik menu Start, All programs, dan ....",
            answers: {
              create: [
                { answer: "accessories", isCorrect: true },
                { answer: "select" },
                { answer: "menu file" },
                { answer: "open" },
              ],
            },
          },
          {
            question:
              "Jaringan internet secara sederhana dapat didefinisikan sebagai ....",
            answers: {
              create: [
                {
                  answer:
                    "sebuah jaringan yang saling berkaitan antara satu komputer dengan komputer lainnya yang mampu melakukan hubungan telekomunikasi dan atau mengakses informasi",
                  isCorrect: true,
                },
                {
                  answer:
                    "kumpulan pengguna komputer yang memiliki beragam situs atau lokasi suatu jaringan untuk mencari, memperoleh, dan berbagi informasi sesuai keperluan",
                },
                {
                  answer:
                    "peralatan komputer yang memiliki modem yang mampu menghubungkan pengguna lain di berbagai tempat",
                },
                {
                  answer:
                    "komunikasi tanpa kabel yang bisa mengakses jaringan di sejumlah fasilitas koneksi jaringan nirkabel",
                },
              ],
            },
          },
          {
            question: "Tanda { dalam program C++ berfungsi untuk ....",
            answers: {
              create: [
                { answer: "mengawali program", isCorrect: true },
                { answer: "mengakhiri program" },
                { answer: "tidak memiliki argumen" },
                { answer: "cetak" },
              ],
            },
          },
          {
            question:
              "Sekumpulan data yang menyimpan sekumpulan elemen yang bertipe sama disebut ....",
            answers: {
              create: [
                { answer: "prosedur" },
                { answer: "function" },
                { answer: "array", isCorrect: true },
                { answer: "type" },
              ],
            },
          },
          {
            question:
              "Kemampuan program komputer yang menyajikan format multimedia dengan berbagai pendekatan menjadikan media tersebut mampu memberikan pengalaman belajar yang bersifat ....",
            answers: {
              create: [
                { answer: "variasi", isCorrect: true },
                { answer: "realistis" },
                { answer: "logis" },
                { answer: "sistematis" },
              ],
            },
          },
          {
            question:
              "Sebagai salah satu perangkat untuk memasukkan data yang akan diproses komputer disebut perangkat ....",
            answers: {
              create: [
                { answer: "input", isCorrect: true },
                { answer: "output" },
                { answer: "proses" },
                { answer: "memori" },
              ],
            },
          },
          {
            question:
              "Cara menghapus teks pada perintah Delete bisa dilakukan setelah Anda melakukan drag pada ....",
            answers: {
              create: [
                { answer: "semua teks dokumen" },
                { answer: "bagian teks yang salah ketik" },
                { answer: "baris pertama teks" },
                { answer: "teks yang akan dihapus", isCorrect: true },
              ],
            },
          },
          {
            question:
              'Bila Anda harus menghapus huruf E pada kata "KERUPUK", maka Anda dapat melakukannya dengan cara meletakkan kursor di depan huruf E tersebut dan setelah itu menekan tombol keyboard yang dinamakan ....',
            answers: {
              create: [
                { answer: "F4" },
                { answer: "capslock" },
                { answer: "backspace", isCorrect: true },
                { answer: "tab" },
              ],
            },
          },
          {
            question:
              "Sebagai salah satu prosedur yang ditawarkan MS Word dalam membuat tabel adalah melalui ....",
            answers: {
              create: [
                { answer: "drawing" },
                { answer: "insert table", isCorrect: true },
                { answer: "table properties" },
                { answer: "drop down measure in" },
              ],
            },
          },
          {
            question:
              "Cara merubah arah perputaran objek yang telah Anda buat dapat dilakukan dengan menggunakan toolbar drawing, memilih tombol draw, dan kemudian memilih menu ....",
            answers: {
              create: [
                { answer: "free rotate" },
                { answer: "rotate 90 derajat" },
                { answer: "flip horizontal" },
                { answer: "rotate of flip", isCorrect: true },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.package.create({
    data: {
      name: "Penyuluh Agama Ahli Pertama - Penyuluh Agama Islam",
      slug: slugify("Penyuluh Agama Ahli Pertama - Penyuluh Agama Islam", {
        lower: true,
      }),
      description:
        "Soal terkait dakwah, penyuluhan, serta prinsip-prinsip dasar agama Islam yang relevan dengan kehidupan sehari-hari.",
    },
  });
  console.log("\nSeeding packages success...");

  await prisma.user.create({
    data: {
      name: "Administrator",
      email: "admin@gmail.com",
      password: "$2a$10$87SZQutjuTMnrL2D4MH.KOrcgq0yUF5AqH0MfNeWERdGJamXK6ZIO",
    },
  });
  console.log("Seeding users success...");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
