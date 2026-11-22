"use client";
import StatCard from "@/components/dashboard/StatCard";
import { useSession } from "@/lib/auth-client";
import { LuBriefcase, LuUsers, LuZap, LuCircleCheck } from "react-icons/lu";

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return <div>Loading...</div>;
  }

  const statsData = [
    {
      id: 1,
      label: "Total Job Posts",
      value: "48",
      icon: LuBriefcase,
    },
    {
      id: 2,
      label: "Total Applicants",
      value: "1,284",
      icon: LuUsers,
    },
    {
      id: 3,
      label: "Active Jobs",
      value: "18",
      icon: LuZap,
    },
    {
      id: 4,
      label: "Jobs Closed",
      value: "32",
      icon: LuCircleCheck,
    },
  ];
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Welcome back, {user?.name}</h2>
      {/* Responsive Card Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {statsData.map((stat) => (
          <StatCard
            key={stat.id}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </section>
    </div>
  );
};

export default RecruiterDashboardHomePage;
