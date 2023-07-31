import React from "react";

function TodoButton({task, onTaskClick}) {
    return task.status !== "todo"? <p onClick={() => onTaskClick(task, "todo")}>Change to todo</p>: null
}

export default TodoButton;

