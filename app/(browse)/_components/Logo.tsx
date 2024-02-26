import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
subsets: ['latin'],
weight: ["200", "300" , "400","500", "600" ,"700", "800" ],
})


export const Logo =()=> {
    return(
      <Link href='/'>
        <div className="flex items-center gap-x-4 hover:opacity-75 transition">
            <div className="bg-white rounded-full p-2">
                <Image
                    src='/Sssplit.svg'
                    width='32'
                    height='32'
                    alt="bytetv"
                />
            </div>
            <div>
                <p className="text-lg font-semibold">
                    ByteTV
                </p>
                <p className="text-fuchsia-500">
                    Lets Play
                </p>
            </div>
        </div>
      </Link>
    )
}