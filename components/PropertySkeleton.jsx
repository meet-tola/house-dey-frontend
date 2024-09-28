import { Skeleton } from "@/components/ui/skeleton"

export function PropertySkeleton() {
  return (
    <div className="min-w-[300px] lg:min-w-[250px] w-[300px] rounded-lg shadow-sm overflow-hidden flex flex-col justify-between border-2 border-gray-100 bg-white relative">
      <Skeleton className="w-full h-48" />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex gap-2 mb-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
    </div>
  )
}