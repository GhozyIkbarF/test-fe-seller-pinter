"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

const BlurImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      src={src}
      height="500"
      width="500"
      onLoad={() => setLoaded(true)}
      className={cn(
        "absolute inset-0 h-full w-full rounded-lg object-cover object-top transition duration-200",
        loaded ? "blur-none" : "blur-md",
      )}
      alt={alt}
    />
  );
};

export default BlurImage;
