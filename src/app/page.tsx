'use client'
import Image from "next/image";
import NavBar from "./components/nav_bar";
import Link from "next/link";
import SearchBar from "./components/search_bar";
import Footer from "./components/footer_section";
import { useReaderStore } from "./store";

export default function App() {
  const readers = useReaderStore(state => state.readers);

  return (
    <>
      <NavBar />

      <h1 className="text-6xl w-3/4 sm:w-11/12 mx-auto text-center py-5">استمتع بجمال القرآن</h1>
      <div className="w-3/4 sm:w-11/12 mx-auto py-1"><SearchBar color={"bg-gray-200"} /></div>
      <div className="w-3/4 sm:w-11/12 mx-auto my-3.5 flex flex-wrap items-center justify-start rounded-md gap-1 border flex-row-reverse">
        <Image
          src={"/img/Frame.svg"}
          width={30}
          height={30}
          alt={"readers"}
          className={""}
        />
        <p>اختر القارئ</p>
      </div>
      <div className={"flex flex-1/3 flex-wrap justify-evenly gap-4 border w-3/4 sm:w-11/12 mx-auto p-3.5"}>
        {readers.map((reader) => (
          <Link
            key={reader.id}
            className={"relative"}
            href={{
              pathname: `/quran/${reader.name}`,
              query: {
                id: reader.id,

              }
            }}
          >
            <Image
              src={reader.src}
              width={200}
              height={200}
              alt={reader.name}
              className={"rounded-xs shadow-md blur-sm hover:blur-none"}
            />
            <p className={"absolute left-1/6 top-1/2 text-center text-xl"}>قرآن {reader.name}</p>
          </Link>
        ))}
      </div >
      <Footer />
    </>
  );
}
