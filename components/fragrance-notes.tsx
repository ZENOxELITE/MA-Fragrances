"use client"

import { useState } from "react"

const notesData = [
  {
    tier: "Top Notes",
    description: "The first impression",
    duration: "0-15 minutes",
    notes: ["Bergamot", "Lemon", "Grapefruit", "Lavender"],
    color: "from-yellow-200 to-orange-200",
    bgColor: "bg-yellow-100/50",
    borderColor: "border-yellow-300/30",
  },
  {
    tier: "Heart Notes",
    description: "The soul of the fragrance",
    duration: "15 minutes - 4 hours",
    notes: ["Rose", "Jasmine", "Iris", "Ylang Ylang"],
    color: "from-rose-200 to-pink-300",
    bgColor: "bg-rose-100/50",
    borderColor: "border-rose-300/30",
  },
  {
    tier: "Base Notes",
    description: "The lasting memory",
    duration: "4+ hours",
    notes: ["Sandalwood", "Oud", "Musk", "Amber"],
    color: "from-amber-400 to-orange-600",
    bgColor: "bg-amber-100/50",
    borderColor: "border-amber-300/30",
  },
]

export default function FragranceNotes() {
  const [activeNote, setActiveNote] = useState<number | null>(null)
  const [selectedNote, setSelectedNote] = useState<string | null>(null)

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-foreground mb-4">The Art of Fragrance</h2>
          <p className="text-lg text-muted-foreground">Understanding fragrance composition and evolution</p>
        </div>

        {/* Fragrance Pyramid Visualization */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {notesData.map((tier, idx) => (
              <div
                key={idx}
                className="group cursor-pointer"
                onMouseEnter={() => setActiveNote(idx)}
                onMouseLeave={() => setActiveNote(null)}
              >
                <div
                  className={`relative bg-gradient-to-b ${tier.color} rounded-2xl p-8 transform transition-all duration-300 border-2 ${
                    tier.borderColor
                  } ${
                    activeNote === idx
                      ? "scale-105 shadow-2xl ring-2 ring-accent/50"
                      : activeNote === null
                        ? "hover:shadow-xl"
                        : "opacity-50 scale-95"
                  }`}
                >
                  {/* Animated background glow */}
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${tier.bgColor}`}
                  ></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{tier.tier}</h3>
                        <p className="text-xs text-foreground/70 mt-1 font-semibold uppercase tracking-wider">
                          {tier.duration}
                        </p>
                      </div>
                      {/* Pyramid indicator */}
                      <div className="text-3xl opacity-70">{idx === 0 ? "▲" : idx === 1 ? "●" : "▼"}</div>
                    </div>

                    <p className="text-sm text-foreground/80 mb-6 leading-relaxed">{tier.description}</p>

                    {/* Notes grid */}
                    <div className="space-y-2">
                      {tier.notes.map((note, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedNote(selectedNote === note ? null : note)}
                          className={`w-full text-sm font-medium text-foreground/80 bg-white/30 hover:bg-white/50 rounded-lg px-4 py-2 backdrop-blur-sm border border-white/20 transition-all duration-200 text-left ${
                            selectedNote === note ? "bg-white/60 ring-2 ring-foreground/30" : ""
                          }`}
                        >
                          <span className="inline-block mr-2">•</span>
                          {note}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evolution Timeline */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Scent Evolution Timeline</h3>

          <div className="relative">
            {/* Timeline connector line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-rose-300 to-amber-500 hidden md:block"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {[
                { time: "0-15 min", label: "Fresh Opening", color: "from-yellow-200 to-yellow-100", intensity: 100 },
                { time: "15-60 min", label: "Heart Emerges", color: "from-rose-200 to-pink-100", intensity: 80 },
                { time: "1-4 hours", label: "Base Develops", color: "from-amber-300 to-orange-100", intensity: 60 },
                {
                  time: "4+ hours",
                  label: "Lasting Impression",
                  color: "from-amber-500 to-orange-300",
                  intensity: 40,
                },
              ].map((stage, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-foreground rounded-full border-4 border-background z-10 hidden md:block"></div>

                  <div
                    className={`bg-gradient-to-br ${stage.color} rounded-xl p-6 border border-foreground/10 relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>

                    <div className="relative z-10">
                      <div className="text-xs font-bold text-foreground/70 uppercase tracking-widest mb-2">
                        {stage.time}
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-3">{stage.label}</h4>

                      {/* Intensity bar */}
                      <div className="w-full h-1 bg-foreground/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-foreground/60 to-foreground/40 transition-all duration-500"
                          style={{ width: `${stage.intensity}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-foreground/60 mt-2">{stage.intensity}% intensity</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fragrance Families Info */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted/30 rounded-2xl p-8 border border-border/50">
          <div>
            <h4 className="text-2xl font-bold text-foreground mb-4">Fragrance Families</h4>
            <div className="space-y-3">
              {[
                { name: "Floral", desc: "Romantic and elegant" },
                { name: "Woody", desc: "Warm and sophisticated" },
                { name: "Fresh", desc: "Crisp and energizing" },
                { name: "Oriental", desc: "Rich and sensual" },
              ].map((family, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-foreground">{family.name}</p>
                    <p className="text-sm text-muted-foreground">{family.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-2xl font-bold text-foreground mb-4">Concentration Levels</h4>
            <div className="space-y-3">
              {[
                { name: "Eau de Cologne", pct: "3-5%" },
                { name: "Eau de Toilette", pct: "5-15%" },
                { name: "Eau de Parfum", pct: "15-20%" },
                { name: "Parfum", pct: "20-30%" },
              ].map((conc, i) => (
                <div key={i} className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{conc.name}</p>
                  <span className="text-sm text-accent font-semibold">{conc.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
