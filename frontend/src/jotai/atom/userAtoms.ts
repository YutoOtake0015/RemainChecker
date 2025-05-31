// state
import { atom } from "jotai";

// types
import { userType } from "../../types/type";

export const userAtom = atom<userType, [userType], void>(
  null,
  (_, set, newUser) => {
    set(userAtom, newUser);
  }
);
