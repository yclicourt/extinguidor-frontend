import CardWrapper from "@/app/components/CardWrapper";
import ChartWrapper from "@/app/components/ChartWrapper";
import LatestPartsWrapper from "@/app/components/LatestPartsWrapper";
import { RecentRoutesChartSkeleton } from "@/app/components/Skeleton";
import { bebas } from "@/app/ui/font";
import { Suspense } from "react";

const Dashboard = () => {
  return (
    <main>
      <h1 className={`${bebas.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="w-full md:col-span-4">
          <h2 className={`${bebas.className} mb-4 text-xl md:text-2xl`}>
            Recent Routes
          </h2>
          <Suspense fallback={<RecentRoutesChartSkeleton />}>
            <ChartWrapper />
          </Suspense>
        </div>
        <div className="w-full md:col-span-4">
          <h2 className={`${bebas.className} mb-4 text-xl md:text-2xl`}>
            Latest Parts Works
          </h2>
          <LatestPartsWrapper />
        </div>
      </div>
    </main>
  );
};
export default Dashboard;