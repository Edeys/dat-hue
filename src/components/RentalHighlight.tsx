"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { rentalHighlight, siteConfig } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export default function RentalHighlight() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current?.querySelectorAll(".rh-item")
      if (items) {
        gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: itemsRef.current, start: "top 80%" } })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-zinc-900 to-zinc-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(5,150,105,0.08)_0%,_transparent_70%)]" />

      <div className="max-w-5xl mx-auto px-4 relative">
        <div className="text-center mb-8">
          <span className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-5 py-1.5 text-sm font-bold tracking-wider mb-4">
            {rentalHighlight.badge}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {rentalHighlight.headline}
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto mt-3 text-sm">
            {rentalHighlight.description}
          </p>
        </div>

        <div ref={itemsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {rentalHighlight.revenueItems.map((item, i) => (
            <div key={i} className="rh-item opacity-0 bg-zinc-800/60 border border-zinc-700/30 rounded-xl p-4 text-center">
              <p className="text-zinc-400 text-xs mb-1">{item.label}</p>
              <p className="text-emerald-400 font-bold text-lg">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {rentalHighlight.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
