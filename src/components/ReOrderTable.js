import { Reorder } from "framer-motion";
import React from "react";

const ReOrderTable = ({ collegPrefernces, setCollegPrefernces }) => {
  
  return (
    <Reorder.Group
      axis='y'
      values={collegPrefernces}
      onReorder={setCollegPrefernces}
      className='reorder-container flex flex-col gap-1 reorder-container'
    >
      {(collegPrefernces.length > 0 && typeof collegPrefernces[0] !== "undefined") ? collegPrefernces.map((college, i) => (
        <Reorder.Item
          key={college["id"]}
          value={college}
          className='reorder-item mx-1 last-of-type:mb-1 min-w-fit md:min-w-[unset] flex cursor-grab justify-around items-center outline p-1.5 md:p-1 min-h-28 md:overflow-hidden bg-white outline-1 outline-gray-200 last-of-type:rounded-ee-md last-of-type:rounded-es-md'
        >
          <h2 className='flex-1 text-sm max-w-28 min-w-16'>
            <p className='ml-2'>{i + 1}</p>
          </h2>
          <h2 className='flex-1 text-sm max-w-36 min-w-20'>
            {college["College Code"]}
          </h2>
          <h2 className='min-w-44 max-w-96 flex-1 text-sm md:m-0 mx-2'>
            {college["College Name"]}
          </h2>
          <h2 className='max-w-36 flex-1 text-sm pl-2 min-w-32 md:m-0 mx-2'>
            {college["Branch Name"]}<br />
            <span className="font-semibold">(Code: {college["Branch Code"]})</span>
          </h2>
          <h2 className='max-w-36 flex-1 text-sm min-w-20'>
            {college[`${localStorage.getItem("Cat")} - Cutoff`]}
          </h2>
        </Reorder.Item>
      )): 
      <>
      <h2>No data found!</h2>
      <p>Go back to select colleges</p>
      </>}
    </Reorder.Group>
  );
};

export default ReOrderTable;
