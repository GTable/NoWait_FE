// 서비스 이용약관
const ServiceTermsContent = () => {
  return (
    <div className="flex flex-col gap-2.5 px-5">
      <div className="flex flex-col">
        <div className="flex term-text-13-semibold">
          [필수] 노웨잇 서비스 이용약관 동의 <br />제 1조 (목적)
        </div>
        <div className="flex term-text-13-regular">
          본 약관은 노웨잇(이하 “회사”)이 제공하는 서비스의 이용 조건 및 절차,
          회사와 회원 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex term-text-13-semibold">
          제 2조 (회원가입 및 계정관리)
        </div>
        <div className="flex term-text-13-regular">
          <div className="w-2.5 mr-1 flex-shrink-0">1.</div>
          <div>
            회원은 회사가 정한 절차에 따라 소셜 로그인 또는 별도의 가입 절차를
            통해 계정을 생성합니다.
          </div>
        </div>
        <div className="flex term-text-13-regular">
          <div className="w-2.5 mr-1 flex-shrink-0">2.</div>
          <div>
            회원은 계정 및 비밀번호 관리 책임이 있으며, 이를 제3자에게 양도,
            대여, 공유할 수 없습니다.
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex term-text-13-semibold">
          제 3조 (서비스의 변경 및 중단)
        </div>
        <div className="flex term-text-13-regular">
          <div className="w-2.5 mr-1 flex-shrink-0">1.</div>
          <div>
            회사는 회원에게 예약, 알림, 대기 관리 등의 서비스를 제공합니다.
          </div>
        </div>
        <div className="flex term-text-13-regular">
          <div className="w-2.5 mr-1 flex-shrink-0">2.</div>
          <div>
            회원은 관련 법령을 준수해야 하며, 타인의 정보를 도용하거나 허위
            정보를 제공해서는 안 됩니다.
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex term-text-13-semibold">
          제 4조 (서비스의 변경 및 중단)
        </div>
        <div className="flex term-text-13-regular">
          회사는 서비스의 일부 또는 전부를 변경·중단할 수 있으며, 이 경우 사전에
          회원에게 고지합니다.
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex term-text-13-semibold">
          제 5조 (이용 제한 및 계약 해지)
        </div>
        <div className="flex term-text-13-regular">
          회사는 서비스의 일부 또는 전부를 변경·중단할 수 있으며, 이 경우 사전에
          회원에게 고지합니다.
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex term-text-13-semibold">제 6조 (면책 조항)</div>
        <div className="flex term-text-13-regular">
          회사는 천재지변, 네트워크 장애, 불가항력적 사유로 인한 서비스 중단에
          대하여 책임을 지지 않습니다.
        </div>
      </div>
    </div>
  );
};

const PrivacyTermsContent = () => {
  return (
    <div className="flex flex-col gap-2.5 px-5">
      <div className="flex flex-col">
        <div className="flex term-text-13-semibold">
          [필수] 개인정보 수집 및 이용 동의
        </div>
        <div className="flex term-text-13-regular">
          회사는 「개인정보 보호법」에 따라 회원님의 개인정보를 수집·이용하고
          있습니다.
          <br />
          서비스 이용을 위해 아래 내용을 확인하시고 동의해 주시기 바랍니다.
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex term-text-13-semibold">수집항목</div>
        <div className="flex term-text-13-regular">
          <div className="w-2.5 mr-1 flex-shrink-0 text-black-70">•</div>
          <div>이메일(소셜 로그인 연동), 비밀번호, 휴대전화 번호</div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex term-text-13-semibold">수집 및 이용목적</div>
        <div className="flex term-text-13-regular">
          <div className="w-2.5 mr-1 flex-shrink-0 text-black-70">•</div>
          <div>회원 식별 및 계정 관리</div>
        </div>
        <div className="flex term-text-13-regular">
          <div className="w-2.5 mr-1 flex-shrink-0 text-black-70">•</div>
          <div>본인 확인, 계정 복구, 서비스 알림 발송</div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex term-text-13-semibold">보유 및 이용기간</div>
        <div className="flex term-text-13-regular">
          <div className="w-2.5 mr-1 flex-shrink-0 text-black-70">•</div>
          <div>회원 탈퇴 시까지</div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex term-text-13-regular">
          ※ 법령에 따라 보관이 필요한 경우, 관련 법령에서 정한 기간 동안
          보관합니다.
        </div>
        <div className="flex term-text-13-regular">
          ※ 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보, 단말기정보(서비스
          버전, OS, OS 버전, 디바이스 모델명) 등 자동으로 수집될 수 있습니다.
        </div>
        <div className="flex term-text-13-regular">
          ※ 필수항목에 대한 수집 및 이용에 동의하지 않을 권리는 있으나, 미동의
          시 회원가입이 불가합니다.
        </div>
      </div>
    </div>
  );
};

const MarketingTermsContent = () => {
  return (
    <div className="flex flex-col gap-2.5 px-5">
      <div className="flex flex-col">
        <div className="flex term-text-13-semibold">
          [선택] 마케팅 정보 수신 동의
        </div>
        <div className="flex term-text-13-regular">
          회사는 회원에게 이벤트, 할인 혜택, 신규 서비스 안내 등 유용한 정보를
          제공하기 위하여 휴대전화 번호 또는 이메일을 통해 광고성 정보를 발송할
          수 있습니다.
        </div>
        <div className="flex term-text-13-regular">
          <div className="mr-1 flex-shrink-0">1. 수신 항목:</div>
          <div>휴대전화(SMS, 카카오 알림톡 등), 이메일</div>
        </div>
        <div className="flex term-text-13-regular">
          <div className="mr-1 flex-shrink-0">2. 수신 목적:</div>
          <div>이벤트, 프로모션, 서비스 안내</div>
        </div>
        <div className="flex term-text-13-regular">
          <div className="mr-1 flex-shrink-0">3. 보유 및 이용 기간:</div>
          <div>동의 철회 시 또는 회원 탈퇴 시까지</div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex term-text-13-regular">
          ※ 동의를 거부하셔도 서비스 이용에는 제한이 없습니다.
        </div>
        <div className="flex term-text-13-regular">
          ※ 법령에 따라 보관이 필요한 경우, 관련 법령에서 정한 기간 동안
          보관합니다.
        </div>
      </div>
    </div>
  );
};

export { ServiceTermsContent, PrivacyTermsContent, MarketingTermsContent };
