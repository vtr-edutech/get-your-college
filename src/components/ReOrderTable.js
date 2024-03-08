import { AnimatePresence, Reorder, useMotionValue } from "framer-motion";
import React from "react";

const ReOrderTable = ({ collegPrefernces, setCollegPrefernces }) => {

  return (
    <Reorder.Group
      axis='y'
      values={collegPrefernces}
      onReorder={setCollegPrefernces}
      className='flex flex-col gap-1'
    >
      <AnimatePresence>
        {collegPrefernces.map((college, i) => (
          <Reorder.Item
            key={college.id}
            value={college}
            className='flex justify-around items-center outline p-4 outline-1 outline-gray-200 last-of-type:rounded-ee-md last-of-type:rounded-es-md'
          >
            <h2 className="flex-1">{i + 1}</h2>
            <h2 className="flex-1">{college.id}</h2>
            <h2 className="flex-1">
              {college.name}
              <br />
              <p className='text-xs'>{college.address}</p>
            </h2>
            <h2 className="flex-1">{college.website}</h2>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default ReOrderTable;
