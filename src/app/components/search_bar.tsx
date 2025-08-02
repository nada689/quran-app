'use client';

import { useState, useRef } from "react";
import Link from "next/link";
import { useReaderStore, Reader } from '../store'
import Image from "next/image"
export default function SearchBar({ color }: { color: string }) {
    const readers = useReaderStore(state => state.readers)
    const inputRef = useRef<HTMLInputElement>(null);
    const [results, setResults] = useState<Reader[]>([]);
    {/* search function*/}
    const handleSearch = (value: string) => {
        if (value === '') {
            setResults([]);
        } else {
            const filtered = readers.filter(reader =>
                reader.name.includes(value)
            );
            setResults(filtered);
        }
    };


    return (
        <div>
            <div className="relative mt-2">
                <label htmlFor="search" className="text-black text-3xl absolute -top-0.5 z-30 ml-1" onClick={() =>handleSearch(inputRef.current?.value || '')}>⌕</label>
                <input id="search" type="search" name="search" placeholder="ابحث هنا" ref={inputRef}  onChange={() => handleSearch(inputRef.current?.value || '')} className={`${color} p-2 w-full rounded-md  text-end`} />
            </div>
            {/* show results*/}
            <div className="mt-4 space-y-2 mb-4">
                {results.length > 0 ? (
                    results.map((reader) => (
                        <Link
                            key={reader.id}
                            href={{
                                pathname: `/quran/${reader.name}`,
                                query: {
                                    id: reader.id,

                                }
                            }}
                            className="flex items-center gap-3 border p-2 rounded-md bg-white hover:bg-gray-100 transition"
                        >
                            <Image src={reader.src} alt={reader.name} width={50}
                                height={50} className="rounded-2xl" />
                            <span>{reader.name}</span>
                        </Link>
                    ))
                ) : (
                    inputRef.current?.value && <p className="text-gray-500">لا توجد نتائج</p>
                )}
            </div>
        </div>
    );
}
