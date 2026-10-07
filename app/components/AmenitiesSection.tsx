import { Building2, ShieldCheck } from "lucide-react";
import { amenities } from "../static-data";

export default function AmenitiesSection() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-12 font-sans " id="amenities">
      <div className=" container">
        {/* ================= HEADER ================= */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12  ">
          <span className="inline-flex items-center rounded-full bg-[#EAF4EF] px-3 py-1.5 text-xs font-semibold text-[#00875A]">
            আমাদের সুবিধাসমূহ
          </span>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#112233] sm:text-3xl lg:text-4xl">
            আরামদায়ক ও নিশ্চিন্ত বসবাসের জন্য
          </h2>

          <p className="mt-2.5 text-sm leading-6 text-gray-500 sm:text-base">
            দৈনন্দিন জীবনকে আরও সহজ ও স্বাচ্ছন্দ্যময় করতে প্রয়োজনীয় সুবিধাগুলো
            একসাথে।
          </p>
        </div>

        {/* ================= AMENITIES ================= */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {amenities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group rounded-xl border border-gray-200/80 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md sm:p-5"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#EAF4EF] transition-transform duration-200 group-hover:scale-105">
                    <Icon className="h-5 w-5 text-[#00875A]" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#112233] sm:text-base">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= TRUST NOTE ================= */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#00875A]" />
            নিরাপদ পরিবেশ
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

          <span className="flex items-center gap-1.5">
            <CheckIcon />
            পরিচ্ছন্ন আবাসন
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />

          <span className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-[#00875A]" />
            পরিবারবান্ধব
          </span>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#EAF4EF]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#00875A]" />
    </span>
  );
}
