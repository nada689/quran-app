'use client'
import { useEffect, useState } from 'react'
import Image from "next/image"
import { useNumStore } from '../store'
// sound fetching function
async function fetch_readers(id: string) {
    const res = await fetch(`https://alquran.vip/APIs/reciterAudio?reciter_id=${id}`)
    const data = await res.json()
    return data.audio_urls || []
}

// Sounds component
export default function Get_Sounds({ id, src }: { id: string, src: string }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [list, setList] = useState<string[] | any[]>([])
    const setNum = useNumStore((state) => state.setNum)
    useEffect(() => {
        const get_Data = async () => {
            const data = await fetch_readers(id)
            setList(data)
        }
        get_Data()
    }, [id])

    return (
        <div className="mt-6">
            <div className="flex flex-row flex-wrap items-center gap-1 mb-2 bg-zinc-600 p-5 relative">
                <Image
                    src={src}
                    width={70}
                    height={70}
                    alt={"reader"}
                    className="rounded-full absolute -top-7"
                />
                <h2 className="text-white w-full text-right">تلاوات القارئ</h2>
            </div>

            <ul className="space-y-2 h-60 overflow-y-scroll overflow-x-hidden" dir='rtl'>
                {list.map((item) => (
                    <li key={item.surah_id} className="border p-2 rounded bg-gray-100">
                        <p>{item.surah_name_ar}</p>
                        <audio controls src={item.audio_url} className="w-full mt-1" onPlay={() => setNum(item.surah_id)} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
