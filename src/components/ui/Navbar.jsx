"use client";
import { useState } from "react";
import { Link, Button, Spinner } from "@heroui/react";
import NavLinks from "./NavLinks";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { authClient } from "@/lib/auth-client";
import { DropdownProfile } from "./DropdownProfile";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const links = (
    <>
      <li>
        <NavLinks href={"/"}>Home</NavLinks>
      </li>
      <li>
        <NavLinks href={"/browse-jobs"}>Browse Jobs</NavLinks>
      </li>
      <li>
        <NavLinks href={"/company"}>Company</NavLinks>
      </li>
      <li>
        <NavLinks href={"/pricing"}>Pricing</NavLinks>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 container items-center justify-between px-3">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="Logo"
              height={300}
              width={300}
              loading="eager"
              className="w-32 md:w-36 h-auto"
            ></Image>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">{links}</ul>
        {/* container */}
        <div className="flex gap-2 items-center">
          {/* buttons */}
          {isPending ? (
            <>
              <Spinner color="success" className="mr-2" />
            </>
          ) : !user ? (
            <div className="space-x-2 ">
              <Link href="/login">Login</Link>
              <Link href="/signup">
                <Button size="sm" className="bg-[#5c53fe]">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <DropdownProfile user={user}></DropdownProfile>
          )}
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">{links}</ul>
        </div>
      )}
    </nav>
  );
}
