"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { locationContent } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const routeRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const roadsRef = useRef<HTMLDivElement>(null)
  const streetViewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: headlineRef.current, start: "top 85%", onEnter: () => {
        gsap.fromTo(headlineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      }})

      const routeItems = routeRef.current?.querySelectorAll(".route-step")
      if (routeItems) {
        gsap.fromTo(routeItems, { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.15, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: routeRef.current, start: "top 80%" } })
      }

      const amenityItems = gridRef.current?.querySelectorAll(".amenity-item")
      if (amenityItems) {
        gsap.fromTo(amenityItems, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: gridRef.current, start: "top 80%" } })
      }

      const roadItems = roadsRef.current?.querySelectorAll(".road-item")
      if (roadItems) {
        gsap.fromTo(roadItems, { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: roadsRef.current, start: "top 85%" } })
      }

      const svItems = streetViewRef.current?.querySelectorAll(".sv-photo")
      if (svItems) {
        gsap.fromTo(svItems, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: streetViewRef.current, start: "top 80%" } })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="location" className="py-20 bg-zinc-900 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4">
        <h2 ref={headlineRef} className="text-3xl md:text-4xl font-bold text-white text-center mb-4 opacity-0">
          {locationContent.headline}
        </h2>
        <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-3">{locationContent.description}</p>

        <div className="bg-zinc-800/50 border border-zinc-700/30 rounded-2xl p-4 md:p-6 mb-8 text-center">
          <p className="text-amber-400 font-semibold text-lg">📍 {locationContent.subheadline}</p>
          <p className="text-zinc-400 text-sm mt-1">
            {locationContent.alley.fromMain} | Hẻm rộng {locationContent.alley.width} - {locationContent.alley.note}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>🚶</span> Lộ trình từ đầu hẻm vào lô đất
            </h3>
            <div ref={routeRef} className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700/30 mb-5">
              <div className="relative">
                <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-amber-500/30" />
                {[
                  { label: "Đường Điện Biên Phủ", icon: "🛣️", desc: "Trục đường huyết mạch của TP Huế" },
                  { label: "Rẽ vào kiệt 293", icon: "↪️", desc: "Hẻm bê tông, ô tô vào được" },
                  { label: "Đi thẳng 50m", icon: "🚶", desc: "Đường hẻm 2.3m, dân cư ổn định" },
                  { label: "Đến số 2/13/293", icon: "🏠", desc: "Lô đất 279m² + nhà + dãy trọ" },
                ].map((step, i) => (
                  <div key={i} className="route-step opacity-0 relative flex items-start gap-4 pb-5 last:pb-0">
                    <div className="relative z-10 w-8 h-8 rounded-full bg-zinc-800 border-2 border-amber-500/50 flex items-center justify-center text-sm shrink-0">
                      {step.icon}
                    </div>
                    <div className="pt-1">
                      <p className="text-white font-medium">{step.label}</p>
                      <p className="text-zinc-400 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div ref={roadsRef}>
              <h3 className="text-lg font-semibold text-white mb-3">Các tuyến đường kết nối</h3>
              <div className="space-y-2">
                {locationContent.nearbyRoads.map((r, i) => (
                  <div key={i} className="road-item opacity-0 flex items-center justify-between bg-zinc-800/30 rounded-lg px-4 py-3 border border-zinc-700/20">
                    <div>
                      <p className="text-white text-sm font-medium">{r.name}</p>
                      <p className="text-zinc-400 text-xs">{r.desc}</p>
                    </div>
                    <span className="text-amber-400 text-sm font-medium">{r.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-xl overflow-hidden aspect-[4/3] flex flex-col">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1913.3272848198573!2d107.582638!3d16.444277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a23c69ab7af3%3A0x6c74e4d881e894bb!2zMjIvMTMvMjkzIMSQxqFuZyDEkGnhu4NuIELDrG4gUGjhu6ssIFRyxrDhu51uZyBBbiwgVGjDoG5oIHBo4buRIEjhur5lLCBUaOG7q2EgVGhpw6puIEh14bq_!5e0!3m2!1svi!2s!4v1"
              width="100%"
              height="60%"
              style={{ border: 0, minHeight: "250px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ vị trí lô đất"
            />
            <div className="p-3 bg-zinc-800 text-center flex-1 flex flex-col justify-center">
              <p className="text-zinc-300 text-sm">📍 Toạ độ chính xác: 16°26'39.4"N — 107°34'57.5"E</p>
              <p className="text-zinc-500 text-xs mt-1">Cách mặt tiền Điện Biên Phủ chỉ 50m, hẻm 2.3m ô tô vào tận sân</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <a
            href={locationContent.streetViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-full text-sm transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Xem Street View - Đường vào lô đất
          </a>
          <a
            href={locationContent.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-medium px-6 py-3 rounded-full text-sm transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Mở Google Maps
          </a>
        </div>

        <div ref={streetViewRef} className="mb-12">
          <h3 className="text-lg font-semibold text-white text-center mb-6">
            📸 Hình ảnh thực tế — từ đầu hẻm vào lô đất
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: "/images/day-tro-mat-truoc.jpg", label: "Đầu kiệt 293 — Đ. Điện Biên Phủ", sub: "View từ Google Street View" },
              { src: "/images/san-ngay.jpg", label: "Đi vào hẻm 2.3m", sub: "Ô tô VF3-VF5 vào tận sân" },
              { src: "/images/day-tro-goc-rong.jpg", label: "Đến lô đất số 2/13/293", sub: "279m² — nhà + 5 phòng trọ" },
              { src: "/images/san-dem.jpg", label: "Sân vườn rộng rãi", sub: "Thoáng mát, có thể mở rộng" },
            ].map((item, i) => (
              <div key={i} className="sv-photo opacity-0 group relative rounded-xl overflow-hidden aspect-[4/3] bg-zinc-800 border border-zinc-700/30">
                <img src={item.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-medium">{item.label}</p>
                  <p className="text-zinc-400 text-[10px] mt-0.5">{item.sub}</p>
                </div>
                {i === 0 && (
                  <div className="absolute top-2 right-2 bg-emerald-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Street View
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-10">
          <h3 className="text-xl font-semibold text-white text-center mb-8">Tiện ích xung quanh trong bán kính 3km</h3>
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {locationContent.amenities.map((a, i) => (
              <div key={i} className="amenity-item opacity-0 bg-zinc-800/40 rounded-xl p-4 border border-zinc-700/20 hover:border-amber-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{a.icon}</span>
                  <p className="text-white font-medium text-sm">{a.name}</p>
                </div>
                <p className="text-amber-400 text-xs font-semibold">{a.distance}</p>
                <p className="text-zinc-500 text-xs mt-1">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
