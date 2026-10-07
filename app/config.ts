export const siteConfig = {
  name: "শান্তি নিবাস",

  shortName: "শান্তি নিবাস",

  description:
    "দিনাজপুর শহরে নিরাপদ, পরিচ্ছন্ন ও পরিবারবান্ধব আবাসিক পরিবেশে বসবাসের জন্য একটি সুন্দর ঠিকানা।",

  tagline: "আপনার পরিবারের জন্য একটি সুন্দর ও নিরাপদ ঠিকানা।",

  url: "https://shantinibas.com",

  location: {
    city: "দিনাজপুর",
    division: "রংপুর বিভাগ",
    country: "বাংলাদেশ",
    address: "দিনাজপুর শহর, দিনাজপুর, বাংলাদেশ",
  },

  contact: {
    phone: "+8801737813575",
    email: "info@shantinibas.com",
  },

  businessHours: {
    label: "যোগাযোগের সময়",
    days: "প্রতিদিন",
    time: "সকাল ৯টা – রাত ৯টা",
  },

  branding: {
    primaryColor: "#00875A",
    secondaryColor: "#1E3A5F",
    darkColor: "#112233",
    lightColor: "#EAF4EF",

    logo: "/logo.png",
    buildingImage: "/building-removebg-preview.png",
    heroImage: "/hero-building-bg.jpg",
  },

  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },

  navigation: [
    {
      label: "হোম",
      href: "/",
    },
    {
      label: "ফ্ল্যাটসমূহ",
      href: "/rooms",
    },
    {
      label: "সুবিধাসমূহ",
      href: "/#amenities",
    },
    {
      label: "ভবন সম্পর্কে",
      href: "/#about",
    },
    {
      label: "যোগাযোগ",
      href: "/#contact",
    },
  ],

  footer: {
    description:
      "নিরাপদ, পরিচ্ছন্ন ও পরিবারবান্ধব আবাসিক পরিবেশে আপনার জন্য একটি সুন্দর ঠিকানা।",

    quickLinks: [
      {
        label: "হোম",
        href: "/",
      },
      {
        label: "ফ্ল্যাটসমূহ",
        href: "/rooms",
      },
      {
        label: "সুবিধাসমূহ",
        href: "/#amenities",
      },
      {
        label: "যোগাযোগ",
        href: "/#contact",
      },
    ],

    legalLinks: [
      {
        label: "গোপনীয়তা নীতি",
        href: "/privacy",
      },
      {
        label: "শর্তাবলী",
        href: "/terms",
      },
    ],
  },

  admin: {
    name: "শান্তি নিবাস প্রশাসন",
    basePath: "/admin",

    navigation: [
      {
        title: "প্রধান",
        items: [
          {
            label: "ড্যাশবোর্ড",
            href: "/admin",
            icon: "LayoutDashboard",
          },
        ],
      },

      {
        title: "সম্পত্তি ব্যবস্থাপনা",
        items: [
          {
            label: "রুম ও ফ্ল্যাট",
            href: "/admin/rooms",
            icon: "Building2",
          },
          {
            label: "ভাড়াটিয়া",
            href: "/admin/tenants",
            icon: "Users",
          },
          {
            label: "জিজ্ঞাসা",
            href: "/admin/enquiries",
            icon: "MessageSquare",
          },
        ],
      },

      {
        title: "আর্থিক ব্যবস্থাপনা",
        items: [
          {
            label: "ভাড়া ও পেমেন্ট",
            href: "/admin/rent",
            icon: "WalletCards",
          },
        ],
      },

      {
        title: "পরিচালনা",
        items: [
          {
            label: "রক্ষণাবেক্ষণ",
            href: "/admin/maintenance",
            icon: "Wrench",
          },
          {
            label: "নোটিশ",
            href: "/admin/notices",
            icon: "Bell",
          },
        ],
      },

      {
        title: "তথ্য ও কনটেন্ট",
        items: [
          {
            label: "ভবনের তথ্য",
            href: "/admin/building-info",
            icon: "Building",
          },
          {
            label: "সুবিধাসমূহ",
            href: "/admin/amenities",
            icon: "Sparkles",
          },
          {
            label: "নিয়মাবলি",
            href: "/admin/rules",
            icon: "ShieldCheck",
          },
          {
            label: "গ্যালারি",
            href: "/admin/gallery",
            icon: "Images",
          },
        ],
      },

      {
        title: "বিশ্লেষণ",
        items: [
          {
            label: "রিপোর্ট",
            href: "/admin/reports",
            icon: "BarChart3",
          },
        ],
      },

      {
        title: "সিস্টেম",
        items: [
          {
            label: "প্রশাসকগণ",
            href: "/admin/users",
            icon: "UserCog",
          },
          {
            label: "সেটিংস",
            href: "/admin/settings",
            icon: "Settings",
          },
        ],
      },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
