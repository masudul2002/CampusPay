"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/features/navbar/navbar";
import { Footer } from "@/features/footer/footer";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { formatBDT } from "@/lib/utils";
import { TrendingUp, TrendingDown, Clock, Search, Filter } from "lucide-react";

interface TransactionData {
  id: string;
  referenceId: string;
  type: string;
  amount: number;
  chargeAmount: number;
  totalAmount: number;
  provider: string;
  recipient?: string;
  status: string;
  createdAt: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = transactions.filter((t) => {
    if (statusFilter === "ALL") return true;
    return t.status === statusFilter;
  });

  const columns = [
    {
      header: "Reference ID",
      accessorKey: "referenceId" as const,
      cell: (row: TransactionData) => (
        <span className="font-mono text-purple-300 font-bold">
          {row.referenceId || `TXN-${row.id.slice(0, 8)}`}
        </span>
      ),
    },
    {
      header: "Service & Type",
      cell: (row: TransactionData) => (
        <div className="flex items-center gap-2 font-bold text-white">
          {row.type === "CASH_IN" ? (
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-rose-400" />
          )}
          {row.type}
        </div>
      ),
    },
    {
      header: "Payment Method",
      accessorKey: "provider" as const,
      cell: (row: TransactionData) => (
        <span className="font-semibold text-zinc-300">{row.provider}</span>
      ),
    },
    {
      header: "Amount",
      cell: (row: TransactionData) => (
        <span className="font-mono font-bold text-white">
          {row.type === "CASH_IN" ? "+" : "-"} {formatBDT(row.amount)}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row: TransactionData) => (
        <Badge
          variant={
            row.status === "COMPLETED"
              ? "emerald"
              : row.status === "PENDING"
              ? "amber"
              : "glass"
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Date",
      cell: (row: TransactionData) => (
        <span className="text-zinc-400 font-mono">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white relative">
      <Navbar />

      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Badge variant="violet" className="mb-2">
              Financial Audit Logs
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Transaction History
            </h1>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 bg-zinc-900/80 p-1.5 rounded-2xl border border-white/10">
            {["ALL", "COMPLETED", "PENDING", "FAILED"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === status
                    ? "bg-brand-primary text-white shadow-glow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          data={filtered}
          columns={columns}
          searchPlaceholder="Search reference ID, provider, or type..."
        />

      </div>

      <Footer />
    </main>
  );
}
