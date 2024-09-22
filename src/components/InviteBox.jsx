import React from "react";
import { useState } from "react";
import { Button } from "./tailwind-frames/components/button";
import { Toast } from "./tailwind-frames/components/toast";
import { CheckboxIcon } from "./tailwind-frames/assets/checkbox-icon";
import { FaRegCopy } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

function InviteBox({ inviteCode, setShowInviteBox }) {
  const [copyChecked, setCopyChecked] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(inviteCode);
    setCopyChecked(true);
    setTimeout(() => {
      setCopyChecked(false);
    }, 2000);
  }
  return (
    <div className="absolute flex justify-center items-center w-screen h-screen bg-slate-500/50 z-30">
      <div className="bg-white border-2 rounded-md border-slate-200 p-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <h5 className="text-xl">Invite to Call</h5>
          <IoClose
            className="text-xl hover:cursor-pointer"
            onClick={() => setShowInviteBox(false)}
          />
        </div>
        <div className="flex">
          <input
            className="border-2 border-slate-200 pl-2 pr-4 rounded-l-md"
            type="text"
            value={inviteCode}
            disabled
          />
          <Button
            variant="primary"
            className=" rounded-l-none rounded-r-md"
            iconOnly
            onClick={handleCopy}
          >
            <FaRegCopy />
          </Button>
        </div>
        {copyChecked && (
          <Toast
            variant="outlined"
            placement="bottom-left"
            color="success"
            children="Copied!"
            className={"border-green-500"}
            startAdornment={<CheckboxIcon />}
          />
        )}
      </div>
    </div>
  );
}

export default InviteBox;
