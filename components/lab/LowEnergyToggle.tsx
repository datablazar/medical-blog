"use client";

import { useState, type ReactNode } from "react";

export function LowEnergyToggle({
  className,
  buttonClassName,
  children,
}: {
  className?: string;
  buttonClassName?: string;
  children: ReactNode;
}) {
  const [low, setLow] = useState(false);

  return (
    <div className={className} data-low-energy={low ? "on" : "off"}>
      <button type="button" className={buttonClassName} aria-pressed={low} onClick={() => setLow(!low)}>
        <span aria-hidden="true" />
        Low-energy mode {low ? "on" : "off"}
      </button>
      {children}
    </div>
  );
}
