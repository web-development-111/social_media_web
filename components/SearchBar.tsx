"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { searchUsers } from "@/actions/user.action";
import Link from "next/link";

interface User {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    _count: {
        followers: number;
    };
}

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!query) {
                setUsers([]);
                return;
            }
            setLoading(true);
            try {
                const result = await searchUsers(query);
                setUsers(result);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchUsers, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    return (
        <div className="relative w-full max-w-md">
            <Input
                placeholder="Search users..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {loading && (
                <p className="text-sm mt-2 absolute top-full left-0 w-full">
                    Loading...
                </p>
            )}
            {users.length > 0 && (
                <div className="absolute w-full bg-white shadow-md rounded-lg mt-2 dark:bg-black">
                    {users.map((user) => (
                        <Card key={user.id} className={cn("cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900")}>
                            <CardContent className="flex items-center gap-4 p-3">
                                <img
                                    src={user.image ?? "/default-avatar.png"}
                                    alt={user.name ?? "User avatar"}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold"><Link href={`/profile/${user.username}`}>{user.name}</Link></p>
                                    <p className="text-sm text-gray-500">@{user.username}</p>
                                    <p className="text-xs text-gray-400">{user._count.followers} followers</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
