import React, { useRef } from "react";
import "./transition.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useNavigationType } from "react-router-dom";

interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: any;
  key: string;
}

interface PropsType {
  children: React.ReactNode;
  location: Location;
}

const PageTransitionWrapper = ({ location, children }: PropsType) => {
  const navigateType = useNavigationType();
  const pathname = location.pathname;
  const isBack = location.state?.isBack as boolean | undefined;
  console.log(isBack, "이즈백");

  //라우터 이동 방향에 따른 애니메이션 분리
  const isNavigatePush = navigateType === "PUSH" && !isBack;
  const isNavigateReplace = navigateType === "REPLACE" && !isBack;

  const isAnimation = () => {
    if (isNavigatePush) return "navigate-push";
    if (isBack) return "navigate-pop";
    if (isNavigateReplace) return "";
    return "";
  };

  // 각 pathname별 ref를 분리해서 객체로 관리
  const nodeRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});

  if (!nodeRefs.current[pathname]) {
    nodeRefs.current[pathname] = React.createRef<any>();
  }

  const currentNodeRef = nodeRefs.current[pathname];

  return (
    <TransitionGroup
      className={"transition-wrapper"}
      childFactory={(child: any) =>
        React.cloneElement(child, {
          classNames: isAnimation(),
        })
      }
    >
      <CSSTransition key={pathname} timeout={300} nodeRef={currentNodeRef}>
        <div className="overflow-y-auto" ref={currentNodeRef}>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransitionWrapper;
