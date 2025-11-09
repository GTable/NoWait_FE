import { useEffect, useState } from "react";

/**
 * File 객체에서 안전하게 object URL을 생성/해제해주는 훅
 */
export function useObjectUrl(file: File | null) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const objUrl = URL.createObjectURL(file);
    setUrl(objUrl);
    return () => {
      URL.revokeObjectURL(objUrl);
    };
  }, [file]);

  return url;
}
