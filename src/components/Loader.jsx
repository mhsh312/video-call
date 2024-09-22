import React from "react";
import { Spinner } from "./tailwind-frames/components/spinner";

function Loader() {
  return (
    <div className="absolute top-0 flex justify-center items-center w-screen h-screen z-30 bg-white">
      <Spinner size="xlarge" />
    </div>
  );
}

export default Loader;
