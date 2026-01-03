import defaultMenuImageLg from "../../../../assets/default-image-lg.png";

interface Props {
  menu: {
    name: string;
    description?: string;
    images?: { imageUrl: string }[];
  };
}

const MenuInfoSection = ({ menu }: Props) => {
  const image = menu.images?.[0]?.imageUrl ?? defaultMenuImageLg;

  return (
    <section className="flex flex-col grow px-5">
      <div className="-mx-5 h-[246px]">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt="음식 메뉴 이미지"
        />
      </div>

      <div className="py-8">
        <h1 className="text-headline-22-bold mb-2 break-keep">{menu.name}</h1>
        {menu.description && (
          <p className="text-16-regular text-black-70 break-keep">
            {menu.description}
          </p>
        )}
      </div>
    </section>
  );
};

export default MenuInfoSection;
