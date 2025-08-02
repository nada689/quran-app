'use client'
import Image from "next/image";
import Link from 'next/link'
import SearchBar from "./search_bar";

export default function NavBar() {
  return (
    <>
      <header className="bg-nav mb-2 w-full px-5">
        <nav className="flex flex-wrap items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">          
            <Image
            src="/img/quran_logo.png"
            width={100}
            height={100}
            alt={"home"}
          />
            <Link
              className={"text-white"}
              href={{
                pathname: `/`,
              }}
            >
              Home
            </Link>
            <Link
              className="flex flex-wrap items-center gap-4 text-white"
            href={{
              pathname: `/quran/ماهر المعيقلي`,
              query: {
                id: "102",

              }
            }}
            >
              Quran
              <Image
                src="/img/vector.png"
                width={20}
                height={20}
                alt={"quran"}
                className={""}
              />
            </Link></div>
          <div className="max-sm:mx-auto"><SearchBar color={"bg-white"}/></div>

        </nav>
      </header>
    </>
  )
}