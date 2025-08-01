"use client";
import ArticleCard from "@/components/common/article-card";
import Pagination from "@/components/common/pagination";
import InputSearch from "@/components/common/input-search";
import InputSelect from "@/components/common/input-select";
import { UseArticlesFreature } from "@/features/User/Articles/hooks";
import { cn } from "@/lib/utils";

type Options = {
  name: string;
};

export default function Home() {
  const {
    page,
    limit,
    category,
    hasNextPage,
    isFetchingNextPage,
    categoryOptions,
    data,
    isLoading,
    searchQuery,
    isMobile,
    setPage,
    setCategory,
    fetchNextPage,
    setSearchQuery,
  } = UseArticlesFreature({});

  return (
    <div className="relative min-h-screen flex flex-col">
      <header
        className={cn(
          "relative flex items-center justify-center bg-blue-ocean h-[500px] text-white p-6 md:p-10",
          !isMobile && "-mt-[68px]"
        )}
      >
        <div className="absolute inset-0 bg-blue-ocean/85 clip-diagonal z-10" />
        <div
          className="absolute inset-0 bg-cover z-0 opacity-90"
          style={{ backgroundImage: "url('/hero-bg-image.jpg')" }}
        ></div>
        <div className="relative z-20 text-center flex flex-col items-center space-y-10 md:w-1/2 max-w-[730px]">
          <div className="flex flex-col items-center gap-y-3">
            <span className="font-bold text-sm lg:text-[16px]">
              Blog genzet
            </span>
            <h2 className="text-5xl font-medium">
              The Journal : Design Resources, Interviews, and Industry News
            </h2>
            <p className="text-xl lg:text-2xl font-normal">
              Your Daily Dose of Design Insights!
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-between bg-blue-500 rounded-[12px] max-w-[608px] w-full lg:w-5/6 p-2.5 gap-2">
            <InputSelect<Options>
              value={category}
              className="w-full lg:flex-2/5 bg-white/90 text-black"
              placeholder="Select Category"
              resetPlaceholder="All Categories"
              onValueChange={(value) => {
                setCategory(value);
              }}
              data={categoryOptions}
              options={{
                keyLabel: "name",
                keyValue: "name",
              }}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
            <InputSearch
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
              placeholder="Search articles..."
            />
          </div>
        </div>
      </header>

      <main className="flex-grow bg-gray-50 py-10 lg:pb-24">
        <div className="container mx-auto px-4 space-y-6">
          <span className="hidden lg:block text-slate-600 font-medium text-md">
            Showing : {limit || 0} of {data?.total ?? 0} articles
          </span>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <span className="text-gray-500">Loading articles...</span>
            </div>
          ) : data?.data && data.data.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-[60px]">
                {data?.data.map((article) => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(data?.total / limit) || 0}
                  limit={limit || 9}
                  onPageChange={(newPage) => {
                    if (newPage !== page) {
                      // window.scrollTo({ top: 0, behavior: "smooth" });
                      setPage(newPage);
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <span className="text-gray-500">No articles found.</span>
              <button>
                <span
                  className="text-blue-500 underline ml-2 cursor-pointer"
                  onClick={() => {
                    setPage(1);
                    setCategory("");
                    setSearchQuery("");
                  }}
                >
                  Reset Filters
                </span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
