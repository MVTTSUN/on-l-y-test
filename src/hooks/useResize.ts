import { useEffect, useState } from "react";

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event: UIEvent) => {
      const target = event.target as Window;
      setWidth(target.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return {
    width,
    isLargeScreen: width > 1200,
    isHighMediumScreen: width > 780 && width <= 1200,
    isLowMediumScreen: width > 560 && width <= 780,
    isSmallScreen: width <= 560,
  };
};
