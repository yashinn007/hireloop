// components/HeroSection.jsx
"use client";

import React from "react";
import { TextField, InputGroup, Button, Chip, Card } from "@heroui/react";
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiBarChart2,
  FiStar,
} from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";

const TRENDING_POSITIONS = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

const STATS = [
  {
    id: 1,
    icon: <FiBriefcase className="w-5 h-5 text-zinc-400" />,
    value: "50K",
    label: "Active Jobs",
  },
  {
    id: 2,
    icon: <FiBarChart2 className="w-5 h-5 text-zinc-400" />,
    value: "12K",
    label: "Companies",
  },
  {
    id: 3,
    icon: <HiOutlineUserGroup className="w-5 h-5 text-zinc-400" />,
    value: "2M",
    label: "Job Seekers",
  },
  {
    id: 4,
    icon: <FiStar className="w-5 h-5 text-zinc-400" />,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050507] text-white flex flex-col justify-between pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Top Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-250 h-87.5 bg-linear-to-b from-zinc-800/30 via-zinc-900/10 to-transparent blur-3xl"
      />

      {/* Starfield Background Dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(1px 1px at 15% 45%, #818cf8 100%, transparent),
                            radial-gradient(1.5px 1.5px at 28% 58%, #ffffff 100%, transparent),
                            radial-gradient(1px 1px at 42% 48%, #6366f1 100%, transparent),
                            radial-gradient(1.5px 1.5px at 65% 44%, #ffffff 100%, transparent),
                            radial-gradient(1px 1px at 78% 55%, #818cf8 100%, transparent),
                            radial-gradient(1.5px 1.5px at 88% 49%, #ffffff 100%, transparent),
                            radial-gradient(1px 1px at 22% 68%, #ffffff 100%, transparent),
                            radial-gradient(1px 1px at 73% 64%, #6366f1 100%, transparent)`,
        }}
      />

      {/* Glowing Planet / Horizon Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-65 sm:-bottom-80 lg:-bottom-95 w-187.5 h-187.5 sm:w-[950px] sm:h-[950px] lg:w-[1150px] lg:h-[1150px] rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-indigo-600/30 blur-[70px]" />
        <div
          className="relative w-full h-full rounded-full overflow-hidden border-t border-indigo-400/50 shadow-[0_-25px_90px_rgba(79,70,229,0.55)]"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, #6366f1 0%, #3730a3 22%, #181824 55%, #050507 80%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-25 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 35% 20%, rgba(255,255,255,0.6) 0%, transparent 40%), radial-gradient(ellipse at 65% 25%, rgba(255,255,255,0.5) 0%, transparent 35%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050507]/60 to-[#050507]" />
        </div>
      </div>

      {/* Top & Center Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center mt-4 sm:mt-8">
        {/* Top Badge with Side Accent Lines */}
        <div className="flex items-center justify-center gap-3 mb-7">
          <span className="hidden sm:block h-[1px] w-12 bg-gradient-to-r from-transparent to-indigo-500/50" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800/90 shadow-inner">
            <span className="text-sm" role="img" aria-label="briefcase">
              💼
            </span>
            <span className="text-xs font-mono tracking-wider uppercase text-zinc-400">
              <strong className="text-white font-semibold">50,000+</strong> NEW
              JOBS THIS MONTH
            </span>
          </div>
          <span className="hidden sm:block h-[1px] w-12 bg-gradient-to-l from-transparent to-indigo-500/50" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed mb-9">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Dual Search Bar (HeroUI v3 TextField + InputGroup) */}
        <div className="w-full max-w-2xl bg-[#0d0d11]/90 backdrop-blur-md border border-zinc-800/90 rounded-2xl sm:rounded-full p-2 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">
          {/* Job Title / Skill Input */}
          <TextField
            aria-label="Job title, skill or company"
            className="flex-1"
          >
            <InputGroup className="bg-transparent shadow-none border-0 px-3 h-10 flex items-center gap-2.5">
              <InputGroup.Prefix className="p-0 bg-transparent text-zinc-400">
                <FiSearch className="w-4 h-4 shrink-0" />
              </InputGroup.Prefix>
              <InputGroup.Input
                type="text"
                placeholder="Job title, skill or company"
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
            </InputGroup>
          </TextField>

          {/* Vertical Divider (Desktop) / Horizontal Divider (Mobile) */}
          <div className="h-[1px] w-full sm:h-6 sm:w-[1px] bg-zinc-800 mx-0 sm:mx-1" />

          {/* Location Input */}
          <TextField aria-label="Location or Remote" className="flex-1">
            <InputGroup className="bg-transparent shadow-none border-0 px-3 h-10 flex items-center gap-2.5">
              <InputGroup.Prefix className="p-0 bg-transparent text-zinc-400">
                <FiMapPin className="w-4 h-4 shrink-0" />
              </InputGroup.Prefix>
              <InputGroup.Input
                type="text"
                placeholder="Location or Remote"
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
            </InputGroup>
          </TextField>

          {/* Search Submit Button */}
          <Button
            isIconOnly
            aria-label="Search jobs"
            className="bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl sm:rounded-full w-full sm:w-10 h-10 shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
          >
            <FiSearch className="w-4 h-4" />
          </Button>
        </div>

        {/* Trending Positions Row */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-zinc-500 mr-1">Trending Position</span>
          {TRENDING_POSITIONS.map((role) => (
            <Chip
              key={role}
              size="sm"
              variant="flat"
              className="bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs cursor-pointer transition-colors"
            >
              {role}
            </Chip>
          ))}
        </div>
      </div>

      {/* Bottom Section: Tagline + 4 Stat Cards */}
      <div className="relative z-10 max-w-6xl mx-auto w-full mt-28 sm:mt-36">
        {/* Tagline over Horizon */}
        <h2 className="text-center text-xl sm:text-2xl md:text-[26px] font-normal text-zinc-300 leading-snug mb-8 px-4">
          Assisting over{" "}
          <span className="font-semibold text-white">15,000 job seekers</span>
          <br className="hidden sm:inline" /> find their dream positions.
        </h2>

        {/* 4-Column Responsive Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STATS.map((stat) => (
            <Card
              key={stat.id}
              className="bg-gradient-to-b from-[#0b0b0e]/95 to-[#141418]/95 backdrop-blur-md border border-zinc-800/80 rounded-2xl shadow-xl hover:border-zinc-700/80 transition-colors"
            >
              <Card.Content className="p-6 flex flex-col justify-between min-h-[165px]">
                {/* Top Left Icon */}
                <div>{stat.icon}</div>

                {/* Bottom Metric & Label */}
                <div className="mt-8">
                  <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
