import React from "react";
import TodoButton from "./todo-button";
import DeleteButton from "./delete-button";
import DoneButton from "./done-button";

function Task(props) {
    const {task, onTaskClick} = props;
        return <div key={task.id}>
            <p>{task.content}, status = {task.status}</p>
            <TodoButton task={task} onTaskClick={onTaskClick} />
            <DoneButton task={task} onTaskClick={onTaskClick} />
            <DeleteButton task={task} onTaskClick={onTaskClick} />
        </div>
}

export default Task;