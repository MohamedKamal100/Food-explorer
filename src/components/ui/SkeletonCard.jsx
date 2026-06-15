import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="glass-panel rounded-2xl p-4 overflow-hidden border border-white/5 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[4/3] rounded-xl bg-white/5 mb-4" />
      
      {/* Category & Area Skeletons */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-4 w-16 bg-white/5 rounded-full" />
        <div className="h-4 w-12 bg-white/5 rounded-full" />
      </div>

      {/* Name Skeleton */}
      <div className="h-6 w-3/4 bg-white/5 rounded-md mb-6" />

      {/* Button Skeletons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <div className="h-10 w-24 bg-white/5 rounded-xl" />
        <div className="h-10 w-10 bg-white/5 rounded-full" />
      </div>
    </div>
  );
}
