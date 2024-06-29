import { Skeleton } from '@/components/ui/skeleton';

export function ArticleSkeleton() {
  return (
    <article className="group relative flex cursor-pointer flex-col items-start">
      <div className="z-10 flex items-center gap-x-4 pb-2">
        <Skeleton className="size-8 rounded-full" />
        <span className="flex items-center" aria-hidden="true">
          <Skeleton className="bg-muted-foreground/40 h-8 w-0.5 rounded-full" />
        </span>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="ml-2 h-4 w-16" />
      </div>
      <h2 className="text-base font-semibold tracking-tight">
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <Skeleton className="relative z-10 h-6 w-3/4" />
        <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
      </h2>
      <Skeleton className="relative z-10 mt-2 h-4 w-full" />
      <Skeleton className="relative z-10 mt-1 h-4 w-full" />
      <Skeleton className="relative z-10 mt-1 h-4 w-5/6" />
      <div className="z-10 mt-4 flex flex-wrap gap-2">
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-6 w-12" />
      </div>
      <div
        aria-hidden="true"
        className="group relative z-10 mt-4 flex items-center text-sm font-medium text-purple-500 transition-all duration-300 group-hover:text-purple-700 dark:text-teal-500 dark:group-hover:text-teal-400"
      >
        <Skeleton className="h-4 w-20" />
        <Skeleton className="ml-1 size-4" />
      </div>
    </article>
  );
}
