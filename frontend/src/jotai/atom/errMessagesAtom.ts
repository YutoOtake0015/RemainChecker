// state
import { atom } from "jotai";

// types
import { errType } from "../../types/type";

export const errMessagesAtom = atom<errType, [errType], void>(
  null,
  (_get, set, newErrMessages) => {
    set(errMessagesAtom, newErrMessages);
  }
);

export default errMessagesAtom;
