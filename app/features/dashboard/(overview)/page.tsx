import CardWrapper from "@/app/components/dashboard/CardWrapper";
import ChartRouteWrapper from "@/app/components/dashboard/ChartRouteWrapper";
import LatestPartsWorks from "@/app/components/dashboard/LatestPartsWorks";
import {
  LatestPartsSkeleton,
  RecentRoutesChartSkeleton,
} from "@/app/components/common/Skeleton";
import { bebas } from "@/app/ui/font";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{
    tab?: string;
    month?: string;
    year?: string;
    currentPage?: string;
  }>;
}

const Dashboard = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  return (
    <main>
      <h1 className={`${bebas.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="w-full md:col-span-4 h-full">
          <h2 className={`${bebas.className} mb-4 text-xl md:text-2xl`}>
            Recent Routes
          </h2>
          <Suspense fallback={<RecentRoutesChartSkeleton />}>
            <ChartRouteWrapper />
          </Suspense>
        </div>
        <div className="w-full md:col-span-4 h-full">
          <h2 className={`${bebas.className} mb-4 text-xl md:text-2xl`}>
            Latest Parts Works
          </h2>
          <Suspense fallback={<LatestPartsSkeleton />}>
            <LatestPartsWorks searchParams={params} />
          </Suspense>
        </div>
      </div>
    </main>
  );
};
export default Dashboard;
