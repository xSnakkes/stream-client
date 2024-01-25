import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ['latin'],
    weight: ["200","300", "400", "500", "600", "700", "800", "900"]
})

export const Logo = () => {
    return (
        <div className={cn(font.className, 'flex flex-col items-center')}>
            <div className="bg-white rounded-full p-1 flex flex-row items-center justify-center">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                />
            </div>
            <p className="ml-2 text-xl font-semibold">SnakkeStream Platform</p>
            <p className="ml-2 text-sm text-muted-foreground">Let&apos;s play</p>
        </div>
    )
}