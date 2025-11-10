import { useEffect, useState } from "react";

export const useFallbackImage = (src: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState("");
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoadedSrc(src);
      setIsLoaded(true);
    };
  }, [src]);
  return { isLoaded, loadedSrc };
};
