import React from "react";

function DeleteButton({task, onTaskClick}) {
    return task.status === "todo"? <p onClick={() => onTaskClick(task, "deleted")}>Delete</p>: null
}

export default DeleteButton;

