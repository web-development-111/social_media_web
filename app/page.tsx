import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const posts = await getPosts();
  const dbUserId = await getDbUserId();
  return (
    <div className="space-y-6 p-4">
      {user && <CreatePost />}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} dbUserId={dbUserId} />
      ))}
    </div>
  );
}
