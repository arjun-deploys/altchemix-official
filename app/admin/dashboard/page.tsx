"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrandLogo from "@/components/shared/BrandLogo";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "new" | "contacted" | "qualified" | "converted" | "lost";

interface Contact {
  _id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  product: string;
  message: string;
  status: Status;
  notes: string;
  createdAt: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  Status,
  { label: string; color: string; bg: string; border: string; dot: string }
> = {
  new: {
    label: "New",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    dot: "bg-sky-400",
  },
  contacted: {
    label: "Contacted",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    dot: "bg-violet-400",
  },
  qualified: {
    label: "Qualified",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
  },
  converted: {
    label: "Converted",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  lost: {
    label: "Lost",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    dot: "bg-red-400",
  },
};

const ALL_STATUSES = Object.keys(STATUS_CONFIG) as Status[];

// ─── Root dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "enquiries">(
    "overview",
  );
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contacts");
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#0F1117] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-white/[0.06] flex flex-col py-6 px-4">
        <div className="flex items-center gap-2.5 px-2 mb-8">
          <Link
            href="/admin/login"
            className="flex items-center justify-center gap-3 "
          >
            <BrandLogo variant={"light"} />
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5">
          <NavItem
            icon={HomeIcon}
            label="Overview"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <NavItem
            icon={InboxIcon}
            label="Enquiries"
            active={activeTab === "enquiries"}
            onClick={() => setActiveTab("enquiries")}
          />
          {/* <NavItem
            icon={GridIcon}
            label="Analytics"
            active={false}
            onClick={() => {}}
          />
          <NavItem
            icon={UsersIcon}
            label="Contacts"
            active={false}
            onClick={() => {}}
          /> */}
        </nav>

        <div className="border-t border-white/[0.06] pt-4 mt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] transition-all text-sm"
          >
            <LogoutIcon className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {activeTab === "overview" ? (
          <OverviewTab contacts={contacts} loading={loading} />
        ) : (
          <EnquiriesTab
            contacts={contacts}
            loading={loading}
            onRefresh={fetchContacts}
          />
        )}
      </main>
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({
  contacts,
  loading,
}: {
  contacts: Contact[];
  loading: boolean;
}) {
  const total = contacts.length;
  const byStatus = ALL_STATUSES.reduce(
    (acc, s) => {
      acc[s] = contacts.filter((c) => c.status === s).length;
      return acc;
    },
    {} as Record<Status, number>,
  );
  const conversionRate =
    total > 0 ? ((byStatus.converted / total) * 100).toFixed(1) : "0.0";
  const activeLeads = byStatus.new + byStatus.contacted + byStatus.qualified;

  const industryCounts: Record<string, number> = {};
  contacts.forEach((c) => {
    if (c.industry)
      industryCounts[c.industry] = (industryCounts[c.industry] ?? 0) + 1;
  });
  const topIndustries = Object.entries(industryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const productCounts: Record<string, number> = {};
  contacts.forEach((c) => {
    if (c.product)
      productCounts[c.product] = (productCounts[c.product] ?? 0) + 1;
  });
  const topProducts = Object.entries(productCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      label: d.toLocaleString("default", { month: "short" }),
      year: d.getFullYear(),
      month: d.getMonth(),
    };
  });
  const monthlyData = months.map((m) => ({
    label: m.label,
    count: contacts.filter((c) => {
      const d = new Date(c.createdAt);
      return d.getFullYear() === m.year && d.getMonth() === m.month;
    }).length,
  }));
  const maxMonthly = Math.max(...monthlyData.map((m) => m.count), 1);

  const recent = contacts.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-white/[0.06] px-8 py-4 shrink-0">
        <h1 className="text-white font-semibold text-lg tracking-tight">
          Overview
        </h1>
        <p className="text-zinc-500 text-xs mt-0.5">
          Pipeline health and lead analytics
        </p>
      </header>

      <div className="px-8 py-6 space-y-6 flex-1">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* KPI row */}
            <div className="grid grid-cols-4 gap-4">
              <KpiCard
                label="Total Leads"
                value={total}
                sub="all time"
                icon={InboxIcon}
                iconColor="text-violet-400"
                iconBg="bg-violet-500/10"
              />
              <KpiCard
                label="Active Pipeline"
                value={activeLeads}
                sub="new + contacted + qual."
                icon={FlameIcon}
                iconColor="text-amber-400"
                iconBg="bg-amber-500/10"
              />
              <KpiCard
                label="Converted"
                value={byStatus.converted}
                sub="closed won"
                icon={CheckIcon}
                iconColor="text-emerald-400"
                iconBg="bg-emerald-500/10"
              />
              <KpiCard
                label="Conversion Rate"
                value={`${conversionRate}%`}
                sub="of all leads"
                icon={TrendIcon}
                iconColor="text-sky-400"
                iconBg="bg-sky-500/10"
              />
            </div>

            {/* Funnel + Monthly */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-[#16181f] border border-white/[0.06] rounded-xl p-5">
                <p className="text-sm font-medium text-white mb-1">
                  Lead Funnel
                </p>
                <p className="text-xs text-zinc-500 mb-5">
                  Status distribution across all leads
                </p>
                <div className="space-y-3">
                  {ALL_STATUSES.map((s) => {
                    const cfg = STATUS_CONFIG[s];
                    const count = byStatus[s];
                    const pct = total > 0 ? (count / total) * 100 : 0;
                    return (
                      <div key={s} className="flex items-center gap-3">
                        <span
                          className={`text-xs font-medium w-20 shrink-0 ${cfg.color}`}
                        >
                          {cfg.label}
                        </span>
                        <div className="flex-1 bg-white/[0.04] rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${cfg.dot} opacity-80`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-zinc-400 w-8 text-right tabular-nums">
                          {count}
                        </span>
                        <span className="text-xs text-zinc-600 w-10 text-right tabular-nums">
                          {pct.toFixed(0)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#16181f] border border-white/[0.06] rounded-xl p-5">
                <p className="text-sm font-medium text-white mb-1">
                  Monthly Inbound
                </p>
                <p className="text-xs text-zinc-500 mb-5">
                  Leads received per month
                </p>
                <div className="flex items-end justify-between gap-1.5 h-24">
                  {monthlyData.map((m) => (
                    <div
                      key={m.label}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-full rounded-t bg-violet-500/40 hover:bg-violet-500/70 transition-colors"
                        style={{
                          height: `${(m.count / maxMonthly) * 100}%`,
                          minHeight: m.count > 0 ? "4px" : "0",
                        }}
                        title={`${m.count} leads`}
                      />
                      <span className="text-[10px] text-zinc-600">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Industry + Product breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <BreakdownCard
                title="Top Industries"
                data={topIndustries}
                total={total}
                barClass="bg-sky-500/40 hover:bg-sky-500/60"
              />
              <BreakdownCard
                title="Top Products"
                data={topProducts}
                total={total}
                barClass="bg-emerald-500/40 hover:bg-emerald-500/60"
              />
            </div>

            {/* Recent leads */}
            <div className="bg-[#16181f] border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-white/[0.06]">
                <p className="text-sm font-medium text-white">Recent Leads</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Last 5 enquiries received
                </p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    {[
                      "Name",
                      "Company",
                      "Product",
                      "Industry",
                      "Status",
                      "Date",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recent.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-8 text-center text-zinc-600 text-sm"
                      >
                        No leads yet
                      </td>
                    </tr>
                  ) : (
                    recent.map((c, i) => (
                      <tr
                        key={c._id}
                        className={`hover:bg-white/[0.02] transition-colors ${i < recent.length - 1 ? "border-b border-white/[0.04]" : ""}`}
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2.5">
                            <Avatar name={c.name} />
                            <span className="text-white text-sm font-medium whitespace-nowrap">
                              {c.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-zinc-400 text-xs whitespace-nowrap">
                          {c.company}
                        </td>
                        <td className="px-5 py-3">
                          <ProductBadge product={c.product} />
                        </td>
                        <td className="px-5 py-3 text-zinc-400 text-xs whitespace-nowrap">
                          {c.industry}
                        </td>
                        <td className="px-5 py-3">
                          <StatusBadge status={c.status} />
                        </td>
                        <td className="px-5 py-3 text-zinc-500 text-xs whitespace-nowrap">
                          {formatDate(c.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Enquiries Tab ────────────────────────────────────────────────────────────

function EnquiriesTab({
  contacts,
  loading,
  onRefresh,
}: {
  contacts: Contact[];
  loading: boolean;
  onRefresh: () => void;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "">("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [filterProduct, setFilterProduct] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  const industries = [
    ...new Set(contacts.map((c) => c.industry).filter(Boolean)),
  ].sort();
  const products = [
    ...new Set(contacts.map((c) => c.product).filter(Boolean)),
  ].sort();
  const byStatus = ALL_STATUSES.reduce(
    (acc, s) => {
      acc[s] = contacts.filter((c) => c.status === s).length;
      return acc;
    },
    {} as Record<Status, number>,
  );

  const filtered = contacts.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      [c.name, c.company, c.email, c.phone].some((v) =>
        v?.toLowerCase().includes(q),
      );
    const matchStatus = !filterStatus || c.status === filterStatus;
    const matchIndustry = !filterIndustry || c.industry === filterIndustry;
    const matchProduct = !filterProduct || c.product === filterProduct;
    return matchSearch && matchStatus && matchIndustry && matchProduct;
  });

  const updateStatus = async (id: string, status: Status) => {
    setUpdatingId(id);
    await fetch("/api/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await onRefresh();
    setUpdatingId(null);
  };

  const saveNotes = async (id: string) => {
    setUpdatingId(id);
    await fetch("/api/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes: notesDraft[id] ?? "" }),
    });
    await onRefresh();
    setUpdatingId(null);
  };

  const deleteContact = async (id: string) => {
    setDeletingId(id);
    await fetch("/api/contacts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await onRefresh();
    setDeletingId(null);
  };

  // const exportCSV = () => {
  //   const rows = filtered.map((c) =>
  //     [
  //       c.name,
  //       c.company,
  //       c.email,
  //       c.phone,
  //       c.industry,
  //       c.product,
  //       c.status,
  //       c.message,
  //     ]
  //       .map((v) => `"${(v ?? "").replace(/"/g, '""')}"`)
  //       .join(","),
  //   );
  //   const csv =
  //     "Name,Company,Email,Phone,Industry,Product,Status,Message\n" +
  //     rows.join("\n");
  //   const blob = new Blob([csv], { type: "text/csv" });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "contacts.csv";
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // };

  const exportCSV = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Contacts");

  worksheet.columns = [
    { header: "Name", key: "name", width: 25 },
    { header: "Company", key: "company", width: 25 },
    { header: "Email", key: "email", width: 35 },
    { header: "Phone", key: "phone", width: 18 },
    { header: "Industry", key: "industry", width: 20 },
    { header: "Product", key: "product", width: 25 },
    { header: "Status", key: "status", width: 18 },
    { header: "Message", key: "message", width: 60 },
  ];

  // Header Style
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = {
      bold: true,
      color: { argb: "FFFFFFFF" },
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "2563EB" }, // Blue
    };

    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  filtered.forEach((contact) => {
    const row = worksheet.addRow({
      name: contact.name,
      company: contact.company,
      email: contact.email,
      phone: contact.phone,
      industry: contact.industry,
      product: contact.product,
      status: contact.status,
      message: contact.message,
    });

    row.eachCell((cell) => {
      cell.alignment = {
        vertical: "top",
        wrapText: true,
      };

      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    const statusCell = row.getCell(7);

    switch (contact?.status?.toLowerCase()) {
      case "new":
        statusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "DCFCE7" },
        };
        statusCell.font = {
          bold: true,
          color: { argb: "166534" },
        };
        break;

      case "contacted":
        statusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "DBEAFE" },
        };
        statusCell.font = {
          bold: true,
          color: { argb: "1D4ED8" },
        };
        break;

      case "qualified":
        statusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FEF3C7" },
        };
        statusCell.font = {
          bold: true,
          color: { argb: "92400E" },
        };
        break;

      case "closed":
        statusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "DCFCE7" },
        };
        statusCell.font = {
          bold: true,
          color: { argb: "15803D" },
        };
        break;

      default:
        statusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "F3F4F6" },
        };
    }

    statusCell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
  });

  worksheet.views = [
    {
      state: "frozen",
      ySplit: 1,
    },
  ];

  worksheet.autoFilter = {
    from: "A1",
    to: "H1",
  };

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer]),
    `Contacts-${new Date().toISOString().slice(0, 10)}.xlsx`
  );
};

  const clearFilters = () => {
    setSearch("");
    setFilterStatus("");
    setFilterIndustry("");
    setFilterProduct("");
  };
  const hasFilters = search || filterStatus || filterIndustry || filterProduct;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-white/[0.06] px-8 py-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-white font-semibold text-lg tracking-tight">
            Enquiries
          </h1>
          <p className="text-zinc-500 text-xs mt-0.5">
            Manage and follow up on inbound leads
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-zinc-300 text-sm font-medium rounded-lg px-4 py-2 transition-all"
        >
          <DownloadIcon className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </header>

      <div className="px-8 py-6 space-y-5 flex-1">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Clickable status cards */}
            <div className="grid grid-cols-5 gap-3">
              {ALL_STATUSES.map((s) => {
                const cfg = STATUS_CONFIG[s];
                const active = filterStatus === s;
                return (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(active ? "" : s)}
                    className={`relative text-left bg-[#16181f] border rounded-xl p-4 transition-all hover:border-white/[0.12] ${active ? "border-white/20 ring-1 ring-white/10" : "border-white/[0.06]"}`}
                  >
                    {active && (
                      <div
                        className={`absolute inset-0 rounded-xl ${cfg.bg} opacity-50 pointer-events-none`}
                      />
                    )}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                        {active && (
                          <span className="text-[10px] text-zinc-400 font-medium">
                            Filtered
                          </span>
                        )}
                      </div>
                      <p className="text-2xl font-semibold text-white tabular-nums">
                        {byStatus[s]}
                      </p>
                      <p className={`text-xs font-medium mt-0.5 ${cfg.color}`}>
                        {cfg.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Filter bar */}
            <div className="bg-[#16181f] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search name, company, email, phone…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#0F1117] border border-white/[0.08] text-white placeholder-zinc-600 rounded-lg pl-8 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all"
                  />
                </div>
                <FilterSelect
                  value={filterIndustry}
                  onChange={setFilterIndustry}
                  placeholder="All Industries"
                  options={industries}
                />
                <FilterSelect
                  value={filterProduct}
                  onChange={setFilterProduct}
                  placeholder="All Products"
                  options={products}
                />
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-zinc-500">
                    {filtered.length} of {contacts.length}
                  </span>
                  {hasFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
                    >
                      <XIcon className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-[#16181f] border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {[
                        "Lead",
                        "Contact",
                        "Industry",
                        "Product",
                        "Status",
                        "Received",
                        "",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left text-[11px] font-medium text-zinc-500 uppercase tracking-wider px-5 py-3"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-5 py-12 text-center">
                          <p className="text-zinc-500 text-sm">
                            No leads match your filters
                          </p>
                          <button
                            onClick={clearFilters}
                            className="text-xs text-violet-400 hover:text-violet-300 mt-1 transition-colors"
                          >
                            Clear filters
                          </button>
                        </td>
                      </tr>
                    ) : (
                      filtered.flatMap((c) => {
                        const isExpanded = expandedId === c._id;
                        return [
                          <tr
                            key={c._id}
                            className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer"
                            onClick={() => {
                              setExpandedId(isExpanded ? null : c._id);
                              if (!notesDraft[c._id])
                                setNotesDraft((d) => ({
                                  ...d,
                                  [c._id]: c.notes ?? "",
                                }));
                            }}
                          >
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-2.5">
                                <Avatar name={c.name} />
                                <div>
                                  <p className="text-white font-medium text-sm whitespace-nowrap">
                                    {c.name}
                                  </p>
                                  <p className="text-zinc-500 text-xs whitespace-nowrap">
                                    {c.company}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5">
                              <a
                                href={`mailto:${c.email}`}
                                className="text-violet-400 hover:text-violet-300 text-xs block whitespace-nowrap"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {c.email}
                              </a>
                              <span className="text-zinc-500 text-xs">
                                {c.phone}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              {c.industry && (
                                <span className="inline-flex items-center bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-md px-2 py-0.5 text-[11px] font-medium whitespace-nowrap">
                                  {c.industry}
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-3.5">
                              <ProductBadge product={c.product} />
                            </td>
                            <td
                              className="px-5 py-3.5"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <StatusDropdown
                                status={c.status}
                                loading={updatingId === c._id}
                                onChange={(s) => updateStatus(c._id, s)}
                              />
                            </td>
                            <td className="px-5 py-3.5 text-zinc-500 text-xs whitespace-nowrap">
                              {formatDate(c.createdAt)}
                            </td>
                            <td
                              className="px-5 py-3.5"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center gap-2">
                                <button
                                  className={`text-zinc-500 hover:text-zinc-300 transition-colors ${isExpanded ? "text-zinc-300" : ""}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedId(isExpanded ? null : c._id);
                                    if (!notesDraft[c._id])
                                      setNotesDraft((d) => ({
                                        ...d,
                                        [c._id]: c.notes ?? "",
                                      }));
                                  }}
                                >
                                  <ChevronIcon
                                    className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                  />
                                </button>
                                <button
                                  onClick={() => deleteContact(c._id)}
                                  disabled={deletingId === c._id}
                                  className="text-zinc-500 hover:text-red-400 disabled:opacity-40 transition-colors"
                                >
                                  {deletingId === c._id ? (
                                    <SpinnerIcon className="w-3.5 h-3.5" />
                                  ) : (
                                    <TrashIcon className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>,

                          isExpanded && (
                            <tr
                              key={`${c._id}-exp`}
                              className="border-b border-white/[0.04] bg-white/[0.015]"
                            >
                              <td colSpan={7} className="px-5 py-4">
                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                                      Message
                                    </p>
                                    <p className="text-zinc-300 text-sm leading-relaxed bg-[#0F1117] rounded-lg p-3 border border-white/[0.06]">
                                      {c.message || (
                                        <span className="text-zinc-600 italic">
                                          No message provided
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                                      Internal Notes
                                    </p>
                                    <textarea
                                      rows={3}
                                      placeholder="Add notes about this lead…"
                                      value={notesDraft[c._id] ?? c.notes ?? ""}
                                      onChange={(e) =>
                                        setNotesDraft((d) => ({
                                          ...d,
                                          [c._id]: e.target.value,
                                        }))
                                      }
                                      className="w-full bg-[#0F1117] border border-white/[0.08] text-white placeholder-zinc-600 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all"
                                    />
                                    <div className="flex justify-end mt-2">
                                      <button
                                        onClick={() => saveNotes(c._id)}
                                        disabled={updatingId === c._id}
                                        className="flex items-center gap-1.5 text-xs bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/30 text-violet-300 rounded-lg px-3 py-1.5 transition-all disabled:opacity-40"
                                      >
                                        {updatingId === c._id && (
                                          <SpinnerIcon className="w-3 h-3" />
                                        )}
                                        Save notes
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ),
                        ].filter(Boolean);
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  iconColor,
  iconBg,
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: React.FC<{ className?: string }>;
  iconColor: string;
  iconBg: string;
}) {
  return (
    <div className="bg-[#16181f] border border-white/[0.06] rounded-xl p-4 flex items-center gap-4">
      <div className={`${iconBg} ${iconColor} rounded-lg p-2.5 shrink-0`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-semibold text-white tabular-nums">
          {value}
        </p>
        <p className="text-xs text-zinc-500 mt-0.5 whitespace-nowrap">
          {label}
        </p>
        <p className="text-[10px] text-zinc-700 whitespace-nowrap">{sub}</p>
      </div>
    </div>
  );
}

function BreakdownCard({
  title,
  data,
  total,
  barClass,
}: {
  title: string;
  data: [string, number][];
  total: number;
  barClass: string;
}) {
  const max = Math.max(...data.map((d) => d[1]), 1);
  return (
    <div className="bg-[#16181f] border border-white/[0.06] rounded-xl p-5">
      <p className="text-sm font-medium text-white mb-1">{title}</p>
      <p className="text-xs text-zinc-500 mb-4">By enquiry count</p>
      {data.length === 0 ? (
        <p className="text-zinc-600 text-sm">No data yet</p>
      ) : (
        <div className="space-y-3">
          {data.map(([name, count]) => (
            <div key={name} className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 w-28 truncate shrink-0">
                {name}
              </span>
              <div className="flex-1 bg-white/[0.04] rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${barClass} transition-all`}
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
              <span className="text-xs text-zinc-400 tabular-nums w-6 text-right">
                {count}
              </span>
              <span className="text-xs text-zinc-600 tabular-nums w-8 text-right">
                {total > 0 ? ((count / total) * 100).toFixed(0) : 0}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.new;
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${cfg.bg} ${cfg.color} border ${cfg.border} rounded-md px-2 py-0.5 text-[11px] font-medium whitespace-nowrap`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function StatusDropdown({
  status,
  loading,
  onChange,
}: {
  status: Status;
  loading: boolean;
  onChange: (s: Status) => void;
}) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.new;
  if (loading)
    return (
      <div
        className={`inline-flex items-center gap-1.5 ${cfg.bg} ${cfg.color} border ${cfg.border} rounded-md px-2 py-0.5 text-[11px] font-medium`}
      >
        <SpinnerIcon className="w-3 h-3" />
        {cfg.label}
      </div>
    );
  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value as Status)}
      className={`appearance-none cursor-pointer ${cfg.bg} ${cfg.color} border ${cfg.border} rounded-md px-2 py-0.5 pr-5 text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-white/10`}
    >
      {ALL_STATUSES.map((s) => (
        <option key={s} value={s} className="bg-[#16181f] text-white">
          {STATUS_CONFIG[s].label}
        </option>
      ))}
    </select>
  );
}

function ProductBadge({ product }: { product: string }) {
  if (!product) return null;
  return (
    <span className="inline-flex items-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md px-2 py-0.5 text-[11px] font-medium whitespace-nowrap">
      {product}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-600/30 border border-violet-500/20 flex items-center justify-center text-[11px] font-semibold text-violet-300 shrink-0">
      {(name ?? "?")[0]?.toUpperCase()}
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#0F1117] border border-white/[0.08] text-zinc-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all appearance-none cursor-pointer min-w-[140px]"
    >
      <option value="" className="bg-[#16181f]">
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#16181f]">
          {o}
        </option>
      ))}
    </select>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.FC<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${active ? "bg-white/[0.07] text-white font-medium" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"}`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <SpinnerIcon className="w-5 h-5 text-zinc-600" />
    </div>
  );
}

function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const BoltIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);
const HomeIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.75}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);
const InboxIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.75}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
    />
  </svg>
);
const GridIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.75}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);
const UsersIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.75}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
const DownloadIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);
const TrashIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);
const LogoutIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.75}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);
const FlameIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.75}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
    />
  </svg>
);
const CheckIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const TrendIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);
const SearchIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
    />
  </svg>
);
const ChevronIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const XIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const SpinnerIcon = ({ className = "" }) => (
  <svg className={`${className} animate-spin`} fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    />
  </svg>
);
