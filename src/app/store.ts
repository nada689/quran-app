import { create } from 'zustand';

export type Reader = {
  name: string;
  src: string;
  id: string;
};

interface ReaderState {
  readers: Reader[];
}

export const useReaderStore = create<ReaderState>(() => ({
  readers: [
    { name: "ماهر المعيقلي", src: "/img/download.png", id: "102" },
    { name: "ياسر الدوسري", src: "/img/images.png", id: "92" },
    { name: "محمد صديق المنشاوي", src: "/img/download(1).png", id: "112" },
  ]
}));

interface NumState {
  num: string
  setNum: (newNum: string) => void
}

export const useNumStore = create<NumState>((set) => ({
  num: "1",
  setNum: (newNum) => set(() => ({ num: newNum })),
}))