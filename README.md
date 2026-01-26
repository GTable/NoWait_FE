<img width="2400" height="1350" alt="Image" src="https://github.com/user-attachments/assets/1e4a6037-cd61-4c05-bacd-c177859180db" />

## 📝 프로젝트 설명
노웨잇 서비스는 대학교 축제에서 불필요한 주점 웨이팅, 수기로 작성되는 주문 시스템을 개선하기 위해 만들어졌습니다.

관리자와 사용자 모두 고려한 기획과 설계가 이루어졌으며, 1명의 디자이너와 프론트엔드 3명, 백엔드 2명이 팀을 이루어 기획 및 디자인, 개발을 진행 하였고, 주 2회 오프라인 회의와 Discord, Figma, Swagger를 통해 원활한 소통과 협업을 진행했습니다.

현재는 더 좋은 서비스 제공을 위해 웹 서비스에서 앱 서비스로 마이그레이션 진행중 입니다.

### 🔗 배포주소
```txt
사용자: https://app.nowait.co.kr
관리자: https://www.nowait-admin.com
```

### 📱 결제 플로우
<img width="800" height="610" alt="Image" src="https://github.com/user-attachments/assets/57003ffa-a4fc-4024-b935-381c2c2e3d2b" />

### 📱 웨이팅 플로우
<img width="800" height="388" alt="Image" src="https://github.com/user-attachments/assets/2e0f3c73-994b-4e95-ac50-2fcf79ce28cf" />

## ⚙️ 사용 기술
<table>
  <thead>
    <tr>
      <th align="left">기술</th>
      <th align="left">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>React</b></td>
      <td>재사용성과 유지보수성을 고려한 프론트엔드 구조 설계</td>
    </tr>
    <tr>
      <td><b>TypeScript</b></td>
      <td>정적 타입을 적용해 컴파일 단계에서 오류를 예방하고 코드 안정성 및 가독성 향상</td>
    </tr>
    <tr>
      <td><b>React Query</b></td>
      <td>서버 상태 캐싱 및 동기화를 통해 데이터 패칭 로직을 단순화하고 성능 최적화</td>
    </tr>
    <tr>
      <td><b>Axios</b></td>
      <td>API 요청/응답 인터셉터를 활용해 공통 네트워크 로직을 일관성 있게 관리</td>
    </tr>
    <tr>
      <td><b>Naver Map API</b></td>
      <td>위치 기반 서비스 구현을 위한 지도 렌더링 및 마커·좌표 기반 기능 제공</td>
    </tr>
    <tr>
      <td><b>Zustand</b></td>
      <td>간결한 전역 상태 관리로 불필요한 보일러플레이트 없이 상태 흐름을 명확히 유지</td>
    </tr>
    <tr>
      <td><b>Tailwind CSS</b></td>
      <td>빠른 UI 구성과 일관된 디자인 시스템 적용</td>
    </tr>
  </tbody>
</table>


## 🧩 모노레포 설계

Admin과 User 애플리케이션을 하나의 저장소에서 관리하는 프론트엔드 모노레포 구조로 설계했습니다.
```txt
- Zero-install 환경
  - 의존성 중복 제거
  - 신규 개발자 세팅 및 CI 시간 단축

- 캐시 기반 빌드 파이프라인
  - 변경된 패키지만 빌드
  - 로컬 개발 속도 및 CI 성능 개선

- 공통 UI & 타입 패키지 분리
  - UI 일관성 확보
  - 타입 안정성 강화 및 중복 코드 제거

- 서비스 단위 독립 배포
  - 모노레포 구조에서도 앱별 배포 가능
```


## 📁 프로젝트 구조
```txt
NoWait_FE/
├── apps/
│   ├── nowait-admin/               # 관리자용 프론트엔드 앱 (Vite + React + TypeScript)
│   └── nowait-user/                # 사용자용 프론트엔드 앱 (Vite + React + TypeScript)
├── packages/
│   ├── ui/                  # 공통 UI 컴포넌트(Button, Card 등)
│   └── tailwind-config/     # 공통 Tailwind 설정 (색상, 폰트 등)
├── turbo.json               # Turborepo 설정
├── package.json             # 루트 패키지 매니저 설정
├── .yarnrc.yml              # Yarn Berry 설정
└── ...
```
## 🎨 스타일 가이드

- 공통 색상 및 폰트는 `packages/tailwind-config/shared-styles.css` 파일에서 관리됩니다.
- 버튼 등의 공통 UI 컴포넌트는 `packages/ui/src` 내부에 생성하며, 다음과 같이 사용합니다:

  ```tsx
  import { Card } from "@repo/ui/card";
  ```
- 각 앱 별 Tailwind 설정(padding, margin 등)은 아래의 경로에서 개별적으로 수정할 수 있습니다.
  ```txt
  apps/admin/tailwind.config.js
  apps/user/tailwind.config.js
  ```
## ⚙️ 설치 및 실행 방법
1. 원하는 폴더에 저장소 클론
```tsx
git clone https://github.com/GTable/NoWait_FE.git
```
2. 루트 폴더로 이동 후 Yarn 버전 확인 (25.6.19 기준 4.9.2 필요)
```tsx
cd NoWait_FE
yarn --version
```
3. 패키지 설치
```tsx
yarn install
```
5. UI 패키지 빌드
```tsx
yarn workspace @repo/ui build
```
7. 전체 앱 빌드 (Turborepo 사용)
```tsx
npx turbo build
```
8. yarn pnp가 Typescript 인식 못하는 문제 해결 (좌측 하단의 Allow 버튼 꼭 눌러야 함, 누르지 못할 시 완전히 종료 후 재실행)
```tsx
yarn dlx @yarnpkg/sdks vscode
```
9. 앱 실행
```tsx
yarn dev:user    # 사용자용 앱 실행  
yarn dev:admin   # 관리자용 앱 실행
```

## 👥 팀원 소개

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/hwangdae">
        <img src="https://avatars.githubusercontent.com/hwangdae" width="120" height="120" />
      </a>
      <br />
      <strong>황대성</strong>
      <br />
      Frontend
    </td>
    <td align="center">
      <a href="https://github.com/dgKim1">
        <img src="https://avatars.githubusercontent.com/dgKim1" width="120" height="120" />
      </a>
      <br />
      <strong>김도경</strong>
      <br />
      Frontend
    </td>
    <td align="center">
      <a href="https://github.com/oriNuguri25">
        <img src="https://avatars.githubusercontent.com/oriNuguri25" width="120" height="120" />
      </a>
      <br />
      <strong>이병준</strong>
      <br />
      Frontend
    </td>
  </tr>
</table>
