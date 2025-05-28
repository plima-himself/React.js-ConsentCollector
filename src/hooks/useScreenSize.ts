import { useState, useEffect } from "react";
import { Dimensions } from "types";

export default function useScreenSize(): Dimensions {
  const [screenSize, setScreenSize] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
