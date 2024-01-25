import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Logo = () => {
    return (
        <Link href="/">
            <div
                className="flex items-center gap-x-4
            hover:opacity-75 transition"
            >
                <div className="bg-white rounded-full p-1 flex flex-row items-center justify-center">
                    <Image src="/logo.svg" alt="Logo" height="48" width="48" />
                </div>
                <div className={cn(font.className, "hidden lg:block")}>
                    <p className="text-lg font-semibold">SnakkeStream</p>
                    <p className="text-sm text-muted-foreground">Let&apos;s play</p>
                </div>
            </div>
        </Link>
    );
};
