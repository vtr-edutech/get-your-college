import Image from "next/image";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";

export default function NotFound() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <Link
        href='/'
        className='flex items-center gap-1 text-blue-500 underline text-base'
      >
        <BsChevronLeft size={13} />
        Go home
      </Link>
      <Image src={"/404.webp"} alt='Not Found' width={500} height={500} />
      <h2 className="text-2xl font-semibold">This page is either under construction or not found!</h2>
    </div>
  );
}
