import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignInButton from "./SignInButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

async function Sidebar() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return <UnAuthenticatedSidebar />;
  }
  return <div className="space-y-6 p-4"></div>;
}

export default Sidebar;

const UnAuthenticatedSidebar = () => (
  <div className="space-y-6 p-4">
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Welcome Back!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          Login to access your profile and connect with others.
        </p>
        <SignInButton className="w-full" variant="outline">
          Login
        </SignInButton>
      </CardContent>
    </Card>
  </div>
);
