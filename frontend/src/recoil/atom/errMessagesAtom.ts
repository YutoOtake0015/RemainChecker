// state
import { atom } from "recoil";

// types
import { errType } from "../../types/type";

const errMessagesAtom = atom<errType>({
  key: "errMessagesAtom",
  default: null,
});

export default errMessagesAtom;
