import CommonSwiper from "../../../../components/CommonSwiper";
import DepartmentImage from "../../../../components/DepartmentImage";
import type { BannerImages } from "../../../../types/wait/store";

interface PropsType {
  bannerImages?: BannerImages[];
  departmentName?: string;
  name?: string;
  waitingCount?: number;
  profileImage?: string;
}

const StoreHeaderSection = ({
  bannerImages,
  departmentName,
  name,
  waitingCount,
  profileImage,
}: PropsType) => {
  return (
    <>
      <CommonSwiper slideImages={bannerImages || []} />

      <section className="border-b border-[#f4f4f4]">
        <div className="flex justify-between items-center py-[21px]">
          <div className="flex flex-col gap-[3px]">
            <p className="text-14-regular text-black-70">{departmentName}</p>
            <h1 className="text-headline-22-bold">{name}</h1>
          </div>
          <DepartmentImage width="52px" height="52px" src={profileImage} />
        </div>

        {waitingCount !== 0 && (
          <div className="pb-5">
            <p className="inline-block text-[12px] font-bold rounded-md px-2 py-[7px] bg-[#ffeedf] text-[#ff5e07]">
              대기 {waitingCount}팀
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default StoreHeaderSection;
