"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Contact {
  _id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  product: string;
  message: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contacts");
      const data = await res.json();
      setContacts(data);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: string) => {
    setDeletingId(id);
    await fetch("/api/contacts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchContacts();
    setDeletingId(null);
  };

  const exportCSV = () => {
    const rows = contacts.map((c) =>
      [c.name, c.company, c.email, c.phone, c.industry, c.product, c.message]
        .map((v) => `"${(v ?? "").replace(/"/g, '""')}"`)
        .join(","),
    );
    const csv =
      "Name,Company,Email,Phone,Industry,Product,Message\n" + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/admin");
  };

  const filtered = contacts.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.company?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const stats = [
    {
      label: "Total Enquiries",
      value: contacts.length,
      icon: InboxIcon,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      label: "Industries",
      value: new Set(contacts.map((c) => c.industry).filter(Boolean)).size,
      icon: GridIcon,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
    },
    {
      label: "Products",
      value: new Set(contacts.map((c) => c.product).filter(Boolean)).size,
      icon: BoxIcon,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F1117] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-white/[0.06] flex flex-col py-6 px-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-2 mb-8">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-white"
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
          </div>
          <span className="text-white font-semibold text-base tracking-tight">
            Nexus
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5">
          <NavItem icon={HomeIcon} label="Overview" active />
          <NavItem icon={InboxIcon} label="Enquiries" />
          <NavItem icon={GridIcon} label="Analytics" />
          <NavItem icon={UsersIcon} label="Contacts" />
        </nav>

        {/* User */}
        <div className="border-t border-white/[0.06] pt-4 mt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] transition-all text-sm"
          >
            <LogoutIcon />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Top bar */}
        <header className="border-b border-white/[0.06] px-8 py-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-white font-semibold text-lg tracking-tight">
              Contact Enquiries
            </h1>
            <p className="text-zinc-500 text-xs mt-0.5">
              Review and manage inbound leads
            </p>
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-zinc-300 text-sm font-medium rounded-lg px-4 py-2 transition-all"
          >
            <DownloadIcon />
            Export CSV
          </button>
        </header>

        <div className="flex-1 px-8 py-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#16181f] border border-white/[0.06] rounded-xl p-4 flex items-center gap-4"
              >
                <div className={`${s.bg} ${s.color} rounded-lg p-2.5`}>
                  <s.icon />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white tabular-nums">
                    {s.value}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Table card */}
          <div className="bg-[#16181f] border border-white/[0.06] rounded-xl overflow-hidden">
            {/* Table toolbar */}
            <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center gap-3">
              <div className="relative flex-1 max-w-xs">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, company, email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#0F1117] border border-white/[0.08] text-white placeholder-zinc-600 rounded-lg pl-8 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all"
                />
              </div>
              <span className="text-xs text-zinc-500 ml-auto">
                {filtered.length} {filtered.length === 1 ? "result" : "results"}
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {[
                      "Name",
                      "Company",
                      "Email",
                      "Phone",
                      "Industry",
                      "Product",
                      "Message",
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
                  {loading ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-5 py-12 text-center text-zinc-600 text-sm"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <svg
                            className="w-5 h-5 animate-spin text-zinc-600"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
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
                          Loading enquiries…
                        </div>
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-12 text-center">
                        <p className="text-zinc-500 text-sm">
                          No enquiries found
                        </p>
                        <p className="text-zinc-700 text-xs mt-1">
                          Try adjusting your search
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((c, i) => (
                      <tr
                        key={c._id}
                        className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${
                          i === filtered.length - 1 ? "border-b-0" : ""
                        }`}
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-600/30 border border-violet-500/20 flex items-center justify-center text-[11px] font-semibold text-violet-300 shrink-0">
                              {(c.name ?? "?")[0]?.toUpperCase()}
                            </div>
                            <span className="text-white font-medium whitespace-nowrap">
                              {c.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-zinc-400 whitespace-nowrap">
                          {c.company}
                        </td>
                        <td className="px-5 py-3.5">
                          <a
                            href={`mailto:${c.email}`}
                            className="text-violet-400 hover:text-violet-300 transition-colors whitespace-nowrap"
                          >
                            {c.email}
                          </a>
                        </td>
                        <td className="px-5 py-3.5 text-zinc-400 whitespace-nowrap">
                          {c.phone}
                        </td>
                        <td className="px-5 py-3.5">
                          {c.industry && (
                            <span className="inline-flex items-center bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-md px-2 py-0.5 text-[11px] font-medium whitespace-nowrap">
                              {c.industry}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3.5">
                          {c.product && (
                            <span className="inline-flex items-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md px-2 py-0.5 text-[11px] font-medium whitespace-nowrap">
                              {c.product}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-zinc-500 max-w-[200px]">
                          <p className="truncate text-xs">{c.message}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <button
                            onClick={() => deleteContact(c._id)}
                            disabled={deletingId === c._id}
                            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          >
                            {deletingId === c._id ? (
                              <svg
                                className="w-3.5 h-3.5 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
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
                            ) : (
                              <TrashIcon />
                            )}
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Nav item ──────────────────────────────────────────────────────────────────
function NavItem({
  icon: Icon,
  label,
  active,
}: {
  icon: React.FC;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${
        active
          ? "bg-white/[0.07] text-white font-medium"
          : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
      }`}
    >
      <Icon />
      {label}
    </button>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg
    className="w-4 h-4"
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
const InboxIcon = () => (
  <svg
    className="w-4 h-4"
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
const GridIcon = () => (
  <svg
    className="w-4 h-4"
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
const BoxIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.75}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
    />
  </svg>
);
const UsersIcon = () => (
  <svg
    className="w-4 h-4"
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
const DownloadIcon = () => (
  <svg
    className="w-3.5 h-3.5"
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
const TrashIcon = () => (
  <svg
    className="w-3.5 h-3.5"
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
const LogoutIcon = () => (
  <svg
    className="w-4 h-4"
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
