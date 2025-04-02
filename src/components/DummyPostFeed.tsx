"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

type Post = {
  id: string;
  content: string;
  imageUrl: string | null;
  gifUrl: string | null;
  createdAt: string;
  user: {
    username: string;
    id: string;
  };
  likes: number;
  comments: number;
};

// Dummy data generation
const generateDummyPosts = (): Post[] => {
  const users = [
    { username: "alexsmith", id: "user1" },
    { username: "techguru", id: "user2" },
    { username: "traveladdict", id: "user3" },
    { username: "foodielove", id: "user4" },
    { username: "fitnessjunkie", id: "user5" }
  ];

  const images = [
    "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
    "https://images.unsplash.com/photo-1682685797743-3a471a93a8c7",
    null,
    "https://images.unsplash.com/photo-1682687218147-9806132dc697",
    null
  ];

  const gifs = [
    null,
    null,
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDI5azFzYW9vNmp4ZWE3MGlna3U1OXJkemFhZWV3MWRjaXQxcnlyYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPnAiaMCws8nOsE/giphy.gif",
    null,
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHFkbTdsaWltbHFwZW41eHlqb2JuMmJmNjR4Nmc3YXpoaGM0dWxmaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l46Cpz0A0dB1jMxG0/giphy.gif"
  ];

  const contents = [
    "Just finished a major project at work! Time to celebrate 🎉",
    "Check out this amazing view from my hike yesterday. Nature never fails to inspire me. #outdoors #adventure",
    "This new restaurant downtown is absolutely incredible! The chef's special was mind-blowing. Anyone else tried it yet? #foodie",
    "Working on my new side project. Can't wait to share more details soon! #coding #webdev",
    "Morning workout complete! Starting the day with energy and focus. How do you kickstart your mornings? #fitness #wellness"
  ];

  // Generate dates within the last week
  const getRandomDate = () => {
    const now = new Date();
    const randomDaysAgo = Math.floor(Math.random() * 7);
    const randomHoursAgo = Math.floor(Math.random() * 24);
    const date = new Date(now);
    date.setDate(date.getDate() - randomDaysAgo);
    date.setHours(date.getHours() - randomHoursAgo);
    return date.toISOString();
  };

  return users.map((user, index) => ({
    id: `post${index + 1}`,
    content: contents[index],
    imageUrl: images[index],
    gifUrl: gifs[index],
    createdAt: getRandomDate(),
    user,
    likes: Math.floor(Math.random() * 50),
    comments: Math.floor(Math.random() * 12)
  }));
};

export function DummyPostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Set dummy posts on component mount
    setPosts(generateDummyPosts());
  }, []);

  // Container class that's consistent across all states
  const containerClass = "max-w-xl mx-auto px-4 py-6 flex flex-col";

  return (
    <div className={`${containerClass} space-y-4 items-center justifcen`}>
      <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        Development Preview
      </h2>
      
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-lg transition-all hover:shadow-xl hover:border-gray-600"
        >
          <div className="flex items-center mb-3">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold 
                           bg-gradient-to-br from-${getRandomColor(post.user.username)}-500 to-${getRandomColor(post.user.username, true)}-600`}>
              {post.user.username[0].toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="font-medium text-white">{post.user.username}</p>
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          {post.content && <p className="mb-4 text-gray-200 leading-relaxed">{post.content}</p>}

          {post.imageUrl && (
            <div className="mb-4 overflow-hidden rounded-lg shadow-inner">
              <img
                src={post.imageUrl}
                alt="Post image"
                className="w-full rounded-lg transition-transform hover:scale-105 duration-300"
              />
            </div>
          )}

          {post.gifUrl && (
            <div className="mb-4 overflow-hidden rounded-lg shadow-inner">
              <img
                src={post.gifUrl}
                alt="Post GIF"
                className="w-full rounded-lg"
              />
            </div>
          )}

          <div className="flex gap-6 text-gray-400 text-sm mt-3 pt-2 border-t border-gray-700">
            <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
              <span>👍</span> Like <span className="text-gray-500 ml-1">({post.likes})</span>
            </button>
            <button className="flex items-center gap-1 hover:text-green-400 transition-colors">
              <span>💬</span> Comment <span className="text-gray-500 ml-1">({post.comments})</span>
            </button>
            <button className="flex items-center gap-1 hover:text-purple-400 transition-colors">
              <span>🔄</span> Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper function to generate a consistent color based on username
function getRandomColor(username: string, isSecondary: boolean = false): string {
  const colors = ['blue', 'green', 'purple', 'pink', 'indigo', 'teal', 'cyan'];
  const charCode = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  if (isSecondary) {
    return colors[(charCode + 2) % colors.length];
  }
  
  return colors[charCode % colors.length];
}