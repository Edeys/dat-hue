"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { faqContent } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headlineRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(headlineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="faq" className="py-20 bg-zinc-900">
      <div className="max-w-3xl mx-auto px-4">
        <h2 ref={headlineRef} className="text-3xl md:text-4xl font-bold text-white text-center mb-12 opacity-0">
          {faqContent.headline}
        </h2>

        <div className="space-y-3">
          {faqContent.items.map((item, i) => (
            <div key={i} className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700/50">
              <button
                className="w-full flex items-center justify-between p-5 text-left text-white font-medium hover:bg-zinc-700/30 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="pr-4">{item.q}</span>
                <span className={`shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-zinc-300 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
