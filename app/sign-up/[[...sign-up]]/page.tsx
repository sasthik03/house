"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-10">
      <SignUp
        fallbackRedirectUrl="/"
        appearance={{
          elements: {
            card: "rounded-2xl border border-gray-200 bg-white shadow-sm",
            headerTitle: "text-[#112233]",
            headerSubtitle: "text-gray-500",
            formFieldLabel: "text-[#112233]",
            formFieldInput:
              "rounded-xl border-gray-200 focus:border-[#00875A] focus:ring-[#00875A]",
            formButtonPrimary: "rounded-xl bg-[#00875A] hover:bg-[#007A50]",
            footerActionLink: "text-[#00875A] hover:text-[#006F49]",
            socialButtonsBlockButton:
              "rounded-xl border border-gray-200 hover:bg-gray-50",
            dividerLine: "bg-gray-200",
            dividerText: "text-gray-400",
          },
        }}
      />
    </main>
  );
}
