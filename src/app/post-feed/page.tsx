import { PostFeed } from "@/components/PostFeed";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { PostForm } from "@/components/PostForm";

export default function Home() {
    return (
        <div className="flex flex-row h-screen">
            <div className="w-1/3 -ml-12">
                <LeftSidebar />
            </div>
            <div className="w-2/4 px-4 mt-0 top-0">
                <PostForm />
                <PostFeed />
            </div>
            <div className="w-1/3 mr-4">
                <RightSidebar />
            </div>
        </div>
    )
}