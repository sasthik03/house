import { AlertCircle, ArrowRight, Bell, Calendar, Info } from "lucide-react";

export default function NoticeBoardSection() {
  // ডামি নোটিশ ডাটা
  const notices = [
    {
      id: 1,
      date: "০৫ অক্টোবর, ২০২৬",
      title: "আগামী শুক্রবার পানির লাইন সংস্হাপনের কাজ চলবে",
      description:
        "জরুরি রক্ষণাবেক্ষণ কাজের জন্য সকাল ১০টা থেকে দুপুর ২টা পর্যন্ত পানি সরবরাহ সাময়িকভাবে বন্ধ থাকবে। সকলের সহযোগিতা কামনা করছি।",
      tag: "জরুরি",
      tagColor: "bg-red-100 text-red-700 border-red-200",
      icon: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
    },
    {
      id: 2,
      date: "০১ অক্টোবর, ২০২৬",
      title: "মাসিক ভাড়া পরিশোধ সংক্রান্ত নোটিশ",
      قtitle: "মাসিক ভাড়া পরিশোধ সংক্রান্ত নোটিশ",
      description:
        "চলতি মাসের ১০ তারিখের মধ্যে সংশ্লিষ্ট মাসের বাসা ভাড়া এবং ইউটিলিটি বিল ম্যানেজমেন্ট অফিসে পরিশোধ করার জন্য অনুরোধ করা হলো।",
      tag: "সাধারণ",
      tagColor: "bg-blue-100 text-blue-700 border-blue-200",
      icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
    },
    {
      id: 3,
      date: "২৮ সেপ্টেম্বর, ২০২৬",
      title: "বিল্ডিংয়ের নিরাপত্তা ও গেট বন্ধের সময় পরিবর্তন",
      description:
        "রাত ১১:০০ টার পর মূল গেট সম্পূর্ণ লক করা থাকবে। জরুরি প্রয়োজনে দারোয়ানের সাথে যোগাযোগ করার জন্য বলা হলো।",
      tag: "নিরাপত্তা",
      tagColor: "bg-amber-100 text-amber-700 border-amber-200",
      icon: <Bell className="w-5 h-5 text-amber-600 shrink-0" />,
    },
  ];

  return (
    <section className="bg-[#F9F9F8] py-14 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <span className="bg-[#E6EEF4] text-[#1E3A5F] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5" /> নোটিশ বোর্ড
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#112233]">
              বিল্ডিংয়ের জরুরি ঘোষণা ও আপডেট
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl">
              বাসার বাসিন্দা ও ভিজিটরদের জন্য বিল্ডিংয়ের সাম্প্রতিক সকল নোটিশ
              এবং গুরুত্বপূর্ণ নির্দেশনা।
            </p>
          </div>

          {/* View All Button (Optional) */}
          <button className="inline-flex items-center gap-2 text-sm font-bold text-[#00875A] hover:text-[#006E48] transition-colors self-start md:self-auto">
            সব নোটিশ দেখুন <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Top Meta: Date & Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{notice.date}</span>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${notice.tagColor}`}
                  >
                    {notice.tag}
                  </span>
                </div>

                {/* Title with Icon */}
                <div className="flex items-start gap-3 pt-1">
                  {notice.icon}
                  <h3 className="text-base font-bold text-[#112233] leading-snug">
                    {notice.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {notice.description}
                </p>
              </div>

              {/* Card Footer / Action */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>ম্যানেজমেন্ট কতৃপক্ষ</span>
                <span className="text-[#00875A] font-semibold cursor-pointer hover:underline">
                  বিস্তারিত পড়ুন
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
