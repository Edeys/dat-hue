"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { audienceTabsContent } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export default function AudienceTabs() {
  const [activeTab, setActiveTab] = useState("investor")
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const currentTab = audienceTabsContent.tabs.find(t => t.id === activeTab) || audienceTabsContent.tabs[0]

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

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
    }
  }, [activeTab])

  return (
    <section ref={sectionRef} id="audience" className="py-20 bg-zinc-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 ref={headlineRef} className="text-3xl md:text-4xl font-bold text-white text-center mb-10 opacity-0">
          {audienceTabsContent.headline}
        </h2>

        <div className="flex justify-center gap-2 mb-8 bg-zinc-900 rounded-full p-1 max-w-md mx-auto">
          {audienceTabsContent.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-amber-500 text-zinc-900" : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div ref={contentRef} key={activeTab} className="bg-zinc-900 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">{currentTab.title}</h3>
          <ul className="space-y-4 mb-8">
            {currentTab.points.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300">
                <span className="text-amber-400 mt-0.5">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <a
            href="#form"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold px-6 py-3 rounded-full transition-all"
          >
            {currentTab.cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
