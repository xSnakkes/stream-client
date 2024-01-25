import { SignInButton, currentUser, UserButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Clapperboard } from "lucide-react";

export const Actions = async () => {
    const user = await currentUser();

    return (
        <div className="flex items-center justify-end gap-x-2
        ml-4 lg:ml-0"
        >
            {!!user ? (
                <div className="flex items-center gap-x-4">
                    <Button
                        className="text-muted hover:text-black cursor-pointer "
                        size={"sm"}
                        asChild
                    >
                        <Link 
                            href={`/profile/${user.username}`}
                            className="flex items-center gap-x-2"
                        >
                            <Clapperboard className="h-5 w-5 lg:mr-2"/>
                            <span className="hidden lg:block">
                                Dashboard 
                            </span>
                        </Link>
                    </Button>
                    <UserButton 
                        afterSignOutUrl="/"
                        
                    />
                </div>
            ) : (
                <SignInButton >
                    <Button>
                        Login
                    </Button>
                </SignInButton>
            )}

        </div>
    )
}