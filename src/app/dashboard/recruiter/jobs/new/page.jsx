"use client";

import { useState } from "react";
import {
  Card,
  Input,
  TextArea,
  Select,
  Switch,
  Button,
  Label,
  ListBox,
} from "@heroui/react";
import {
  LuBuilding2,
  LuGlobe,
  LuMapPin,
  LuCalendar,
  LuArrowRight,
  LuCircleAlert,
  LuCircleCheck,
} from "react-icons/lu";

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Product & Design",
  "Marketing & Growth",
  "Sales & Business",
  "Operations & HR",
  "Finance & Legal",
];

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Remote",
  "Contract",
  "Internship",
];

const CURRENCIES = ["USD", "EUR", "GBP", "BDT", "INR", "CAD", "AUD"];

// Registered company data (must be approved to post)
const mockRecruiterCompany = {
  id: "comp_hirepulse_01",
  name: "HirePulse Network",
  isApproved: true,
};

export default function PostNewJobPage({ company = mockRecruiterCompany }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedPreview, setSubmittedPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    companyName: company?.name || "",
    category: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: false,
    city: "",
    country: "",
    deadline: "",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRemoteToggle = (checked) => {
    const nextValue =
      typeof checked === "boolean" ? checked : !formData.isRemote;
    setFormData((prev) => ({
      ...prev,
      isRemote: nextValue,
      jobType: nextValue
        ? "Remote"
        : prev.jobType === "Remote"
          ? "Full-time"
          : prev.jobType,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!company?.isApproved) {
      setErrorMessage("Your company must be approved before posting jobs.");
      return;
    }

    if (!formData.companyName.trim()) {
      setErrorMessage("Company name is required.");
      return;
    }

    if (
      formData.salaryMin &&
      formData.salaryMax &&
      Number(formData.salaryMin) > Number(formData.salaryMax)
    ) {
      setErrorMessage("Minimum salary cannot be greater than maximum salary.");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      companyName: formData.companyName.trim(),
      category: formData.category,
      jobType: formData.jobType,
      salaryMin: formData.salaryMin ? Number(formData.salaryMin) : null,
      salaryMax: formData.salaryMax ? Number(formData.salaryMax) : null,
      currency: formData.currency,
      isRemote: formData.isRemote,
      city: formData.isRemote ? "" : formData.city.trim(),
      country: formData.isRemote ? "" : formData.country.trim(),
      location: formData.isRemote
        ? "Remote"
        : [formData.city.trim(), formData.country.trim()]
            .filter(Boolean)
            .join(", "),
      deadline: formData.deadline,
      responsibilities: formData.responsibilities.trim(),
      requirements: formData.requirements.trim(),
      benefits: formData.benefits.trim(),
      companyId: company?.id || null,
      status: "active",
      isPublic: true,
    };

    console.log("Submitted Job Form Data:", payload);
    setSubmittedPreview(payload);
  };

  return (
    <main className="min-h-screen bg-[#0c0d0e] text-white p-6 md:p-10">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6">
        {/* TOP HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Post a New Job
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161719] border border-[#26272b] text-xs text-zinc-300">
              {company?.isApproved ? (
                <>
                  <LuCircleCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">
                    Approved Company
                  </span>
                </>
              ) : (
                <>
                  <LuCircleAlert className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 font-medium">
                    Pending Approval
                  </span>
                </>
              )}
            </div>

            <Button
              type="submit"
              isDisabled={!company?.isApproved}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm inline-flex items-center gap-2 transition-colors shadow-lg shadow-indigo-600/20"
            >
              <span>Publish Job</span>
              <LuArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* APPROVAL WARNING */}
        {!company?.isApproved && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-sm text-amber-300">
            <LuCircleAlert className="w-5 h-5 shrink-0" />
            <span>
              Your company (
              <strong>{company?.name || "Registered Company"}</strong>) must be
              approved before you can post jobs.
            </span>
          </div>
        )}

        {/* VALIDATION ERROR */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        {/* CONSOLE LOG CONFIRMATION BANNER */}
        {/* {submittedPreview && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-sm text-emerald-300">
            Form data logged in browser console (<code>console.log</code>). No
            API request was sent.
          </div>
        )} */}

        {/* SECTION 1: BASIC INFORMATION */}
        <Card className="bg-[#161719] border border-[#26272b] rounded-2xl shadow-none">
          <Card.Content className="p-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <h2 className="text-base font-semibold text-white">
                1. Basic Information
              </h2>
            </div>

            {/* Job Title */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-xs font-medium text-zinc-300"
              >
                Job Title <span className="text-indigo-400">*</span>
              </Label>
              <Input
                id="title"
                required
                placeholder="e.g. Frontend Developer"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#1f2023] border border-[#2c2e33] focus:border-indigo-500 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
              />
            </div>

            {/* Company Name & Job Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="companyName"
                  className="text-xs font-medium text-zinc-300"
                >
                  Company Name <span className="text-indigo-400">*</span>
                </Label>
                <div className="relative flex items-center">
                  <LuBuilding2 className="w-4 h-4 text-zinc-400 left-3.5 pointer-events-none mr-2" />
                  <Input
                    id="companyName"
                    required
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleChange("companyName", e.target.value)
                    }
                    className="w-full h-11 px-4 rounded-xl bg-[#1f2023] border border-[#2c2e33] focus:border-indigo-500 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-zinc-300">
                  Job Category <span className="text-indigo-400">*</span>
                </Label>
                <Select
                  selectedKey={formData.category}
                  onSelectionChange={(key) =>
                    handleChange("category", String(key))
                  }
                  aria-label="Job Category"
                >
                  <Select.Trigger className="w-full h-11 px-4 rounded-xl bg-[#1f2023] border border-[#2c2e33] hover:border-[#3b3e45] text-sm text-white flex items-center justify-between outline-none">
                    <Select.Value />
                    <Select.Indicator className="text-zinc-400" />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1f2023] border border-[#2e3035] rounded-xl p-1 text-white shadow-xl">
                    <ListBox>
                      {JOB_CATEGORIES.map((category) => (
                        <ListBox.Item
                          key={category}
                          id={category}
                          textValue={category}
                          className="px-3 py-2 rounded-lg text-sm hover:bg-[#2a2c32] cursor-pointer outline-none"
                        >
                          {category}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            {/* Job Type Segmented Buttons */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-zinc-300">
                Job Type <span className="text-indigo-400">*</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {JOB_TYPES.map((type) => {
                  const isSelected = formData.jobType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        handleChange("jobType", type);
                        if (type === "Remote") {
                          handleChange("isRemote", true);
                        }
                      }}
                      className={`h-11 px-3 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-indigo-500/15 border-indigo-500 text-white shadow-sm"
                          : "bg-[#1f2023] border-[#2c2e33] text-zinc-400 hover:text-zinc-200 hover:border-[#3b3e45]"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* SECTION 2: LOCATION, COMPENSATION & TIMELINE */}
        <Card className="bg-[#161719] border border-[#26272b] rounded-2xl shadow-none">
          <Card.Content className="p-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <h2 className="text-base font-semibold text-white">
                2. Location, Compensation & Timeline
              </h2>
            </div>

            {/* Remote Toggle Row */}
            <div
              onClick={() => handleRemoteToggle(!formData.isRemote)}
              className="p-4 rounded-xl bg-[#1f2023] border border-[#2c2e33] flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <LuGlobe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Remote Work Allowed
                  </p>
                  <p className="text-xs text-zinc-400">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>
              </div>

              <div onClick={(e) => e.stopPropagation()}>
                <Switch
                  isSelected={formData.isRemote}
                  onChange={handleRemoteToggle}
                  aria-label="Remote Work Allowed"
                >
                  <Switch.Control className="w-11 h-6 rounded-full bg-[#2e3036] data-[selected=true]:bg-indigo-600 transition-colors p-0.5 cursor-pointer">
                    <Switch.Thumb className="w-5 h-5 rounded-full bg-white transition-transform data-[selected=true]:translate-x-5" />
                  </Switch.Control>
                </Switch>
              </div>
            </div>

            {/* Location (City, Country) & Application Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!formData.isRemote ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-zinc-300">
                      Job Location (City & Country)
                    </Label>
                    <span className="text-[11px] text-zinc-500">Required</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="flex items-center gap-2 h-11 px-3 rounded-xl bg-[#1f2023] border border-[#2c2e33] focus-within:border-indigo-500">
                      <LuMapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                      <Input
                        id="city"
                        type="text"
                        placeholder="City (e.g. Dhaka)"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
                      />
                    </div>

                    <div className="flex items-center h-11 px-3 rounded-xl bg-[#1f2023] border border-[#2c2e33] focus-within:border-indigo-500">
                      <Input
                        id="country"
                        type="text"
                        placeholder="Country (e.g. Bangladesh)"
                        value={formData.country}
                        onChange={(e) =>
                          handleChange("country", e.target.value)
                        }
                        className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-zinc-300">
                    Job Location
                  </Label>
                  <div className="h-11 px-3.5 rounded-xl bg-[#1f2023] border border-[#2c2e33] flex items-center gap-2.5 text-sm text-indigo-300">
                    <LuGlobe className="w-4 h-4 shrink-0" />
                    <span>Remote (Worldwide)</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="deadline"
                  className="text-xs font-medium text-zinc-300"
                >
                  Application Deadline{" "}
                  <span className="text-indigo-400">*</span>
                </Label>
                <div className="flex items-center gap-2 h-11 px-3.5 rounded-xl bg-[#1f2023] border border-[#2c2e33] focus-within:border-indigo-500">
                  <LuCalendar className="w-4 h-4 text-zinc-400 shrink-0" />
                  <Input
                    id="deadline"
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.deadline}
                    onChange={(e) => handleChange("deadline", e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none scheme-dark"
                  />
                </div>
              </div>
            </div>

            {/* Salary Min, Salary Max & Currency */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="salaryMin"
                  className="text-xs font-medium text-zinc-300"
                >
                  Min Salary
                </Label>
                <Input
                  id="salaryMin"
                  type="number"
                  min="0"
                  placeholder="e.g. 50000"
                  value={formData.salaryMin}
                  onChange={(e) => handleChange("salaryMin", e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-[#1f2023] border border-[#2c2e33] focus:border-indigo-500 text-sm text-white placeholder:text-zinc-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="salaryMax"
                  className="text-xs font-medium text-zinc-300"
                >
                  Max Salary
                </Label>
                <Input
                  id="salaryMax"
                  type="number"
                  min="0"
                  placeholder="e.g. 85000"
                  value={formData.salaryMax}
                  onChange={(e) => handleChange("salaryMax", e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-[#1f2023] border border-[#2c2e33] focus:border-indigo-500 text-sm text-white placeholder:text-zinc-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-zinc-300">
                  Currency
                </Label>
                <Select
                  selectedKey={formData.currency}
                  onSelectionChange={(key) =>
                    handleChange("currency", String(key))
                  }
                  aria-label="Currency"
                >
                  <Select.Trigger className="w-full h-11 px-4 rounded-xl bg-[#1f2023] border border-[#2c2e33] hover:border-[#3b3e45] text-sm text-white flex items-center justify-between outline-none">
                    <Select.Value />
                    <Select.Indicator className="text-zinc-400" />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#1f2023] border border-[#2e3035] rounded-xl p-1 text-white shadow-xl">
                    <ListBox>
                      {CURRENCIES.map((curr) => (
                        <ListBox.Item
                          key={curr}
                          id={curr}
                          textValue={curr}
                          className="px-3 py-2 rounded-lg text-sm hover:bg-[#2a2c32] cursor-pointer outline-none"
                        >
                          {curr}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* SECTION 3: JOB DESCRIPTION */}
        <Card className="bg-[#161719] border border-[#26272b] rounded-2xl shadow-none">
          <Card.Content className="p-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <h2 className="text-base font-semibold text-white">
                3. Responsibilities & Requirements
              </h2>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="responsibilities"
                className="text-xs font-medium text-zinc-300"
              >
                Key Responsibilities <span className="text-indigo-400">*</span>
              </Label>
              <TextArea
                id="responsibilities"
                required
                rows={4}
                placeholder="Describe key responsibilities..."
                value={formData.responsibilities}
                onChange={(e) =>
                  handleChange("responsibilities", e.target.value)
                }
                className="w-full p-4 rounded-xl bg-[#1f2023] border border-[#2c2e33] focus:border-indigo-500 text-sm text-white placeholder:text-zinc-500 outline-none resize-y"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="requirements"
                className="text-xs font-medium text-zinc-300"
              >
                Qualifications & Requirements{" "}
                <span className="text-indigo-400">*</span>
              </Label>
              <TextArea
                id="requirements"
                required
                rows={4}
                placeholder="List required skills and qualifications..."
                value={formData.requirements}
                onChange={(e) => handleChange("requirements", e.target.value)}
                className="w-full p-4 rounded-xl bg-[#1f2023] border border-[#2c2e33] focus:border-indigo-500 text-sm text-white placeholder:text-zinc-500 outline-none resize-y"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="benefits"
                className="text-xs font-medium text-zinc-300"
              >
                Benefits <span className="text-zinc-500">(Optional)</span>
              </Label>
              <TextArea
                id="benefits"
                rows={3}
                placeholder="Optional perks or benefits..."
                value={formData.benefits}
                onChange={(e) => handleChange("benefits", e.target.value)}
                className="w-full p-4 rounded-xl bg-[#1f2023] border border-[#2c2e33] focus:border-indigo-500 text-sm text-white placeholder:text-zinc-500 outline-none resize-y"
              />
            </div>
          </Card.Content>
        </Card>
      </form>
    </main>
  );
}
