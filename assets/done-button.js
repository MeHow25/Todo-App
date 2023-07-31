import React from "react";

function DoneButton({task, onTaskClick}) {
    return task.status !== "done"? <p onClick={() => onTaskClick(task, "done")}>Change to done</p>: null
}

export default DoneButton;
