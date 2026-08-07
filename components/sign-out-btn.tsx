"use client"

import { useRouter } from "next/navigation";
import {signOut} from "@/lib/auth/auth-client";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function SignOutBtn() {

    const router = useRouter();
    return (
        <DropdownMenuItem onClick={async () => {
            const result = await signOut();
            if(result.data) {
                router.push("/sign-in");
            }

        }}><LogOut /> Log Out</DropdownMenuItem>
    );
}