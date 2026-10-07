import {
  ArrowRight,
  Building2,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "../config";

export default function FooterSection() {
  return (
    <footer className="bg-[#112233] text-gray-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-7">
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00875A] text-white shadow-sm">
                <Building2 className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-white">
                  ${siteConfig.name}
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">
                  আবাসিক ভবন • {siteConfig.location.city}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
              {" "}
              {siteConfig.footer.description}{" "}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              নিরাপদ ও পরিবারবান্ধব আবাসন
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="border-l-2 border-[#00875A] pl-2.5 text-sm font-bold text-white">
              দ্রুত দেখুন
            </h4>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-[#00875A] transition-transform group-hover:translate-x-0.5" />
                  হোম
                </Link>
              </li>

              <li>
                <Link
                  href="#available-flats"
                  className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-[#00875A] transition-transform group-hover:translate-x-0.5" />
                  খালি রুম ও ফ্ল্যাট
                </Link>
              </li>

              <li>
                <Link
                  href="#amenities"
                  className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-[#00875A] transition-transform group-hover:translate-x-0.5" />
                  সুযোগ-সুবিধা
                </Link>
              </li>

              <li>
                <Link
                  href="#rules"
                  className="group flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-[#00875A] transition-transform group-hover:translate-x-0.5" />
                  আবাসিক নিয়মাবলি
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Info */}
          <div className="lg:col-span-3">
            <h4 className="border-l-2 border-[#00875A] pl-2.5 text-sm font-bold text-white">
              আমাদের সম্পর্কে
            </h4>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00875A]" />
                <span>পরিবারবান্ধব আবাসিক ভবন</span>
              </li>

              <li className="flex items-start gap-2.5">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#00875A]" />
                <span>নিরাপদ ও সুশৃঙ্খল পরিবেশ</span>
              </li>

              <li className="flex items-start gap-2.5">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#00875A]" />
                <span>নিয়মিত পরিচ্ছন্নতা ও রক্ষণাবেক্ষণ</span>
              </li>

              <li className="flex items-start gap-2.5">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#00875A]" />
                <span>প্রয়োজন অনুযায়ী রুম ও ফ্ল্যাটের ব্যবস্থা</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="border-l-2 border-[#00875A] pl-2.5 text-sm font-bold text-white">
              যোগাযোগ
            </h4>

            <div className="mt-5 space-y-3.5 text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00875A]" />
                <span>
                  {siteConfig.location.address} ,{siteConfig.location.city} ,
                  {siteConfig.location.division}, {siteConfig.location.country},
                  <span className="block mt-0.5 text-xs text-gray-500">
                    {siteConfig.name}
                  </span>
                </span>
              </div>

              <a
                href="tel:+8801700000000"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#00875A]" />
                <span> {siteConfig.contact.phone}</span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#00875A]" />
                <span> {siteConfig.contact.email}</span>
              </a>

              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#00875A]" />
                <span>
                  যোগাযোগের সময়
                  <span className="block mt-0.5 text-xs text-gray-500">
                    {siteConfig.businessHours.time}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-9 border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-left">
            © ২০২৬ ${siteConfig.name} । সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex items-center justify-center gap-5">
            <Link
              href="/privacy"
              className="transition-colors hover:text-gray-300"
            >
              গোপনীয়তা
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-gray-300"
            >
              শর্তাবলি
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
