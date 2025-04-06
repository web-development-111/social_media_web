import { getPostById } from "@/actions/post.action";
import PostCard from "@/components/PostCard";

type ParamsType = Promise<{ id: string }>;

export async function PostDetail(props: { params: ParamsType }) {
  const { id } = await props.params;
  const post = await getPostById(id);
  if (!post) return <p>Post not found.</p>;
  return (
    <div className="max-w-2xl mx-auto p-4">
      <PostCard post={post} dbUserId={null} showComment={true} />
    </div>
  );
}

export default PostDetail;
