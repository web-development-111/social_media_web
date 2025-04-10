"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { ImageIcon, Loader2Icon, SaveIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { updatePost } from "@/actions/post.action";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import ImageUpload from "./ImageUpload";
import { DialogClose } from "./ui/dialog";

interface UpdatePostProps {
  postId: string;
  initialContent: string;
  initialImageUrl: string;
  onClose: () => void;
}

function UpdatePost({
  postId,
  initialContent,
  initialImageUrl,
  onClose,
}: UpdatePostProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const [content, setContent] = useState(initialContent);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(!!initialImageUrl); // Initialize showImageUpload if there's an initial image

  const handleUpdate = async () => {
    if (!content.trim() && !imageUrl) return;

    setIsUpdating(true);
    try {
      const result = await updatePost(postId, content, imageUrl);
      if (result?.success) {
        toast.success("Post Updated Successfully");
        onClose();
      } else {
        toast.error("Failed to update post");
        onClose();
      }
    } catch (error) {
      console.error("Failed to update post: ", error);
      toast.error("Failed to update post");
      onClose();
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.image || "/avatar.png"} />
            </Avatar>
            <Textarea
              placeholder="Edit your post..."
              className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isUpdating}
            />
          </div>

          {(showImageUpload || imageUrl) && (
            <div className="border rounded-lg p-4 relative">
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url);
                  if (!url) setShowImageUpload(false);
                }}
              />
              {imageUrl && (
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => setImageUrl("")}
                  disabled={isUpdating}
                >
                  <XIcon className="size-5" />
                </button>
              )}
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            {!imageUrl && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setShowImageUpload(true)} // Always set to true when adding
                disabled={isUpdating || showImageUpload} // Disable when updating or already showing
              >
                <ImageIcon className="size-4 mr-2" />
                Add Photo
              </Button>
            )}
            <div className="flex space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                className="flex items-center"
                onClick={handleUpdate}
                disabled={(!content.trim() && !imageUrl) || isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Loader2Icon className="size-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <SaveIcon className="size-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default UpdatePost;
