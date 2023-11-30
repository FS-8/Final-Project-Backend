# Express With Mongoose

## Langkah-langkah untuk Membuat Database Express dengan Mongoose

### Persiapan Awal

Pastikan Anda telah menginstal Node.js, Express, dan Mongoose.

1. Inisialisasi proyek Node.js dengan `npm init`.
2. Instal Express dengan perintah `npm install express`.
3. Instal Mongoose dengan perintah `npm install mongoose`.
4. Siapkan struktur proyek Anda dengan folder, file, dan struktur yang sesuai.

### **Model Order**

#### Atribut:

- `user` (Object ID, wajib): Referensi ke Pengguna yang melakukan pesanan.
- `products` (Array, wajib): Array produk dalam pesanan.
  - `product` (Object ID, wajib): Referensi ke Produk dalam pesanan.
  - `name` (String): Nama produk.
  - `quantity` (Number, default: 1): Jumlah produk.
  - `price` (Number): Harga produk.
  - `selectedColor` (String): Warna yang dipilih untuk produk.
  - `selectedSize` (String): Ukuran yang dipilih untuk produk.
- `paymentMethod` (String): Metode pembayaran yang digunakan untuk pesanan.
- `createdAt` (Date): Tanggal ketika pesanan dibuat.

### **Model Produk**

#### Atribut:

- `name` (String, wajib): Nama produk.
- `description` (String, wajib): Deskripsi produk.
- `price` (Number, wajib): Harga produk.
- `images` (Array of Strings, wajib): Array URL gambar untuk produk.
- `category` (String, wajib): Kategori produk.
- `brand` (String): Merek produk.
- `gender` (String): Kategori gender produk.
- `colors` (Array of Strings, wajib): Warna yang tersedia untuk produk.
- `sizes` (Array of Strings, wajib): Ukuran yang tersedia untuk produk.
- `createdAt` (Date): Tanggal ketika produk dibuat.

### **Model Pengguna**

#### Atribut:

- `name` (String, unik): Nama Pengguna.
- `email` (String): Email Pengguna.
- `password` (String): Kata sandi Pengguna.
- `country` (String): Negara Pengguna.
- `phone` (String): Nomor telepon Pengguna.
- `city` (String): Kota Pengguna.
- `address` (String): Alamat Pengguna.
- `kodePos` (String): Kode pos Pengguna.

### **Rute Order**

- `GET /orders`: Dapatkan semua pesanan.
- `GET /orders/:orderId`: Dapatkan pesanan berdasarkan ID.
- `GET /orders/user/:userId`: Dapatkan pesanan berdasarkan ID pengguna.
- `POST /orders/order`: Buat pesanan baru.

### **Rute Produk**

- `GET /products`: Dapatkan semua produk.
- `GET /products/:idProduk`: Dapatkan produk berdasarkan ID.
- `POST /products`: Buat produk baru.
- `PUT /products/:idProduk`: Edit produk berdasarkan ID.
- `DELETE /products/kategori/:kategori`: Dapatkan produk berdasarkan kategori.
- `DELETE /products/:idProduk`: Hapus produk berdasarkan ID.

### **Rute Pengguna**

- `GET /users`: Dapatkan semua pengguna.
- `GET /users/:idPengguna`: Dapatkan pengguna berdasarkan ID.
- `POST /users/daftar`: Daftarkan pengguna baru.
- `POST /users/login`: Login pengguna.
- `PUT /users/:idPengguna`: Edit pengguna berdasarkan ID.
- `GET /users/keranjang/:idPengguna`: Dapatkan keranjang pengguna.
- `PUT /users/keranjang/:idPengguna`: Tambahkan produk ke keranjang pengguna.
- `DELETE /users/keranjang/:idPengguna/:idProduk`: Hapus produk dari keranjang pengguna.
- `POST /users/checkout/:idPengguna`: Checkout pengguna.

### Catatan:

- **Autentikasi**: Beberapa rute mungkin memerlukan autentikasi, gunakan middleware seperti `verifyToken` untuk melindungi rute-rute ini.
- **Otorisasi**: Terapkan otorisasi yang tepat untuk memastikan pengguna hanya dapat mengakses data mereka sendiri.
- **Penanganan Kesalahan**: Terapkan penanganan kesalahan yang sesuai dan kembalikan kode status dan pesan yang tepat.
- **Validasi**: Terapkan validasi input untuk memastikan integritas data.
- **Keterangan**: Dokumentasi ini untuk backend dari proyek akhir ecommerce Anda. Pastikan untuk menyesuaikan dan menambahkan informasi lebih lanjut sesuai kebutuhan proyek Anda.
