# Naiera IAM Theme

**Naiera IAM Theme** adalah tema kustom untuk Keycloak yang dirancang khusus untuk ekosistem aplikasi **[Super App Naiera](https://naiera.bumigirindhra.my.id)** (Kabupaten Naiera). Tema ini dibangun menggunakan teknologi modern seperti React, Tailwind CSS, dan Keycloakify untuk menghasilkan antarmuka autentikasi yang cepat, responsif, dan estetik.

## 🚀 Fitur Utama

-   **Branding Kustom**: Desain UI yang disesuaikan dengan identitas visual Kabupaten Naiera (Warna Emerald, Logo Resmi).
-   **Modern & Responsif**: Dibangun dengan Tailwind CSS, memastikan tampilan yang optimal di desktop dan mobile.
-   **Dukungan Bahasa Indonesia**: Terjemahan lengkap dan kustomisasi pesan untuk pengguna lokal (i18n).
-   **Template Email Kustom**: Template email verifikasi, reset password, dll., yang selaras dengan branding aplikasi.
-   **Komponen UI**: Menggunakan komponen UI modern (Shadcn-like) untuk input, tombol, dan elemen interaktif lainnya.

## 🛠 Teknologi

Project ini dibangun di atas stack teknologi berikut:

-   [**Keycloakify**](https://keycloakify.dev) - Alat untuk membuat tema Keycloak dengan React.
-   [**React**](https://react.dev) - Pustaka UI untuk membangun komponen antarmuka.
-   [**Tailwind CSS**](https://tailwindcss.com) - Framework CSS utility-first untuk styling cepat dan konsisten.
-   [**Vite**](https://vitejs.dev) - Build tool frontend yang sangat cepat.
-   [**Lucide React**](https://lucide.dev) - Ikon set yang bersih dan ringan.

## 📦 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

-   [Node.js](https://nodejs.org/) (versi 18 atau lebih baru disarankan)
-   [NPM](https://www.npmjs.com/) atau [Yarn](https://yarnpkg.com/)
-   [Java Development Kit (JDK)](https://adoptium.net/) (diperlukan hanya untuk build output `.jar` akhir)
-   [Docker](https://www.docker.com/) (opsional, untuk menjalankan environment testing Keycloak lokal)

## 💻 Instalasi & Pengembangan

1.  **Clone Repository**

    ```bash
    git clone https://github.com/FUA26/naiera_iam.git
    cd naiera-iam-theme
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Jalankan Storybook (Mode Pengembangan UI)**

    Cara terbaik untuk mendesain dan melihat perubahan UI secara real-time tanpa perlu menjalankan server Keycloak penuh.

    ```bash
    npm run storybook
    ```

    Akses Storybook di `http://localhost:6006`.

4.  **Jalankan Keycloak Lokal (Testing Integrasi)**

    Untuk melihat bagaimana tema bekerja langsung di dalam Keycloak.

    ```bash
    npx keycloakify start-keycloak
    ```

    Perintah ini akan mendownload dan menjalankan container Docker Keycloak dengan tema yang terpasang secara otomatis.

## 🏗️ Build & Deployment

Untuk menghasilkan file tema yang siap di-deploy ke server Keycloak produksi (`.jar`):

```bash
npm run build-keycloak-theme
```

Output file akan berada di folder `dist_keycloak/`. Anda akan mendapatkan file seperti:

-   `keycloak-theme-for-kc-22-to-25.jar`
-   `keycloak-theme-for-kc-all-other-versions.jar`

**Cara Deploy:**

1.  Ambil file `.jar` yang sesuai dengan versi Keycloak server Anda.
2.  Salin file tersebut ke folder `/opt/keycloak/providers/` di server Keycloak Anda.
3.  Jalankan perintah build Keycloak (jika diperlukan) atau restart layanan Keycloak.
    ```bash
    bin/kc.sh build
    ```
4.  Masuk ke Admin Console Keycloak, pilih Realm, pergi ke **Realm Settings > Themes**, dan pilih **naiera-iam-theme** untuk Login, Account, Admin, dan Email theme.

## 📂 Struktur Proyek

-   `src/login/`: Komponen dan logika untuk halaman Login (Sign In, Register, Forgot Password, dll).
    -   `Template.tsx`: Layout utama halaman login.
    -   `pages/`: Implementasi halaman spesifik (misal: `Login.tsx`, `Register.tsx`).
    -   `i18n.id.ts`: File translasi Bahasa Indonesia.
-   `src/account/`: Tema untuk halaman Account Management pengguna.
-   `src/email/`: Template HTML untuk email notifikasi.
-   `src/components/`: Komponen React reusable (Button, Input, dll).
-   `src/assets/`: Aset statis seperti gambar dan logo.

## 🔗 Link Terkait

-   [Website Super App Naiera](https://naiera.bumigirindhra.my.id)
-   [Dokumentasi Keycloakify](https://docs.keycloakify.dev/)

---

&copy; 2026 Pemerintah Kabupaten Naiera. All rights reserved.
