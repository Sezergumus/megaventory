"use client";

import { NextUIProvider } from "@nextui-org/react";

/* Provider for NextUI */
export function Providers({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
