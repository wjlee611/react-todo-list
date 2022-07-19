import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import CreateCategory from "./CreateCategory";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 20px;
  & > h1 {
    font-size: 36px;
    margin-bottom: 20px;
  }
`;

const CategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  /* background-color: red; */
  & > select {
    width: 200px;
    height: 30px;
    margin-left: 50px;
    background-color: transparent;
    color: white;
    border: none;
    border-bottom: 1px solid white;
  }
  & > div {
    width: 450px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    padding-left: 50px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background: linear-gradient(
      90deg,
      rgba(255, 0, 0, 1),
      rgba(255, 0, 0, 0.5)
    );
    & > span {
      font-size: 16px;
      font-weight: 700;
    }
    & > button {
      background-color: rgba(255, 0, 0, 0.5);
      border: 1px solid white;
      border-radius: 10px;
      color: white;
      padding: 10px 20px;
      transition: filter 0.2s ease-out;
      &:hover {
        filter: brightness(70%);
      }
    }
  }
`;

const ColumnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 50px;
  margin: 0 50px;
  border-bottom: 2px solid white;
`;

const ToDoWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10px 50px;
  overflow-y: scroll;
`;

function ToDoList() {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const onClick = () => {
    setCategories((prev) => {
      const newCategories = prev.filter((item) => item.title !== category);
      return newCategories;
    });
    setCategory(categories[0].title);
  };
  return (
    <Wrapper>
      <Title>
        <h1>To Dos</h1>
        <CreateCategory />
      </Title>
      <CategoryWrapper>
        <select value={category} onInput={onInput}>
          {categories.map((item) => (
            <option key={item.id} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
        <div>
          <span>Dangerous Zone</span>
          <button onClick={onClick}>Current Category Delete</button>
        </div>
      </CategoryWrapper>
      <CreateToDo />
      <ColumnWrapper>
        <span>{category}</span>
        <span>Change category or Delete</span>
      </ColumnWrapper>
      <ToDoWrapper>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDoWrapper>
    </Wrapper>
  );
}

export default ToDoList;
