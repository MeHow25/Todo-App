import React from "react";
import TodoButton from "./todo-button";
import DeleteButton from "./delete-button";
import DoneButton from "./done-button";

function Task({task, onTaskClick, isUpdateLoading}) {
    return <div key={task.id}>
        <div className="d-flex mb-2">
            <div className="flex-grow-1 p-3 text-primary-emphasis bg-primary-subtle rounded-start">
                {task.content}
            </div>
            <TodoButton task={task} onTaskClick={onTaskClick} isUpdateLoading={isUpdateLoading}/>
            <DoneButton task={task} onTaskClick={onTaskClick}/>
            <DeleteButton task={task} onTaskClick={onTaskClick}/>
        </div>
    </div>
}

export default Task;