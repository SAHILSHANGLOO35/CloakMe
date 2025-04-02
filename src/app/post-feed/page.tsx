import { PostFeed } from "@/components/PostFeed";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function () {
    return <div className="flex flex-row">
        <LeftSidebar />
        <PostFeed />
        <RightSidebar />
    </div>
}

