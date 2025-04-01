import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface UserAvatarProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

export default function UserAvatar({ user }: UserAvatarProps) {
    return (
        <Avatar>
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>
                {user.name?.charAt(0) || user.email?.charAt(0)}
            </AvatarFallback>
        </Avatar>
    );
}