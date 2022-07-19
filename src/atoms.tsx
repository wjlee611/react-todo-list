import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

// export enum Categories {
//   "TO_DO" = "TO_DO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }

export interface ICategories {
  title: string;
  id: number;
}

const { persistAtom: persistCategory } = recoilPersist({
  key: "categoryLocal",
  storage: localStorage,
});

export const categoriesState = atom<ICategories[]>({
  key: "categories",
  default: [
    { title: "To Do", id: 0 },
    { title: "Doing", id: 1 },
    { title: "Done", id: 2 },
  ],
  effects_UNSTABLE: [persistCategory],
});

export interface IToDo {
  text: string;
  id: number;
  category: ICategories["title"];
}

export const categoryState = atom<string>({
  key: "category",
  default: "To Do",
});

const { persistAtom: persistToDo } = recoilPersist({
  key: "toDoLocal",
  storage: localStorage,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistToDo],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
