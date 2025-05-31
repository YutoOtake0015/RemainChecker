// import { useSetRecoilState } from "recoil";
import { useSetAtom } from "jotai";
import { loadingAtom } from "../jotai/atom/loadingAtom";

export const useLoading = () => {
  const setLoading = useSetAtom(loadingAtom);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return { startLoading, stopLoading };
};
