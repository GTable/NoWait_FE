import { DropdownSelect } from "./DropDown/DropDownSelect";

// 24시간값(HH) ↔ 표시라벨(오전/오후 hh시) 매핑
const HHToLabel = (HH: string) => {
  if (!HH) return "";
  const h = Number(HH);
  if (Number.isNaN(h)) return "";
  if (h === 0) return "오전 12시";
  if (h < 12) return `오전 ${String(h).padStart(2, "0")}시`;
  if (h === 12) return "오후 12시";
  return `오후 ${String(h - 12).padStart(2, "0")}시`;
};

const labelToHH = (label: string) => {
  const m = label.match(/(오전|오후)\s(\d{1,2})시/);
  if (!m) return "";
  const period = m[1];
  let hour = Number(m[2]) % 12; // 12 → 0 으로 맞춘 뒤
  if (period === "오후") hour += 12;
  return String(hour).padStart(2, "0"); // "00"~"23"
};

// 분(mm) ↔ "mm분" 매핑
const mmToLabel = (mm: string) =>
  mm ? `${String(Number(mm)).padStart(2, "0")}분` : "";

const labelToMM = (label: string) => {
  const m = label.match(/(\d{1,2})분/);
  if (!m) return "";
  return String(Number(m[1])).padStart(2, "0"); // "00"~"59"
};

// 표시용 옵션
const hourLabels = Array.from({ length: 24 }, (_, h) =>
  HHToLabel(String(h).padStart(2, "0"))
);
const minuteLabels = Array.from(
  { length: 12 },
  (_, i) => `${String(i * 5).padStart(2, "0")}분`
);

const OperatingTimeSelector = ({
  startHour,
  setStartHour,
  startMinute,
  setStartMinute,
  endHour,
  setEndHour,
  endMinute,
  setEndMinute,
  isMobile,
}: {
  startHour: string; // 내부값: "HH" (예: "15")
  setStartHour: (val: string) => void;
  startMinute: string; // 내부값: "mm"
  setStartMinute: (val: string) => void;
  endHour: string;
  setEndHour: (val: string) => void;
  endMinute: string;
  setEndMinute: (val: string) => void;
  isMobile: boolean;
}) => {
  return (
    <div className="mb-[50px] max-w-[614px]">
      <label className="block text-title-18-bold text-black-80 mb-1">
        운영 시간
      </label>
      <p className="text-14-regular text-black-70 mb-3">
        부스의 운영 시간을 설정해 주세요
      </p>

      <div
        className={`w-full ${
          isMobile ? "flex flex-col gap-[14px]" : "flex flex-row items-center"
        }`}
      >
        {/* 시작 */}
        <div className="flex items-center gap-[10px]">
          <span className="w-[28px] text-14-semibold text-black-90">시작</span>
          <DropdownSelect
            value={HHToLabel(startHour)}
            onChange={(label) => setStartHour(labelToHH(label))}
            options={hourLabels}
            placeholder="시간"
          />
          <DropdownSelect
            value={mmToLabel(startMinute)}
            onChange={(label) => setStartMinute(labelToMM(label))}
            options={minuteLabels}
            placeholder="분"
          />
        </div>

        {!isMobile && <span className="mx-[10px] text-gray-600">-</span>}

        {/* 종료 */}
        <div className="flex gap-[10px] items-center">
          <span className="w-[28px] text-14-semibold text-black-90">종료</span>
          <DropdownSelect
            value={HHToLabel(endHour)}
            onChange={(label) => setEndHour(labelToHH(label))}
            options={hourLabels}
            placeholder="시간"
          />
          <DropdownSelect
            value={mmToLabel(endMinute)}
            onChange={(label) => setEndMinute(labelToMM(label))}
            options={minuteLabels}
            placeholder="분"
          />
        </div>
      </div>
    </div>
  );
};

export default OperatingTimeSelector;
