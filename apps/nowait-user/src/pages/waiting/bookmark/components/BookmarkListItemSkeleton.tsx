
const BookmarkListItemSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <li key={i} className="mb-6">
            <div className="w-full h-[195px] rounded-[14px] bg-black-20" />
            <div className="flex items-start justify-between py-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-black-20" />
                <div className="flex flex-col justify-between gap-2">
                  <h1 className="w-[194px] h-[18px] rounded-sm bg-black-20"></h1>
                  <h2 className="w-[146px] h-4 rounded-sm bg-black-20"></h2>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default BookmarkListItemSkeleton;
