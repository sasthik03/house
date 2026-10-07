"use client";

import { siteConfig } from "@/app/config";
import { UserButton, useUser } from "@clerk/nextjs";
export default function AdminHeader() {
  const { user, isLoaded } = useUser();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-3 pl-12 md:pl-0">
          <div>
            <p className="text-xs text-gray-500">{siteConfig.name}</p>

            <h2 className="text-base font-bold text-[#112233] sm:text-lg">
              ড্যাশবোর্ড
            </h2>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isLoaded && user && (
            <div className="flex items-center gap-2">
              {/* User Info */}
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-[#112233]">
                  {user.fullName || user.firstName || "Admin"}
                </p>

                <p className="text-xs text-gray-400">Admin</p>
              </div>

              {/* Clerk User Menu */}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
