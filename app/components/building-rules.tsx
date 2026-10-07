import {
  CheckCircle2,
  Clock,
  FileText,
  ShieldAlert,
  Users,
  VolumeX,
} from "lucide-react";

export default function BuildingRulesSection() {
  const rules = [
    {
      id: 1,
      icon: Clock,
      title: "প্রধান গেট বন্ধের সময়",
      description:
        "প্রতিদিন রাত ১১:০০ টার পর বিল্ডিংয়ের মূল গেট লক করা হবে। জরুরি প্রয়োজনে দারোয়ানের সাথে যোগাযোগ করতে হবে।",
    },
    {
      id: 2,
      icon: VolumeX,
      title: "শান্ত পরিবেশ বজায় রাখা",
      description:
        "সবার সুবিধার জন্য রাত ১০টার পর উচ্চস্বরে গান-বাজনা বা অন্য কোনো ধরনের বিরক্তিকর শব্দ করা থেকে বিরত থাকতে হবে।",
    },
    {
      id: 3,
      icon: Users,
      title: "অতিথি আগমন নীতি",
      description:
        "কোনো অতিথি বা আত্মীয় দীর্ঘ সময় অবস্থান করলে ম্যানেজমেন্টকে আগে থেকে অবহিত করতে হবে।",
    },
    {
      id: 4,
      icon: ShieldAlert,
      title: "নিরাপত্তা ও পরিচ্ছন্নতা",
      description:
        "সিঁড়ি বা করিডোরে জুতো, ময়লা বা ব্যক্তিগত সামগ্রী রাখা যাবে না। নির্ধারিত স্থানে ময়লা ফেলতে হবে।",
    },
  ];

  return (
    <section className="bg-[#F8FAFC] py-14 sm:py-16 px-4  " id="rules">
      <div className=" container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4EF] px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#00875A]">
            <FileText className="w-3.5 h-3.5" />
            নিয়মাবলি ও নির্দেশিকা
          </span>

          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#112233]">
            সুন্দর ও সুশৃঙ্খল বসবাসের জন্য
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-600">
            সকল বাসিন্দার নিরাপত্তা, স্বাচ্ছন্দ্য এবং সুন্দর পরিবেশ নিশ্চিত করতে
            কিছু সাধারণ নিয়ম মেনে চলা প্রয়োজন।
          </p>
        </div>

        {/* Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {rules.map((rule) => {
            const Icon = rule.icon;

            return (
              <div
                key={rule.id}
                className="group flex items-start gap-4 rounded-xl border border-gray-200/80 bg-[#F8FAFC] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CFE8DC] hover:bg-white hover:shadow-md"
              >
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EF] text-[#00875A] transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-[#112233]">
                    {rule.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-gray-600">
                    {rule.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Note */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="h-4 w-4 text-[#00875A]" />
            <span>সবার জন্য নিরাপদ পরিবেশ</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="h-4 w-4 text-[#00875A]" />
            <span>পরিচ্ছন্ন ও সুশৃঙ্খল আবাসন</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="h-4 w-4 text-[#00875A]" />
            <span>পরিবারবান্ধব পরিবেশ</span>
          </div>
        </div>
      </div>
    </section>
  );
}
