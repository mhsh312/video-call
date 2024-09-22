import { Button } from "./tailwind-frames/components/button";
import { Divider } from "./tailwind-frames/components/divider";
import { GitHubOctocatIcon } from "./tailwind-frames/assets/github-octocat-icon";

function FooterColumn() {
  return (
    <div className="flex flex-col">
      <p className="mb-4 text-sm font-semibold leading-tight text-blue-950">
        About
      </p>
      <div className="flex flex-col gap-4">
        <a
          href="https://en.wikipedia.org/wiki/WebRTC"
          className="text-sm leading-tight text-slate-500"
        >
          WebRTC
        </a>
        <a
          href="https://github.com/mhsh312/video-call-app"
          className="text-sm leading-tight text-slate-500"
        >
          Github Project Link
        </a>
      </div>
    </div>
  );
}

function Copyright() {
  return <p className="text-xs text-slate-500">© Mahesh Khatri</p>;
}

export default function Footer() {
  return (
    <div className="flex flex-col gap-1 pt-12 pb-6 max-w-screen-2xl m-auto w-full px-3 sm:px-8 lg:px-16 xl:px-32">
      <div className="mb-6 flex w-full flex-col justify-between gap-12 lg:mb-24 lg:flex-row lg:gap-20">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left 2xl:grow">
          <p className="text-2xl font-semibold text-slate-950">Video Call</p>
          <p className="max-w-96 text-md text-slate-500">
            This is a college project that I made. All the code is open-source
            and Github links have been provided.
          </p>
        </div>
        <div className="grid grid-column-end text-center md:grid-cols-1 lg:grid-cols-1 2xl:grow-0 2xl:gap-32">
          <FooterColumn />
        </div>
      </div>
      <Divider direction="horizontal" />
      <div className="flex w-full flex-col-reverse items-center gap-6 text-center lg:flex-row lg:justify-between lg:gap-0 lg:text-left">
        <Copyright className="text-sm" />
        <Button
          variant="text"
          size="xsmall"
          iconOnly
          aria-label="dribble"
          href="https://www.github.com/mhsh312"
        >
          <GitHubOctocatIcon />
        </Button>
      </div>
    </div>
  );
}
