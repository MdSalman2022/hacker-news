export default function SkeletonCard() {
  return (
    <div className="py-3 border-b border-gray-100 last:border-0 animate-pulse">
      <div className="flex items-start gap-2">
        <div className="w-4 h-3 bg-gray-200 rounded flex-shrink-0 mt-1" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="flex gap-3 mt-1">
            <div className="h-3 bg-gray-200 rounded w-10" />
            <div className="h-3 bg-gray-200 rounded w-20" />
            <div className="h-3 bg-gray-200 rounded w-14" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
