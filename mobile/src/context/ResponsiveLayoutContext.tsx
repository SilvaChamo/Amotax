import React, { createContext, useContext } from "react";
import {
  useResponsiveLayout,
  type ResponsiveLayout,
} from "../hooks/useResponsiveLayout";

const ResponsiveLayoutContext = createContext<ResponsiveLayout | null>(null);

export function ResponsiveLayoutProvider({
  value,
  children,
}: {
  value: ResponsiveLayout;
  children: React.ReactNode;
}) {
  return (
    <ResponsiveLayoutContext.Provider value={value}>
      {children}
    </ResponsiveLayoutContext.Provider>
  );
}

export function useResponsiveLayoutContext(): ResponsiveLayout {
  const ctx = useContext(ResponsiveLayoutContext);
  if (!ctx) {
    throw new Error("useResponsiveLayoutContext fora de ResponsiveLayoutProvider");
  }
  return ctx;
}

/** Seguro fora do provider (ex. testes) — recalcula localmente */
export function useResponsiveLayoutContextSafe(): ResponsiveLayout {
  const ctx = useContext(ResponsiveLayoutContext);
  return ctx ?? useResponsiveLayout();
}
