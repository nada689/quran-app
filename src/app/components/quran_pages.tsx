'use client'
import { useEffect, useState } from 'react'

// fetch_pages function to get ayahs
async function fetch_pages(num: string) {
    const res = await fetch(`https://api.quranhub.com/v1/surah/${num}`)
    const data = await res.json()
    return data.data || null
}

type Ayah = {
    number: number;
    numberInSurah: number;
    text: string;
}

type Surah = {
    name: string;
    ayahs: Ayah[];
}

// quran component
export default function Get_Pages({ num }: { num: string }) {
    const [surah, setSurah] = useState<Surah>()

    useEffect(() => {
        const get_Data = async () => {
            const data = await fetch_pages(num)
            setSurah(data)
        }
        get_Data()
    }, [num])
// Works if surah has no value
    if (!surah) return <p className="mt-6">جاري تحميل السورة</p>
    return (
        <div className="mt-6 rounded bg-zinc-300 p-2">
            <h2 className="text-xl font-bold mb-2 text-center">{surah.name}</h2>
            {/* Display "بِسْمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ" if the surah does not include it */}
            {(num !== "1" && num !== "9") && (
                <p className="text-xl font-bold mb-4 text-center">
                    بِسْمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ
                </p>
            )}
            {/* display ayahs from surah*/}
            <div className="mb-2 flex flex-row-reverse gap-1 items-center justify-center flex-wrap text-right h-60 overflow-y-scroll overflow-x-hidden">
                {surah.ayahs.map((ayah) => (
                    <div key={ayah.number}>
                        <p> {ayah.text}({ayah.numberInSurah})</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
