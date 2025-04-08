import { MemoizedBackground } from "@/components/hero/background";

export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-[#05000c]/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <MemoizedBackground />
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4D94]" />
        </div>
      </div>
    </main>
  );
} 