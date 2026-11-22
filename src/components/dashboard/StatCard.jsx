"use client";

import { Card } from "@heroui/react";

export default function StatCard({ icon: Icon, label, value }) {
  return (
    <Card className="bg-[#161719] border border-[#26272b] rounded-2xl shadow-none transition-colors hover:border-[#383a40]">
      <Card.Content className="p-6 flex flex-col justify-between gap-7">
        {/* Top Icon Container */}
        <div className="w-11 h-11 rounded-xl bg-[#222326] border border-[#2e3035] flex items-center justify-center text-zinc-300">
          {Icon && <Icon className="w-5 h-5" />}
        </div>

        {/* Bottom Label & Metric */}
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-zinc-400">{label}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">
            {value}
          </h3>
        </div>
      </Card.Content>
    </Card>
  );
}
