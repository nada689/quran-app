'use client'
import { useParams, useSearchParams } from 'next/navigation'
import Image from "next/image"
import Link from 'next/link'
import NavBar from '@/app/components/nav_bar'
import Footer from '@/app/components/footer_section'
import { useNumStore, useReaderStore } from '@/app/store'
import { useEffect, useState } from 'react'
import Get_Sounds from '@/app/components/sounds'
import Get_Pages from '@/app/components/quran_pages'

// reader page
export default function QuranPage() {
    const readers = useReaderStore(state => state.readers)
    const params = useParams()
    const searchParams = useSearchParams();
    const Name = decodeURIComponent(params.name as string)
    const id = searchParams.get('id') || "";
    const reader = readers.find(reader => reader.name === Name);
    const num = useNumStore((state) => state.num)
    const [src, setSrc] = useState<string>('/');
    useEffect(() => {
        if (reader) {
            setSrc(reader.src);
        }
    }, [reader]);
    return (
        <>
            <NavBar />
            <div className="grid grid-cols-2 gap-4">
                <div className="reader_page text-start">
                    <Image
                        src={src}
                        width={200}
                        height={200}
                        alt={Name}
                        className={"rounded-2xl ml-2"}
                    />
                </div>

                {/* Sounds component */}
                <div className="mr-2"><Get_Sounds id={id} src={src} /></div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:col-span-6">
                {/* other readers*/}
                <div>
                    <h1 className="text-4xl text-right mb-2">قارئين اخرين</h1>
                    {readers.map((reader) => {
                        if (reader.name !== Name) {
                            return (
                                <Link
                                    key={reader.id}
                                    href={{
                                        pathname: `/quran/${reader.name}`,
                                        query: {
                                            id: reader.id,
                                        }
                                    }}
                                >
                                    <div className="flex flex-wrap flex-row-reverse items-center gap-4 mb-3">
                                        <Image
                                            src={reader.src}
                                            width={150}
                                            height={150}
                                            alt={reader.name}
                                        />
                                        <p className="mt-2 text-sm">{reader.name}</p>
                                    </div>

                                </Link>
                            )
                        }
                    })}
                </div>
                {/* Quran component */}
                <div className="mr-2"> <Get_Pages num={num} /></div>
            </div>

            <Footer />
        </>
    )
}

