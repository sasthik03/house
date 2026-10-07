/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSignIn } from "@clerk/nextjs";
import {
  Building2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DEFAULT_EMAIL = "admin@gmail.com";
const DEFAULT_PASSWORD = "YourDemoPassword123";

export default function SignInPage() {
  const { signIn, errors } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      await signIn.create({
        identifier: email,
        password,
      });

      if (signIn.status === "complete") {
        await signIn.finalize();

        router.push("/");
        router.refresh();

        return;
      }

      setError(
        "লগইন সম্পূর্ণ করা যায়নি। আপনার অ্যাকাউন্টের অতিরিক্ত verification প্রয়োজন হতে পারে।",
      );
    } catch (err: any) {
      console.error("Clerk sign-in error:", err);

      const clerkError =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।";

      setError(clerkError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00875A] text-white shadow-sm">
              <Building2 size={28} strokeWidth={1.8} />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#112233]">
              শান্তি নিবাস
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              আপনার অ্যাকাউন্টে লগইন করুন
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#112233]"
                >
                  ইমেইল
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="আপনার ইমেইল"
                    autoComplete="email"
                    required
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-[#112233] outline-none transition placeholder:text-gray-400 focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#112233]"
                >
                  পাসওয়ার্ড
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="আপনার পাসওয়ার্ড"
                    autoComplete="current-password"
                    required
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-11 text-sm text-[#112233] outline-none transition placeholder:text-gray-400 focus:border-[#00875A] focus:ring-2 focus:ring-[#00875A]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                    aria-label={
                      showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#00875A] text-sm font-semibold text-white transition hover:bg-[#007A50] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    লগইন হচ্ছে...
                  </>
                ) : (
                  "লগইন করুন"
                )}
              </button>
            </form>

            {/* Demo Notice */}
            <div className="mt-6 rounded-xl bg-[#EAF4EF] px-4 py-3 text-center">
              <p className="text-xs leading-5 text-[#006B48]">
                Development / Demo Login
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} শান্তি নিবাস
          </p>
        </div>
      </div>
    </main>
  );
}
