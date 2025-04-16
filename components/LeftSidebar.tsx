"use client";
import { HomeIcon, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";

function LeftSidebar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex flex-col space-y-6 pt-4 px-16 items-start gap-[400px]">
      <div className="flex flex-col space-y-6 pt-4 items-start">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          size="lg"
          asChild
        >
          <Link href="/">
            <HomeIcon className="w-7 h-7 font-bold" />
            <span className="hidden lg:inline text-xl font-bold">Home</span>
          </Link>
        </Button>
      </div>

      {user && (
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <UserAvatar user={user} />
            <div className="flex flex-col">
              <Link
                href={`/profile/${user.username ?? user.email?.split("@")[0]}`}
              >
                <p className="font-bold">{user.name}</p>
              </Link>
              <p className="text-muted-foreground">
                @{user.username ?? user.email?.split("@")[0]}
              </p>
            </div>
          </div>
          <Button
            variant="default"
            className="flex items-center justify-center gap-2"
            onClick={() => signOut()}
          >
            <LogOutIcon className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default LeftSidebar;
