import { useState, useEffect, useMemo } from "react";
import { debounce } from "@/utils/debounce";

interface BreakpointConfig {
  mobile: number;
  tablet?: number;
  desktop?: number;
}

const DEFAULT_BREAKPOINTS: BreakpointConfig = {
  mobile: 480,
  tablet: 768,
  desktop: 1280,
};

export function useBreakpoint(
  breakpoints: BreakpointConfig = DEFAULT_BREAKPOINTS
) {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const handleResize = useMemo(
    () =>
      debounce(() => {
        setWindowWidth(window.innerWidth);
      }, 100),
    []
  );

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      handleResize.cancel();
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const breakpoint = useMemo(
    () => ({
      isMobile: windowWidth < breakpoints.mobile,
      isTablet:
        windowWidth >= breakpoints.mobile &&
        windowWidth < (breakpoints.tablet || Infinity),
      isDesktop:
        windowWidth >= (breakpoints.tablet || breakpoints.desktop || Infinity),
    }),
    [windowWidth, breakpoints]
  );

  return breakpoint;
}

// Simplified hook for just mobile detection
export function useIsMobile() {
  const { isMobile } = useBreakpoint();
  return isMobile;
}
