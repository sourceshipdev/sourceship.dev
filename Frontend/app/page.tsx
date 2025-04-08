import Hero from "@/components/hero/hero"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05000c]/[0.96] antialiased relative overflow-hidden">
      <div className="relative z-10">
        <Navbar />
        <Hero />
      </div>
    </main>
  )
}

