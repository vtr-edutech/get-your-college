import { Skeleton } from "@mantine/core";

export default function ContentCardLoader() {
  return (
    <>
      <div className='flex flex-col w-full rounded-md bg-white shadow md:p-8 p-4 md:gap-3 gap-6 md:mb-10'>
        <Skeleton width='fit-content'>
          <h1 className='font-medium text-2xl'>
            Search for engineering colleges in zya category
          </h1>
        </Skeleton>
      </div>
    </>
  );
}
