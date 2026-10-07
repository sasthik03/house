"use client";

import { Avatar } from "@/app/components/ui/avatar";
import { formatDate } from "@/app/utils";
import { FilterSelect } from "@/components/filter-select";
import { SummaryCard } from "@/components/summary-card";
import {
  ArrowDown,
  ChevronDown,
  Edit,
  Filter,
  Phone,
  Plus,
  Search,
  UserCheck,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";

import { TTenant, TTenantFormData, TTenantStatus } from "@/app/type/tenant";
import { ActionButton } from "@/components/action-button";
import AddTenantModal from "./components/add-tenent-modal";
import { tenants } from "./components/data";

export default function TenantsPage() {
  const [tenantList, setTenantList] = useState<TTenant[]>(tenants);

  const [addTenantOpen, setAddTenantOpen] = useState(false);
  const [editTenantOpen, setEditTenantOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<TTenant | null>(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<"ALL" | TTenantStatus>(
    "ALL",
  );

  const [rentFilter, setRentFilter] = useState<"ALL" | "PAID" | "PENDING">(
    "ALL",
  );

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredTenants = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return tenantList.filter((tenant) => {
      const matchesSearch =
        !keyword ||
        tenant.name.toLowerCase().includes(keyword) ||
        tenant.phone.includes(keyword) ||
        tenant.roomNumber.includes(keyword);

      const matchesStatus =
        statusFilter === "ALL" || tenant.status === statusFilter;

      const matchesRent =
        rentFilter === "ALL" || tenant.rentStatus === rentFilter;

      return matchesSearch && matchesStatus && matchesRent;
    });
  }, [tenantList, search, statusFilter, rentFilter]);

  const activeTenants = tenantList.filter(
    (tenant) => tenant.status === "ACTIVE",
  );

  const pendingRent = tenantList
    .filter(
      (tenant) => tenant.status === "ACTIVE" && tenant.rentStatus === "PENDING",
    )
    .reduce((sum, tenant) => sum + tenant.rent, 0);

  // -----------------------------
  // Add Tenant
  // -----------------------------
  const handleAddTenant = (data: TTenantFormData) => {
    const newTenant: TTenant = {
      id: Date.now(),
      name: data.name,
      phone: data.phone,
      roomNumber: data.roomNumber,
      floor: data.floor,
      rent: Number(data.rent),
      rentStatus: "PENDING",
      moveInDate: data.moveInDate,
      status: data.status,
    };

    setTenantList((prev) => [newTenant, ...prev]);

    setAddTenantOpen(false);
  };

  // -----------------------------
  // Edit Tenant
  // -----------------------------
  const handleEditTenant = (tenant: TTenant) => {
    setSelectedTenant(tenant);
    setEditTenantOpen(true);
  };

  const handleUpdateTenant = (data: TTenantFormData) => {
    if (!selectedTenant) return;

    setTenantList((prev) =>
      prev.map((tenant) =>
        tenant.id === selectedTenant.id
          ? {
              ...tenant,
              name: data.name,
              phone: data.phone,
              roomNumber: data.roomNumber,
              floor: data.floor,
              rent: Number(data.rent),
              moveInDate: data.moveInDate,
              status: data.status,
            }
          : tenant,
      ),
    );

    setEditTenantOpen(false);
    setSelectedTenant(null);
  };

  // -----------------------------
  // Close Modal
  // -----------------------------
  const closeTenantModal = () => {
    setAddTenantOpen(false);
    setEditTenantOpen(false);
    setSelectedTenant(null);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Admin</span>
            <span>/</span>
            <span>Tenants</span>
          </div>

          <h1 className="mt-1 text-xl font-bold text-[#112233] sm:text-2xl">
            ভাড়াটিয়া
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার ভবনের বর্তমান ও পূর্ববর্তী ভাড়াটিয়াদের পরিচালনা করুন।
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedTenant(null);
            setAddTenantOpen(true);
          }}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#00875A] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[#007A50] sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          নতুন ভাড়াটিয়া
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard
          label="মোট ভাড়াটিয়া"
          value={tenantList.length}
          icon={Users}
          subtitle="রেকর্ডে আছে"
          variant="info"
        />

        <SummaryCard
          label="বর্তমান ভাড়াটিয়া"
          value={activeTenants.length}
          icon={UserCheck}
          subtitle="সক্রিয়"
          variant="success"
        />

        <SummaryCard
          label="পূর্ববর্তী"
          value={tenantList.length - activeTenants.length}
          icon={UserRound}
          subtitle="আগের ভাড়াটিয়া"
          variant="info"
        />

        <SummaryCard
          label="বকেয়া ভাড়া"
          value={`৳${pendingRent.toLocaleString("bn-BD")}`}
          icon={WalletCards}
          subtitle="এই মাস"
          variant="warning"
        />
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* Search + Filter */}
        <div className="border-b border-gray-100 p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="নাম, ফোন বা রুম নম্বর দিয়ে খুঁজুন..."
                className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#00875A] focus:bg-white focus:ring-2 focus:ring-[#00875A]/10"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden items-center gap-2 md:flex">
              <FilterSelect
                value={statusFilter}
                onChange={(value) =>
                  setStatusFilter(value as "ALL" | TTenantStatus)
                }
                options={[
                  { value: "ALL", label: "সব স্ট্যাটাস" },
                  { value: "ACTIVE", label: "বর্তমান" },
                  { value: "PREVIOUS", label: "পূর্ববর্তী" },
                ]}
              />

              <FilterSelect
                value={rentFilter}
                onChange={(value) =>
                  setRentFilter(value as "ALL" | "PAID" | "PENDING")
                }
                options={[
                  { value: "ALL", label: "সব পেমেন্ট" },
                  { value: "PAID", label: "পরিশোধিত" },
                  { value: "PENDING", label: "বকেয়া" },
                ]}
              />
            </div>

            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen((prev) => !prev)}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 md:hidden"
            >
              <Filter className="h-4 w-4" />
              ফিল্টার
              <ChevronDown
                className={`h-4 w-4 transition ${
                  mobileFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Mobile Filters */}
          {mobileFilterOpen && (
            <div className="mt-3 grid grid-cols-2 gap-2 md:hidden">
              <FilterSelect
                value={statusFilter}
                onChange={(value) =>
                  setStatusFilter(value as "ALL" | TTenantStatus)
                }
                options={[
                  { value: "ALL", label: "সব স্ট্যাটাস" },
                  { value: "ACTIVE", label: "বর্তমান" },
                  { value: "PREVIOUS", label: "পূর্ববর্তী" },
                ]}
              />

              <FilterSelect
                value={rentFilter}
                onChange={(value) =>
                  setRentFilter(value as "ALL" | "PAID" | "PENDING")
                }
                options={[
                  { value: "ALL", label: "সব পেমেন্ট" },
                  { value: "PAID", label: "পরিশোধিত" },
                  { value: "PENDING", label: "বকেয়া" },
                ]}
              />
            </div>
          )}
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <p className="text-xs text-gray-500">
            মোট{" "}
            <span className="font-semibold text-[#112233]">
              {filteredTenants.length}
            </span>{" "}
            জন ভাড়াটিয়া
          </p>

          <button
            type="button"
            className="hidden items-center gap-1 text-xs font-medium text-gray-500 hover:text-[#00875A] sm:flex"
          >
            সর্বশেষ আপডেট
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  ভাড়াটিয়া
                </th>

                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  রুম
                </th>

                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  মাসিক ভাড়া
                </th>

                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  পেমেন্ট
                </th>

                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  যোগদানের তারিখ
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTenants.map((tenant) => (
                <tr
                  key={tenant.id}
                  className="border-b border-gray-50 transition hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={tenant.name} />

                      <div>
                        <p className="text-sm font-medium text-[#112233]">
                          {tenant.name}
                        </p>

                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
                          <Phone className="h-3 w-3" />
                          {tenant.phone}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-sm font-medium text-[#112233]">
                      {tenant.roomNumber}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {tenant.floor}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-[#112233]">
                      ৳{tenant.rent.toLocaleString("bn-BD")}
                    </span>

                    <span className="ml-1 text-xs text-gray-400">/মাস</span>
                  </td>

                  <td className="px-4 py-4">
                    <RentStatus status={tenant.rentStatus} />
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(tenant.moveInDate)}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end">
                      <ActionButton
                        icon={Edit}
                        label="Edit"
                        onClick={() => handleEditTenant(tenant)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List */}
        <div className="divide-y divide-gray-100 md:hidden">
          {filteredTenants.map((tenant) => (
            <div key={tenant.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar name={tenant.name} />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#112233]">
                      {tenant.name}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                      <Phone className="h-3 w-3" />
                      {tenant.phone}
                    </div>
                  </div>
                </div>

                <RentStatus status={tenant.rentStatus} />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <MobileInfo
                  label="রুম"
                  value={`${tenant.roomNumber} • ${tenant.floor}`}
                />

                <MobileInfo
                  label="ভাড়া"
                  value={`৳${tenant.rent.toLocaleString("bn-BD")}`}
                />

                <MobileInfo
                  label="যোগদান"
                  value={formatDate(tenant.moveInDate)}
                />
              </div>

              {/* Mobile Edit */}
              <div className="mt-3">
                <ActionButton
                  icon={Edit}
                  label="Edit"
                  onClick={() => handleEditTenant(tenant)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTenants.length === 0 && (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
              <Users className="h-6 w-6" />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-[#112233]">
              কোনো ভাড়াটিয়া পাওয়া যায়নি
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              আপনার search বা filter পরিবর্তন করে আবার চেষ্টা করুন।
            </p>
          </div>
        )}

        {/* Same Modal — Add + Edit */}
        <AddTenantModal
          key={editTenantOpen ? `edit-${selectedTenant?.id}` : "add-tenant"}
          open={addTenantOpen || editTenantOpen}
          mode={editTenantOpen ? "edit" : "add"}
          tenant={selectedTenant}
          onClose={closeTenantModal}
          onSubmit={editTenantOpen ? handleUpdateTenant : handleAddTenant}
        />
      </div>
    </div>
  );
}

/* -----------------------------
   Rent Status
----------------------------- */

function RentStatus({ status }: { status: "PAID" | "PENDING" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
        status === "PAID"
          ? "bg-[#EAF4EF] text-[#00875A]"
          : "bg-amber-50 text-amber-600"
      }`}
    >
      {status === "PAID" ? "পরিশোধিত" : "বকেয়া"}
    </span>
  );
}

/* -----------------------------
   Mobile Info
----------------------------- */

function MobileInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-50 px-2.5 py-2">
      <p className="text-[10px] text-gray-400">{label}</p>
      <p className="mt-0.5 truncate text-xs font-medium text-[#112233]">
        {value}
      </p>
    </div>
  );
}
