"use client"

import {Briefcase} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {getSession, signOut} from "@/lib/auth/auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {useSession} from "@/lib/auth/auth-client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import SignOutBtn from "@/components/sign-out-btn";


export default function Navbar() {

    const {data: session} = useSession();

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-16 items-center px-4 justify-between">
                <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
                    <Briefcase/>
                    Job Tracker
                </Link>
                <div className="flex items-center gap-4">
                    {
                        session?.user ?
                            (
                                <>
                                    <div className={"flex flex-row space-x-2"}>
                                        <Link href="/dashboard">
                                            <Button variant={"ghost"}
                                                    className={"text-gray-700 hover:text-black"}>Dashboard</Button>
                                        </Link>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Avatar>
                                                    <AvatarImage
                                                        src="https://github.com/shadcn.png"
                                                        alt="@shadcn"
                                                        className="grayscale"
                                                    />
                                                    <AvatarFallback>{session.user.name}</AvatarFallback>
                                                </Avatar>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuGroup>
                                                    <SignOutBtn />
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                </>
                            ) :
                            (
                                <>
                                    <Link href="/sign-in">
                                        <Button variant="ghost" className="text-gray-700 hover:text-black">
                                            Log In
                                        </Button>
                                    </Link>

                                    <Link href="/sign-up">
                                        <Button className="bg-primary hover:bg-primary/90 ">
                                            Start for free
                                        </Button>
                                    </Link>
                                </>
                            )


                    }

                </div>
            </div>
        </nav>
    )
}