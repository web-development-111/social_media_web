import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SearchBar from "./SearchBar";
import SignInButton from "./SignInButton";

async function DesktopNavbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="hidden md:flex items-center space-x-4">
      {user && <SearchBar />}
      {/* <ModeToggle /> */}

      {!user && (
        <SignInButton>
          <span>Log In</span>
        </SignInButton>
      )}
    </div>
  );
}
export default DesktopNavbar;
