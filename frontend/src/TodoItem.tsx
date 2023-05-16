// import React from 'react';

import { FunctionComponent } from "react";
import { TodoItemType } from "./App";

type Props = {
  todo: TodoItemType;
  onCheckedChanged(id: number, checked: boolean): void;
  onDelete?(id: number): void;
};

const TodoItem: FunctionComponent<Props> = ({
  todo,
  onCheckedChanged,
  onDelete,
}) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.checked}
        onChange={(e) => {
          onCheckedChanged(todo.id, !todo.checked);
        }}
      />
      {todo.task}{" "}
      <button
        onClick={() => {
          onDelete && onDelete(todo.id);
        }}
      >
        x
      </button>
    </li>
  );
};

export default TodoItem;
