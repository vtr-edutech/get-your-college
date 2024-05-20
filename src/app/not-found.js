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
        <BsChevronLeft size={12} />
        Go home
      </Link>
      <Image src={"/404.webp"} alt='Not Found' width={300} height={300} />
      <h2 className="md:text-xl text-base font-medium">This page is either under construction or not found!</h2>
    </div>
  );
}
