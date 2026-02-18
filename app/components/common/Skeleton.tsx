'use client';

import { useMemo } from 'react';

// Animación de brillo sutil para modo oscuro
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-slate-700/20 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden p-6 rounded-2xl bg-slate-800 border border-slate-700 shadow-lg`}
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-slate-700"></div>
      <div className="mb-2 h-4 w-24 mx-auto rounded bg-slate-700" />
      <div className="h-8 w-16 mx-auto rounded bg-slate-700" />
      <div className="mt-4 h-px bg-slate-700" />
    </div>
  );
}

export function RecentRoutesChartSkeleton() {
  const heights = useMemo(() => 
    [...Array(12)].map((_, i) => ((i + 1) * 7) % 100 + 20),
    []
  );

  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4 rounded-xl bg-slate-800 border border-slate-700 p-6 h-87.5`}>
      <div className="mb-4 h-6 w-48 rounded bg-slate-700" />
      <div className="flex items-end gap-2 h-64 mt-4">
        {heights.map((height, i) => (
          <div key={i} className="flex-1 bg-slate-700/50 rounded-t" style={{ height: `${height}%` }} />
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="flex flex-col h-full">
      {/* Tabs Simulation */}
      <div className="flex gap-4 mb-6 border-b border-slate-700 pb-2">
        <div className="h-4 bg-blue-600/30 w-24 rounded" />
        <div className="h-4 bg-slate-700 w-24 rounded" />
      </div>
      
      {/* Rows Simulation (Exactamente 5 para el Dashboard) */}
      <div className="space-y-6 flex-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="h-4 bg-slate-700 w-8 rounded" />
            <div className="h-4 bg-slate-700 flex-1 rounded" />
            <div className="h-4 bg-slate-700 w-20 rounded" />
            <div className="h-6 bg-slate-700 w-24 rounded-full" />
          </div>
        ))}
      </div>

      {/* Pagination Simulation - Acoplada al fondo */}
      <div className="mt-auto pt-4 flex justify-between items-center border-t border-slate-700">
        <div className="h-3 bg-slate-700 w-20 rounded" />
        <div className="h-8 bg-slate-700 w-28 rounded-lg" />
      </div>
    </div>
  );
}

export function LatestPartsSkeleton() {
  return (
    <div className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4 rounded-xl bg-slate-800 border border-slate-700 p-6 h-87.5`}>
      <TableSkeleton />
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RecentRoutesChartSkeleton />
        <LatestPartsSkeleton />
      </div>
    </div>
  );
}