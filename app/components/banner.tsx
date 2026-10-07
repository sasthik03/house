"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { siteConfig } from "../config";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const fadeUpSmall = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const imageAnimation = {
  hidden: {
    opacity: 0,
    x: 35,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function HeroSection() {
  return (
    <section className="hero-gradient dot-pattern relative overflow-hidden py-8 sm:py-12 lg:py-14">
      {/* ================= BACKGROUND DECORATION ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#1E3A5F]/5 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.15,
          ease: "easeOut",
        }}
        className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#1E3A5F]/5 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.15,
                },
              },
            }}
            className="max-w-xl"
          >
            {/* Location */}
            <motion.div
              variants={fadeUpSmall}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs font-medium text-[#475569] shadow-sm"
            >
              <MapPin className="h-3.5 w-3.5 text-[#1E3A5F]" />

              <span>
                {" "}
                {siteConfig.location.city} , {siteConfig.location.country}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-2xl font-bold leading-[1.15] tracking-tight text-[#0F172A] sm:text-3xl lg:text-[44px]"
            >
              আপনার পরিবারের জন্য
              <motion.span
                className="mt-1 block text-[#1E3A5F]"
                variants={fadeUp}
              >
                একটি সুন্দর ঠিকানা।
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUpSmall}
              className="mt-5 max-w-lg text-sm leading-7 text-[#64748B] sm:text-base"
            >
              নিরাপদ পরিবেশ, প্রয়োজনীয় আধুনিক সুবিধা এবং পরিচ্ছন্ন আবাসিক
              ব্যবস্থাপনায় আপনার পরিবারের জন্য একটি নির্ভরযোগ্য বাসস্থান।
            </motion.p>

            {/* ================= TRUST POINTS ================= */}
            <motion.div
              variants={fadeUpSmall}
              className="mt-6 flex flex-wrap gap-x-5 gap-y-3"
            >
              {/* Security */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 text-sm text-[#475569]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </span>
                ২৪/৭ নিরাপত্তা
              </motion.div>

              {/* Building */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 text-sm text-[#475569]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E3A5F]/5">
                  <Building2 className="h-4 w-4 text-[#1E3A5F]" />
                </span>
                Family Building
              </motion.div>

              {/* Available */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 text-sm text-[#475569]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E3A5F]/5">
                  <CheckCircle className="h-4 w-4 text-[#1E3A5F]" />
                </span>
                ৩টি ফ্ল্যাট available
              </motion.div>
            </motion.div>

            {/* ================= CTA ================= */}
            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              {" "}
              {/* View Flats */}{" "}
              <motion.a
                href="#available-flats"
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#16304F] hover:shadow-md"
              >
                {" "}
                ফ্ল্যাট দেখুন{" "}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />{" "}
              </motion.a>{" "}
              {/* Call */}{" "}
              <motion.a
                href={`tel:${siteConfig.contact.phone}`}
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-semibold text-[#334155] transition-colors duration-200 hover:border-[#94A3B8] hover:bg-[#F8FAFC]"
              >
                {" "}
                <Phone className="h-4 w-4" /> যোগাযোগ করুন{" "}
              </motion.a>{" "}
            </motion.div>

            {/* ================= REASSURANCE ================= */}
            <motion.div
              variants={fadeUpSmall}
              className="mt-5 flex items-center gap-2 text-xs text-[#94A3B8]"
            >
              <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />

              <span>পরিবারের জন্য উপযোগী • নিরাপদ • পরিচ্ছন্ন</span>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT IMAGE ================= */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageAnimation}
            className="relative"
          >
            <motion.div
              whileHover={{
                y: -4,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.10)]"
            >
              <div className="relative h-[280px] sm:h-[360px] lg:h-[420px]">
                <Image
                  src="/building-removebg-preview.png"
                  alt={`  ${siteConfig.name} আবাসিক ভবন`}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Image gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Property label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5"
                >
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-white/75">
                        আবাসিক ভবন
                      </p>

                      <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                        {siteConfig.name}
                      </h2>

                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-white/85">
                        <MapPin className="h-3.5 w-3.5" />

                        <span>
                          {siteConfig.location.address} ,
                          {siteConfig.location.city} ,
                          {siteConfig.location.division},{" "}
                          {siteConfig.location.country},
                        </span>
                      </div>
                    </div>

                    {/* Available badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="shrink-0 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#1E3A5F] shadow-sm backdrop-blur-sm"
                    >
                      ৩টি ফ্ল্যাট available
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Bottom information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 1,
              }}
              className="mt-3 flex items-center justify-between px-1 text-xs text-[#64748B]"
            >
              <span>পরিবারবান্ধব পরিবেশ</span>

              <span className="h-1 w-1 rounded-full bg-[#CBD5E1]" />

              <span>পরিচ্ছন্ন আবাসন</span>

              <span className="h-1 w-1 rounded-full bg-[#CBD5E1]" />

              <span>সহজ যোগাযোগ</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
