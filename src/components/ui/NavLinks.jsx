"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const NavLinksContent = ({ href, children }) => {
  const pathname = usePathname();

  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={`${isActive && "text-[#5C53FE] border-b-2 pb-1 border-[#5C53FE]"} font-semibold`}
    >
      {children}
    </Link>
  );
};

const NavLinks = ({ href, children }) => {
  return (
    <Suspense fallback={<Link href={href}>{children}</Link>}>
      <NavLinksContent href={href}>{children}</NavLinksContent>
    </Suspense>
  );
};

export default NavLinks;
