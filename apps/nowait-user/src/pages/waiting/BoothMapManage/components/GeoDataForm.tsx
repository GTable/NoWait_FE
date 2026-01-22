import { Button } from "@repo/ui";
import { useState } from "react";

const GeoDataForm = () => {
  const [geoData, setGeoData] = useState("");

  const copyPolygon = () => {
    const parsed = JSON.parse(geoData);
    const polygon = [
      parsed.map(({ lat, lon }: { lat: number; lon: number }) => [
        lon,
        lat,
      ]),
    ];

    navigator.clipboard.writeText(JSON.stringify(polygon, null, 2));
    alert("복사가 완료 되었습니다.");
  };

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-20 w-full z-50 px-2.5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          copyPolygon();
        }}
      >
        <textarea
          className="bg-white w-full min-h-48 outline-none"
          placeholder="데이터를 입력해주세요."
          value={geoData}
          onChange={(e) => setGeoData(e.target.value)}
        />
        <Button>데이터 변경 및 복사</Button>
      </form>
    </div>
  );
};

export default GeoDataForm;