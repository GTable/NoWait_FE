import { useState } from "react";
import Help from "../../../../../assets/icon/help.svg?react";
import SlideToggle from "../SlideToggle";

const RemitHeader = () => {
  const [remitDescriptionToggle, setRemitDescriptionToggle] = useState(false);

  return (
    <div className="pb-5">
      <h1 className="text-title-18-semibold">
        <button
          className="flex items-center gap-1"
          onClick={() => setRemitDescriptionToggle(!remitDescriptionToggle)}
        >
          송금 수단
          <span>
            <Help />
          </span>
        </button>
      </h1>
      <SlideToggle toggle={remitDescriptionToggle}>
        <p className="text-14-regular text-black-70 pt-4">
          축제 부스는 한정된 시간과 인력으로 운영 돼요.
          <br />
          효율적 운영을 위해 결제는 간편 송금과 이체만 가능해요.
        </p>
      </SlideToggle>
    </div>
  );
};

export default RemitHeader;
