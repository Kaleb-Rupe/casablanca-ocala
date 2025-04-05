export default function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="relative aspect-square rounded-xl overflow-hidden bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  );
}
