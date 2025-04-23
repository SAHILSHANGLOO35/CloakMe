import { formatDistanceToNow } from "date-fns";

type CommentType = {
  id: string;
  content: string;
  user: {
    username: string;
  };
  createdAt: string;
};

function Comment({ comment }: { comment: CommentType }) {
  // Add safety checks for comment structure
  if (!comment) {
    return null;
  }

  // Extract username initial safely
  const username = comment.user?.username || "User";
  const initial = username[0]?.toUpperCase() || "U";

  // Format date safely
  const formattedDate = comment.createdAt ?
    formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) :
    "recently";

  return (
    <div className="flex gap-2 py-3">
      <div className="bg-gray-700 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: '"BR Firma", sans-serif'}}>
        {initial}
      </div>
      <div className="flex-1">
        <div className="bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm" style={{ fontFamily: '"BR Firma", sans-serif'}}>{username}</span>
            <span className="text-xs text-gray-400" style={{ fontFamily: '"BR Firma", sans-serif'}}>{formattedDate}</span>
          </div>
          <p className="text-sm" style={{ fontFamily: '"BR Firma", sans-serif'}}>{comment.content || ""}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;