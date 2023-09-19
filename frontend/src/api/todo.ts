import axios from "axios";

axios.defaults.headers.common["content-type"] = "application/json";

export interface Todo {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export const requestCreateTodo = async (
  content: string,
  success: (data: Todo) => void
): Promise<void> => {
  try {
    const res = await axios.post("http://localhost:8080/api/todo", {
      content: content,
    });
    success(res.data);
  } catch (e) {
    console.log(e);
  }
};

export const requestGetTodo = async (
  success: (data: Array<Todo>) => void
): Promise<void> => {
  const url = "http://localhost:8080/api/todo";
  try {
    const res = await axios.get(url);
    success(res.data);
  } catch (e) {
    console.log(e);
  }
};
