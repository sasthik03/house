"use client";

import { siteConfig } from "@/app/config";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  Building2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuGroups = [
  {
    label: "মূল মেনু",
    items: [
      {
        label: "ড্যাশবোর্ড",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        label: "রুম ও ফ্ল্যাট",
        href: "/admin/rooms",
        icon: Building2,
      },
      {
        label: "ভাড়াটিয়া",
        href: "/admin/tenants",
        icon: Users,
      },
      {
        label: "অনুরোধ",
        href: "/admin/enquiries",
        icon: ClipboardList,
      },
      {
        label: "ভাড়া ও পেমেন্ট",
        href: "/admin/rent",
        icon: CreditCard,
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const closeMenu = () => setOpen(false);

  const handleLogout = async () => {
    await signOut({
      redirectUrl: "/",
    });
  };

  const userName =
    user?.fullName || user?.firstName || user?.username || "অ্যাডমিন";

  const userEmail = user?.primaryEmailAddress?.emailAddress || "Admin Account";

  const userRole = user?.publicMetadata?.role;

  const roleLabel = userRole === "admin" ? "বাড়ির মালিক" : userRole || "Admin";

  const userInitial =
    user?.firstName?.charAt(0) || user?.fullName?.charAt(0) || "আ";

  return (
    <>
      {/* Mobile Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      {open && (
        <button
          type="button"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          aria-label="Close menu"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-gray-200 bg-white transition-transform duration-300 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[72px] items-center justify-between border-b border-gray-100 px-5">
          <Link
            href="/admin"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00875A] text-white shadow-sm">
              <Building2 className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-base font-extrabold text-[#112233]">
                {siteConfig.name}
              </h1>

              <p className="text-[11px] text-gray-500">Admin Panel</p>
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={closeMenu}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-6">
            {menuGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {group.label}
                </p>

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;

                    const isActive =
                      item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                          isActive
                            ? "bg-[#EAF4EF] text-[#00875A]"
                            : "text-gray-600 hover:bg-gray-50 hover:text-[#112233]"
                        }`}
                      >
                        <Icon
                          className={`h-[18px] w-[18px] shrink-0 ${
                            isActive
                              ? "text-[#00875A]"
                              : "text-gray-400 group-hover:text-gray-600"
                          }`}
                        />

                        <span className="flex-1">{item.label}</span>

                        {isActive && <ChevronRight className="h-4 w-4" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Public Website */}
        <div className="border-t border-gray-100 px-3 py-3">
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-[#112233]"
          >
            <Home className="h-[18px] w-[18px] shrink-0 text-gray-400 transition-colors group-hover:text-[#00875A]" />

            <span className="flex-1">হোমপেজ দেখুন</span>

            <ChevronRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Admin Profile */}
        <div className="border-t border-gray-100 p-3">
          <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-3">
            {/* Avatar */}
            {!isLoaded ? (
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-gray-200" />
            ) : user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={userName}
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF4EF] text-sm font-bold text-[#00875A]">
                {userInitial}
              </div>
            )}

            {/* User Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#112233]">
                {isLoaded ? userName : "Loading..."}
              </p>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
              aria-label="Logout"
              title="লগআউট"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
