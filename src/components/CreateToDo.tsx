import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

const Wrapper = styled.form`
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 20px 50px;
  margin-bottom: 20px;
  position: relative;
  & > input {
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid white;
    color: white;
    padding: 10px;
  }
  & > button {
    width: 100px;
    background-color: transparent;
    border: 2px solid white;
    border-radius: 10px;
    border-bottom-left-radius: 0;
    color: white;
    padding: 10px;
  }
  & > span {
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

interface IForm {
  toDo: string;
}
function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((prev) => [{ text: toDo, id: Date.now(), category }, ...prev]);
    setValue("toDo", "");
  };
  return (
    <Wrapper onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: `Please write a ${category}`,
        })}
        placeholder={`Write a ${category}`}
      />
      <button>Add</button>
      <span>{errors?.toDo?.message}</span>
    </Wrapper>
  );
}

export default CreateToDo;
