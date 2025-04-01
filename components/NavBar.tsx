import Link from "next/link";
import React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { syncUser } from "@/actions/user.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function NavBar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user) await syncUser();
  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary tracking-wider"
            >
              Social Media App
            </Link>
          </div>

          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
