import React from "react";

function TasksCounter({numberOfTasksTodo}) {
    return <div className="d-flex">
        <div className="p-3 text-primary-emphasis flex-grow-1">
            {numberOfTasksTodo === 0 ? 'You have no tasks to do' : 'You have '+numberOfTasksTodo+' pending tasks'}
        </div>
    </div>
}

export default TasksCounter;
