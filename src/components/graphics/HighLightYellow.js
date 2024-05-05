import Image from "next/image";

export default function HighlightYellow() {
  return <div className='absolute -top-2 left-0 -z-1'><Image src={"/drawsvg.svg"} width={400} height={130} className="opacity-40 -z-5" alt="svg" /></div>;
}
