import DefaultDepartmentImage from "../assets/default-department.png";

interface PropsType {
  width: string;
  height: string;
  src?: string;
}
const DepartmentImage = ({ width, height, src }: PropsType) => {
  
  return (
      <img
      style={{ width, height }}
        className={`object-cover rounded-full`}
        src={src || DefaultDepartmentImage}
        alt="학과 대표 이미지"
      />
  );
};

export default DepartmentImage;
