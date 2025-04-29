import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function Loading() {
  return (
    <main className="flex flex-row min-h-screen">
      {/* Left Sidebar wrapper */}
      <div className="w-1/3 -ml-12 border-white/25">
        <LeftSidebar />
      </div>

      {/* Center Content Loader with exact spacing */}
      <div className="w-2/4 mt-0 top-0 ml-5 mr-7">
        <div className="bg-transparent pt-6 rounded-lg mb-4 flex justify-center items-center h-full border-l border-r border-white/25">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
        </div>
      </div>

      {/* Right Sidebar wrapper */}
      <div className="w-1/3 mr-4">
        <RightSidebar />
      </div>
    </main>
  );
}
