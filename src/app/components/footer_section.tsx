'use client'
import Image from "next/image";

export default function Footer() {
    return (
        <>
            <footer className="bg-black mt-2 w-full px-5">
                <div className="flex items-center gap-4">
                    <Image
                        src="/img/logo.png"
                        width={70}
                        height={70}
                        alt={"footer"}
                    />
                    <p className="text-white w-1/5 max-md:w-fit">هذا المشروع من شركه واقعك The New code 2025</p>
                </div>
            </footer>
        </>
    )
}