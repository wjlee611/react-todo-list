import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, ICategories, IToDo, toDoState } from "../atoms";

const Wrapper = styled.li`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  & > button {
    background-color: transparent;
    border: none;
    color: white;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const categories = useRecoilValue(categoriesState);
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: ICategories["title"]) => {
    setToDos((prev) => {
      const targetIdx = prev.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      const newToDos = [
        ...prev.slice(0, targetIdx),
        newToDo,
        ...prev.slice(targetIdx + 1),
      ];
      return newToDos;
    });
  };
  const onClickDel = () => {
    setToDos((prev) => {
      //   const targetIdx = prev.findIndex((toDo) => toDo.id === id);
      //   const newToDos = [
      //     ...prev.slice(0, targetIdx),
      //     ...prev.slice(targetIdx + 1),
      //   ];
      const newToDos = prev.filter((toDo) => toDo.id !== id);
      return newToDos;
    });
  };
  return (
    <Wrapper>
      <span>{text}</span>
      <Buttons>
        {categories
          .filter((item) => category !== item.title)
          .map((item) => (
            <button key={item.id} onClick={() => onClick(item.title)}>
              {item.title}
            </button>
          ))}
        <button onClick={onClickDel}>❌</button>
      </Buttons>
    </Wrapper>
  );
}

export default ToDo;
