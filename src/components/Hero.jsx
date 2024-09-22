import { Badge } from "./tailwind-frames/components/badge";
import { Button } from "./tailwind-frames/components/button";
import { useNavigate } from "react-router-dom";
import { Input } from "./tailwind-frames/components/input";
import { useState } from "react";

export default function Hero() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState("");
  function handleCreateCall() {
    navigate(`/call/created/0`);
  }
  async function handleJoinCall(e) {
    e.preventDefault();
    navigate(`/call/joined/${formValue}`);
  }
  return (
    <section className="max-w-screen-2xl m-auto w-full grid grow gap-4 px-0 sm:px-0 md:grid-cols-2 md:flex-row lg:gap-6 lg:px-0 xl:px-0">
      <div className="flex flex-1 flex-col items-start gap-12 pb-6 md:my-20 lg:my-44 lg:pb-0 pl-3 sm:pl-8 lg:pl-16 xl:pl-32">
        <Badge size="large" variant="secondary">
          Video Call v1.0
        </Badge>
        <div className="flex max-w-lg flex-col gap-6">
          <h3 className="text-4xl font-semibold text-slate-950 md:text-6xl">
            Welcome!
          </h3>
          <h4 className="text-lg font-normal leading-7 text-slate-500">
            This web app lets you make private video calls. We use WebRTC to
            make peer-to-peer connections so that no server can listen in on
            your conversations. Your calls are always end-to-end encrypted and
            we never store any of your call data.
          </h4>
        </div>
        <div className="flex gap-6 flex-wrap">
          <Button variant="primary" size="large" onClick={handleCreateCall}>
            Create a call
          </Button>
          <form className="flex gap-6" onSubmit={handleJoinCall}>
            <Input
              label=""
              placeholder="Enter meeting code"
              helperText=""
              containerClassName="max-w-sm"
              size="large"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
            />
            <Button
              variant="text"
              size="large"
              type="submit"
              className="hover:stroke-blue-950 hover:text-blue-950"
            >
              Join
            </Button>
          </form>
        </div>
      </div>
      <div className="order-first flex w-full flex-1 items-center justify-center bg-slate-50 py-28 md:order-last lg:py-0">
        <img
          src="https://cdn.discordapp.com/attachments/427097807057584131/1287457979607683092/Cheese_on_deez_nuts.png?ex=66f19e2e&is=66f04cae&hm=be0a2de00d9223c28da70a44b13c5d5fb0e1a3c2b1222d43324791bab7a9c314&"
          alt=""
          width={183}
          height={345}
          className="h-[172px] w-[91px] md:h-[345px] md:w-[183px]"
        />
      </div>
    </section>
  );
}
