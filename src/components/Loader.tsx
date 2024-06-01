import React from "react";

function Loader() {
  return (
    <>
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-10 h-10 border-8 text-[var(--netflix-font-red)] text-[15px] animate-spin border-gray-300 flex items-center justify-center border-t-[var(--netflix-font-red)] rounded-full"></div>
      </div>
    </>
  );
}

export default Loader;
