"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterResourceLinksProps {
  headingClass: string;
  linkClass: string;
}

function isCategoryOrMainPage(pathname: string) {
  if (pathname === "/") return true;
  const slug = pathname.slice(1);
  return slug.endsWith("-headshots") || slug === "dating-photos";
}

export function FooterResourceLinks({
  headingClass,
  linkClass,
}: FooterResourceLinksProps) {
  const pathname = usePathname();
  const isCategory = isCategoryOrMainPage(pathname);

  const resourceLinks = [
    { name: "How It Works", href: isCategory ? "#how-it-works" : "/#how-it-works" },
    {
      name: "Examples",
      href: isCategory ? "#examples" : "/examples",
    },
    {
      name: "Reviews",
      href: isCategory ? "#reviews" : "/#reviews",
    },
    {
      name: "Pricing",
      href: isCategory ? "#pricing" : "/#pricing",
    },
    { name: "FAQs", href: isCategory ? "#faq" : "/#faq" },
  ];

  return (
    <div className="break-inside-avoid mb-8">
      <h4 className={headingClass}>RESOURCES</h4>
      <ul className="space-y-2">
        {resourceLinks.map((link, i) => (
          <li key={i}>
            <Link href={link.href} className={linkClass}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
