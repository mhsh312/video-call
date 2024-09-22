import React from "react";
import { Button } from "./tailwind-frames/components/button";
import { useNavigate } from "react-router-dom";

export default function EndScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl">The call has ended.</h1>
      <Button
        variant="text"
        size="large"
        className="text-lg"
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
      >
        Go home
      </Button>
    </div>
  );
}
