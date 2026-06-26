"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveLink = ({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        className,
        "rounded-sm py-0.5",
        pathname.includes(href)
          ? "text-blue-500 bg-blue-500/10"
          : "text-secondary-foreground"
      )}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;