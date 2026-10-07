"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { FaPhoneAlt, FaTachometerAlt, FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { siteConfig } from "../config";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();

  const closeMenu = () => setIsOpen(false);

  const role = user?.publicMetadata?.role;
  const isAdmin = role === "admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b2545] text-xl text-white shadow-sm">
              <BiHomeAlt />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-[#0b2545] sm:text-xl">
                {siteConfig.name}
              </span>

              <span className="text-[10px] tracking-wider text-slate-500">
                সহজ ও নিরাপদ
              </span>
            </div>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Phone */}
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-2 rounded-full bg-[#f0f4f8] px-4 py-2.5 text-sm font-medium text-[#0b2545] transition-colors hover:bg-[#e2eaf2]"
            >
              <FaPhoneAlt className="text-xs text-[#00875a]" />
              <span>{siteConfig.contact.phone}</span>
            </a>

            {/* Admin Dashboard */}
            {isLoaded && isSignedIn && isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2 rounded-full border border-[#00875A]/20 bg-[#EAF4EF] px-4 py-2.5 text-sm font-semibold text-[#00875A] transition-colors hover:bg-[#dcefe6]"
              >
                <FaTachometerAlt className="text-xs" />
                <span>ড্যাশবোর্ড</span>
              </Link>
            )}

            {/* Auth */}
            {!isLoaded ? (
              <div className="h-10 w-24 animate-pulse rounded-full bg-slate-100" />
            ) : isSignedIn ? (
              <div className="flex items-center gap-2">
                <div className="hidden text-right lg:block">
                  <p className="text-sm font-medium text-[#112233]">
                    {user?.fullName || user?.firstName || "User"}
                  </p>

                  <p className="text-xs text-slate-400">
                    {isAdmin ? "Administrator" : "Account"}
                  </p>
                </div>

                <UserButton />
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="flex items-center gap-2 rounded-full bg-[#0b2545] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#0c3d68] hover:shadow-md"
              >
                <FaUser className="text-xs" />
                <span>লগইন</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-[#0b2545] transition-colors hover:bg-slate-100 md:hidden"
            aria-label={isOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={isOpen}
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white shadow-lg md:hidden">
          <div className="container mx-auto px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-3">
              {/* Phone */}
              <a
                href={`tel:${siteConfig.contact.phone}`}
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#f0f4f8] py-3 text-sm font-medium text-[#0b2545] transition-colors hover:bg-[#e2eaf2]"
              >
                <FaPhoneAlt className="text-xs text-[#00875a]" />
                <span>{siteConfig.contact.phone}</span>
              </a>

              {/* Mobile Admin Dashboard */}
              {isLoaded && isSignedIn && isAdmin && (
                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#EAF4EF] py-3 text-sm font-semibold text-[#00875A] transition-colors hover:bg-[#dcefe6]"
                >
                  <FaTachometerAlt className="text-xs" />
                  <span>অ্যাডমিন ড্যাশবোর্ড</span>
                </Link>
              )}

              {/* Mobile Auth */}
              {!isLoaded ? (
                <div className="h-11 w-full animate-pulse rounded-xl bg-slate-100" />
              ) : isSignedIn ? (
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#f8fafc] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <UserButton />

                    <div>
                      <p className="text-sm font-medium text-[#112233]">
                        {user?.fullName || user?.firstName || "User"}
                      </p>

                      <p className="text-xs text-slate-400">
                        {isAdmin ? "Administrator" : "Account"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0b2545] py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#0c3d68]"
                >
                  <FaUser className="text-xs" />
                  <span>লগইন</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
