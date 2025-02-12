import { useEffect, useState } from "react";

export default function Loading({loadingText}) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-800 text-white">
      <div className="relative w-48 h-6 overflow-hidden border border-gray-600 rounded-full animate-pulse">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-red-500 animate-marquee"></div>
      </div>
      <p className="mt-4 text-lg font-semibold">{loadingText}{dots}</p>
    </div>
  );
}
