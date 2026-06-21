"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { credibilityContent, storyContent, scarcityContent } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export default function Trust() {
  const sectionRef = useRef<HTMLElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const credRef = useRef<HTMLDivElement>(null)
  const scarcityRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stItems = storyRef.current?.querySelectorAll(".story-item")
      if (stItems) {
        gsap.fromTo(stItems, { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.15, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: storyRef.current, start: "top 80%" } })
      }
      const crItems = credRef.current?.querySelectorAll(".cred-item")
      if (crItems) {
        gsap.fromTo(crItems, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: credRef.current, start: "top 80%" } })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="trust" className="py-20 bg-zinc-900">
      <div className="max-w-5xl mx-auto px-4">
        <div ref={scarcityRef} className="text-center mb-12">
          <span className="inline-block bg-red-500/20 text-red-400 border border-red-500/30 rounded-full px-5 py-2 text-sm font-bold tracking-wider mb-4 animate-pulse">
            {scarcityContent.badge}
          </span>
          <p className="text-white text-lg">{scarcityContent.message}</p>
          <p className="text-zinc-400 mt-2">{scarcityContent.urgency}</p>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">{storyContent.headline || "Câu chuyện đầu tư"}</h2>

        <div ref={storyRef} className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6">
            <p className="text-red-400 font-bold text-lg mb-4">{storyContent.before.label}</p>
            <ul className="space-y-3">
              {storyContent.before.points.map((p, i) => (
                <li key={i} className="story-item opacity-0 flex items-start gap-3 text-zinc-300">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6">
            <p className="text-emerald-400 font-bold text-lg mb-4">{storyContent.after.label}</p>
            <ul className="space-y-3">
              {storyContent.after.points.map((p, i) => (
                <li key={i} className="story-item opacity-0 flex items-start gap-3 text-zinc-300">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">{credibilityContent.headline}</h2>

        <div ref={credRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {credibilityContent.items.map((item, i) => (
            <div key={i} className="cred-item opacity-0 bg-zinc-800 rounded-xl p-6 border border-zinc-700/50">
              <span className="text-3xl mb-3 block">{item.icon}</span>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-zinc-800/50 rounded-xl overflow-hidden border border-zinc-700/30">
            <img
              src="/images/phong-tro-noi-that.jpg"
              alt="Sổ đỏ - Sơ đồ thửa đất"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="p-4">
              <p className="text-zinc-300 text-sm">Sổ hồng chính chủ - Sơ đồ thửa đất 204/205, tỷ lệ 1/500</p>
            </div>
          </div>
          <div className="bg-zinc-800/50 rounded-xl overflow-hidden border border-zinc-700/30">
            <img
              src="/images/anhh12.jpg"
              alt="Sổ đỏ chi tiết - Tiếp giáp Đ. Điện Biên Phủ"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="p-4">
              <p className="text-zinc-300 text-sm">Sổ hồng chi tiết - Chỉ giới đường đỏ tiếp giáp Đ. Điện Biên Phủ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
