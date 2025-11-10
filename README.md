# 🧩 NoWait_FE - Frontend Monorepo

이 프로젝트는 **Admin**과 **User** 애플리케이션이 공존하는 **프론트엔드 모노레포**입니다.<br/>
**Yarn Workspaces**와 **Yarn Berry**, **Turborepo** 기반으로 구성되어 있어 Zero-install 및 디자인 통일성, 캐시 최적화가 가능합니다<br/>
스타일은 **TailwindCSS**를 사용하였으며, 배포는 **Vercel**을 사용했습니다.

---

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

## 🔗 배포주소
```txt
사용자: https://www.nowait-user.vercel.app
관리자: https://www.nowait-admin.com
```
