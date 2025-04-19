"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  BellIcon,
  BookAIcon,
  FileIcon,
  HomeIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import UserAvatar from "./UserAvatar";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationsAsRead,
} from "@/actions/notification.action";

function LeftSidebar() {
  const { data: session } = useSession();
  const user = session?.user;
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchUnreadNotifications = async () => {
      try {
        const notifications = await getNotifications();
        const unreadNotifications = notifications.filter((n) => !n.read);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchUnreadNotifications();
  }, [user]);

  const handleNotificationsClick = async () => {
    if (!user || unreadCount === 0) return;

    try {
      const notifications = await getNotifications();
      const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id);
      if (unreadIds.length > 0) {
        await markNotificationsAsRead(unreadIds);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-6 pt-4 px-16 items-start gap-[530px]">
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
        {user && (
          <>
            <Button
              variant="ghost"
              className="flex items-center gap-2 relative"
              size="lg"
              asChild
              onClick={handleNotificationsClick}
            >
              <Link href="/notifications">
                <BellIcon className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {unreadCount}
                  </span>
                )}
                <span className="hidden lg:inline text-xl font-bold">
                  Notifications
                </span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              size="lg"
              asChild
            >
              <Link
                href={`/profile/${user.username ?? user.email?.split("@")[0]}`}
              >
                <UserIcon className="w-4 h-4" />
                <span className="hidden lg:inline text-xl font-bold">
                  Profile
                </span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              size="lg"
              asChild
            >
              <Link href="/about">
                <BookAIcon className="w-7 h-7 font-bold" />
                <span className="hidden lg:inline text-xl font-bold">
                  About Us
                </span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              size="lg"
              asChild
            >
              <Link href="/guidelines">
                <FileIcon className="w-7 h-7 font-bold" />
                <span className="hidden lg:inline text-xl font-bold">
                  Guidelines
                </span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              size="lg"
              onClick={() => signOut()}
            >
              <LogOutIcon className="w-4 h-4" />
              <span className="hidden lg:inline text-xl font-bold">
                Log Out
              </span>
            </Button>
          </>
        )}
      </div>

      {user && (
        <div className="flex gap-2">
          <div>
            <UserAvatar user={user} />
          </div>
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
      )}
    </div>
  );
}

export default LeftSidebar;
