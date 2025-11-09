import { useCallback, useMemo } from "react";

type Sanitizers = {
  removeEmoji: (t: string) => string;
  removeEmojiAll: (t: string) => string;
  removeEmojiSome: (t: string) => string;
};

/**
 * #### 메뉴/관리자용/부스 메뉴명 텍스트 사용 정책 ####
 *      공백 정리 안 함 (스페이스 유지)
 *      메뉴명: 특수문자 전부 제거+ ()[] 만 허용
 *      관리자용/부스명: 특수문자 전부 제거
 */
export const useRemoveEmoji = (): Sanitizers => {
  // 이모지/픽토계열 제거 정규식 (브라우저 호환성 고려한 범용 패턴)
  const emojiRegex = useMemo(
    () =>
      /([\u2700-\u27BF]|\u24C2|[\uE000-\uF8FF]|[\u2190-\u21FF]|[\uD83C-\uDBFF][\uDC00-\uDFFF])/g,
    []
  );

  const removeEmoji = useCallback(
    (t: string) => t.replace(emojiRegex, ""),
    [emojiRegex]
  );

  // 메뉴명: 공백 유지, '(' '[' 만 허용
  const removeEmojiSome = useCallback(
    (t: string) =>
      removeEmoji(t).replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9 \(\[\]\)]/g, ""),
    [removeEmoji]
  );

  // 관리자용 메뉴명: 공백 유지, 특수문자 전부 제거
  const removeEmojiAll = useCallback(
    (t: string) =>
      removeEmoji(t).replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9 \(\[\]\)]/g, ""),
    [removeEmoji]
  );

  return { removeEmoji, removeEmojiAll, removeEmojiSome };
};
