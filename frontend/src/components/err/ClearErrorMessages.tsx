// React & Next.js
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

// state
import { useSetAtom } from "jotai";
import errMessagesAtom from "../../jotai/atom/errMessagesAtom";

interface ClearErrorMessagesProps {
  children: ReactNode;
}

const ClearErrorMessages = ({ children }: ClearErrorMessagesProps) => {
  const setValidationErrorMessages = useSetAtom(errMessagesAtom);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // ページ遷移時にエラーメッセージをクリア
      setValidationErrorMessages([]);
    };

    // ルート変更イベントにハンドラーを追加
    router.events.on("routeChangeComplete", handleRouteChange);

    // クリーンアップ関数
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, setValidationErrorMessages]);

  return <>{children}</>;
};

export default ClearErrorMessages;
