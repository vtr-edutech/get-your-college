import Image from "next/image";

export default function Medical() {
    return (
      <>
        <h1 className='font-medium text-2xl'>
          Let&apos;s get your college preferences right
        </h1>
        <h1 className='font-normal text-base'>
          Search medical colleges and add to your preference list
        </h1>

        <div className="flex w-full items-center justify-center flex-col h-full">
          <p>Coming soon...</p>
          <Image src={'/404.webp'} alt="Under Construction" width={200} height={200} />
        </div>
      </>
    );
}