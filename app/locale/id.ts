import { ErrorCode } from "Services/data.ts"

import { errTitle, errMsg } from "Modules/strings.ts"

export default {
  DESA_PROFILE_WEBSITE_TITLE: "Website Resmi {{desa_fullname}}",
  DESA_PROFILE_PAGE_TITLE: "{{ page_name }} | Website Resmi {{desa_fullname}}",
  DESA_PROFILE_FULLNAME: "{{desa_alias}} {{desa_name}}",
  DESA_PROFILE_BANNER_DEFAULT_TEXT:
    "Banner Halaman {{page_name}} {{desa_fullname}}",
  DESA_PROFILE_ORGANIZATION_NAME: "Pemerintah {{desa_fullname}}",
  DESA_PROFILE_DESCRIPTION_FALLBACK:
    "Website Resmi {{desa_fullname}}, bekerja sama dengan DIGIDES",

  ARTICLE_AUTHOR_FALLBACK: "Admin {{desa_fullname}}",

  /* -------------------------------------------------------------------------- */
  /*                                 Error Title                                */
  /* -------------------------------------------------------------------------- */

  [errTitle(ErrorCode.AttachmentExtension)]: "Ekstensi file tidak diizinkan",
  [errTitle(ErrorCode.AttachmentNumberLimit)]: "Melewati batas jumlah file",
  [errTitle(ErrorCode.AttachmentSizeLimit)]: "Melewati batas ukuran file",

  // auth
  [errTitle(ErrorCode.BlockedUser)]: "Pengguna diblokir",
  [errTitle(ErrorCode.InactiveUser)]: "Pengguna belum terverifikasi",
  [errTitle(ErrorCode.EmptyCredential)]: "Kredensial kosong",
  [errTitle(ErrorCode.NotRegistered)]: "User belum terdaftar",
  [errTitle(ErrorCode.WrongCredential)]: "Kredensial salah",
  [errTitle(ErrorCode.RetryCooldown)]: "Salah password berturut-turut",
  [errTitle(ErrorCode.UnsupportedService)]: "Layanan belum beroperasi",

  // otp
  [errTitle(ErrorCode.WrongOTP)]: "Gagal verifikasi OTP",

  // captcha
  [errTitle(ErrorCode.CaptchaError)]: "Gagal verifikasi captcha",

  // fetch error
  [errTitle(ErrorCode.FailedFetch)]: "Gagal melakukan koneksi",
  [errTitle(ErrorCode.Timeout)]: "Masalah koneksi",

  // general error
  [errTitle(ErrorCode.Internal)]: "Terjadi kesalahan",
  [errTitle(ErrorCode.BadRequest)]: "Masalah penginputan",
  [errTitle(ErrorCode.OtherError)]: "Terjadi kesalahan",
  [errTitle(ErrorCode.NotInsertedError)]: "Gagal menginput data",
  [errTitle(ErrorCode.Unauthorized)]: "Akses tidak diizinkan",
  [errTitle(ErrorCode.Forbidden)]: "Akses tidak diizinkan",
  [errTitle(ErrorCode.NotFound)]: "Tidak ditemukan",
  [errTitle(ErrorCode.Conflict)]: "Konflik data",
  [errTitle(ErrorCode.PayloadTooLarge)]: "Melewati batas ukuran data",
  [errTitle(ErrorCode.BadGateway)]: "Gateway gagal",
  [errTitle(ErrorCode.GatewayTimeout)]: "Gateway gagal",
  [errTitle(ErrorCode.Unavailable)]: "Layanan tidak tersedia",
  [errTitle(ErrorCode.MethodNotAllowed)]: "Operasi tidak diizinkan",
  [errTitle(ErrorCode.NotImplemented)]: "Belum terimplementasi",
  [errTitle(ErrorCode.Ok)]: "Berhasil",

  /* -------------------------------------------------------------------------- */
  /*                                Error Message                               */
  /* -------------------------------------------------------------------------- */

  [errMsg(ErrorCode.AttachmentExtension)]: "Ekstensi file tidak diizinkan",
  [errMsg(ErrorCode.AttachmentNumberLimit)]: "Hanya boleh mengupload satu file",
  [errMsg(ErrorCode.AttachmentSizeLimit)]:
    "File tidak boleh lebih besar dari 2MB",

  // auth
  [errMsg(ErrorCode.BlockedUser)]:
    "Pengguna tidak diizinkan untuk masuk ke platform",
  [errMsg(ErrorCode.InactiveUser)]:
    "Hubungi administrator DIGIDES untuk mengaktifkan akun",
  [errMsg(ErrorCode.EmptyCredential)]: "Isi data kredensial terlebih dahulu",
  [errMsg(ErrorCode.NotRegistered)]:
    "Daftarkan diri anda sebelum masuk ke platform DIGIDES",
  [errMsg(ErrorCode.WrongCredential)]: "Identitas atau password salah",
  [errMsg(ErrorCode.RetryCooldown)]:
    "Harus menunggu sebelum bisa melakukan login kembali",
  [errMsg(ErrorCode.UnsupportedService)]:
    "Layanan belum didukung atau tidak aktif",

  // otp
  [errMsg(ErrorCode.WrongOTP)]: "Pastikan PIN yang diisi sudah benar",

  // captcha
  [errMsg(ErrorCode.CaptchaError)]:
    "Anda terindikasi menggunakan bot. Jika ini tidak benar, silakan hubungi administrator DIGIDES",

  // fetch error
  [errMsg(ErrorCode.FailedFetch)]:
    "Terjadi masalah atau gangguan saat menghubungi server",
  [errMsg(ErrorCode.Timeout)]: "Pastikan jaringan anda stabil dan coba lagi",

  // general error
  [errMsg(ErrorCode.Internal)]:
    "Server mengalami kendala saat memproses permintaan anda",
  [errMsg(ErrorCode.BadRequest)]: "Pastikan data yang dimasukkan sudah benar",
  [errMsg(ErrorCode.OtherError)]: "Masalah tidak dikenali",
  [errMsg(ErrorCode.NotInsertedError)]:
    "Terjadi kesalahan yang menyebabkan data gagal diinput ke server",
  [errMsg(ErrorCode.Unauthorized)]: "Kredensial pengguna tidak ditemukan",
  [errMsg(ErrorCode.Forbidden)]: "Kredensial pengguna ditolak",
  [errMsg(ErrorCode.NotFound)]: "Data yang anda akses tidak ditemukan",
  [errMsg(ErrorCode.Conflict)]:
    "Dibatalkan karena akan menimbulkan konflik data",
  [errMsg(ErrorCode.PayloadTooLarge)]: "Data yang dikirimkan terlalu besar",
  [errMsg(ErrorCode.BadGateway)]: "Gateway menerima respon invalid",
  [errMsg(ErrorCode.GatewayTimeout)]: "Gateway mengalami timeout",
  [errMsg(ErrorCode.Unavailable)]:
    "Layanan sedang tidak tersedia atau tidak aktif",
  [errMsg(ErrorCode.MethodNotAllowed)]:
    "Jika anda menerima pesan ini, tolong hubungi administrator DIGIDES",
  [errMsg(ErrorCode.NotImplemented)]:
    "Jika anda menerima pesan ini, tolong hubungi administrator DIGIDES",
  [errMsg(ErrorCode.Ok)]: "OK",
} as const
