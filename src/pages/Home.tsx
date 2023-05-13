import { useRef, useState } from "react";
import { TodoItemType } from "../App";
import TodoItem from "../TodoItem";

export default function Home() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const taskRef = useRef<HTMLInputElement>(null);

  const onTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const checkedTodosCount = todos.filter((t) => t.checked).length;

  return (
    <>
      <input type="text" ref={taskRef} value={task} onChange={onTodoChange} />
      <button
        onClick={() => {
          setTodos((todos) => [
            ...todos,
            { id: new Date().getTime(), task, checked: false },
          ]);
          setTask("");
          taskRef.current?.focus();
        }}
      >
        Add Todo
      </button>
      <button
        onClick={() => {
          setTodos([]);
        }}
      >
        Clear Todos
      </button>
      <br />
      <p>Checked Todos Count: {checkedTodosCount}</p>
      <br />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onCheckedChanged={(id, checked) => {
              setTodos((todos) =>
                todos.map((t) => (t.id === id ? { ...t, checked } : t))
              );
            }}
            onDelete={(id) => {
              setTodos((todos) => todos.filter((t) => t.id !== id));
            }}
          />
        ))}
      </ul>
    </>
  );
}
