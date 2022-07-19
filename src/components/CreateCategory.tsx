import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, categoryState } from "../atoms";

const FormWrapper = styled.form`
  width: 500px;
  height: 30px;
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
  & > input {
    width: 430px;
    background-color: transparent;
    border: 1px solid white;
    border-right: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    color: white;
  }
  & > button {
    width: 70px;
    background-color: transparent;
    border: 1px solid white;
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: white;
  }
  & > span {
    position: absolute;
    top: 40px;
  }
`;

interface IForm {
  title: string;
}
function CreateCategory() {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const setCategory = useSetRecoilState(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IForm>();
  const handleValid = ({ title }: IForm) => {
    console.log(categories.find((item) => item.title === title));
    if (categories.find((item) => item.title === title)) {
      setError(
        "title",
        { type: "focus", message: `${title} category is already exists.` },
        { shouldFocus: true }
      );
    } else {
      setCategories((prev) => [...prev, { title: title, id: Date.now() }]);
      setCategory(title);
      setValue("title", "");
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("title", {
          required: "Please naming a new category",
        })}
        placeholder="Naming a new category"
      />
      <button>Create</button>
      <span>{errors?.title?.message}</span>
    </FormWrapper>
  );
}

export default CreateCategory;
