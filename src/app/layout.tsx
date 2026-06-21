import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Bán Nhà Điện Biên Phủ - 279m² Trường An, Huế | Giá 5.5 Tỷ - Có Dòng Tiền 12Tr/Tháng",
  description:
    "Lô đất 279m² tại 2/13/293 Đường Điện Biên Phủ, P. Trường An, TP Huế. Nhà cấp 4 + 5 phòng trọ cho thuê full 12tr/tháng. Sổ hồng chính chủ, ô tô vào tận sân. Giá 5.5 tỷ.",
  keywords: [
    "bán đất Điện Biên Phủ Huế",
    "đất Trường An Huế",
    "nhà có dòng tiền Huế",
    "đầu tư bất động sản Huế",
    "bán nhà trọ Huế",
    "đất 279m2 Huế",
  ],
  openGraph: {
    title: "Bán Nhà Điện Biên Phủ - 279m² Trường An, Huế | Giá 5.5 Tỷ",
    description:
      "Nhà cấp 4 + 5 phòng trọ cho thuê 12tr/tháng. Sổ hồng chính chủ, ô tô vào tận sân.",
    type: "website",
    locale: "vi_VN",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  )
}
