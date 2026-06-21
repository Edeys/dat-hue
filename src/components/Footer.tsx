import { siteConfig } from "@/lib/content"

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">📍 Thông tin liên hệ</h3>
            <div className="space-y-3 text-zinc-400 text-sm">
              <p>Địa chỉ: {siteConfig.address}</p>
              <p>Điện thoại: <a href={`tel:${siteConfig.phoneRaw}`} className="text-amber-400 hover:underline">{siteConfig.phone}</a></p>
              <p>Zalo: <a href={`https://zalo.me/${siteConfig.zalo}`} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">{siteConfig.phone}</a></p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">🔗 Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#gallery" className="text-zinc-400 hover:text-amber-400 transition-colors">Hình ảnh thực tế</a></li>
              <li><a href="#calculator" className="text-zinc-400 hover:text-amber-400 transition-colors">Tính lợi nhuận</a></li>
              <li><a href="#location" className="text-zinc-400 hover:text-amber-400 transition-colors">Vị trí & tiện ích</a></li>
              <li><a href="#faq" className="text-zinc-400 hover:text-amber-400 transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#form" className="text-zinc-400 hover:text-amber-400 transition-colors">Đăng ký tư vấn</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">🗺️ Bản đồ</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://maps.app.goo.gl/5T21CrqvFgCtSgvd6" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-400 transition-colors">📍 Xem vị trí trên Google Maps</a></li>
              <li><a href="https://maps.app.goo.gl/p5NL3gfM1vKLRBWbA" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-400 transition-colors">📷 Street View hẻm vào</a></li>
              <li><a href="https://photos.app.goo.gl/R7Twk51f78Pp11bR8" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-400 transition-colors">🖼️ Album ảnh đầy đủ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 text-center text-zinc-500 text-xs">
          <p className="mb-2">© 2026 {siteConfig.address}. Tất cả quyền được bảo lưu.</p>
          <p>Thông tin trên website chỉ mang tính tham khảo. Vui lòng liên hệ trực tiếp để xác nhận thông tin chính xác nhất.</p>
        </div>
      </div>
    </footer>
  )
}
