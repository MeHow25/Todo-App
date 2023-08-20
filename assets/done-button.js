import React from "react";
import {Tooltip} from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {useUpdateTaskMutation} from "./api-slice";

function DoneButton({task, refetch, showFlashMessage}) {
    const [updateTask, {isLoading: isUpdateLoading}] = useUpdateTaskMutation();

    async function onClick() {
        const taskToUpdate = {...task};
        taskToUpdate.status = 'done';
        await updateTask(taskToUpdate);
        refetch();
        showFlashMessage('success', 'Successfully marked task as done');
    }

    return task.status !== "done" ?
        <OverlayTrigger overlay={<Tooltip style={{position:"fixed"}}>Mark task as done</Tooltip>}>
            <a onClick={onClick}>
                <div className={"p-3 text-white " + (isUpdateLoading ? 'bg-secondary' : 'bg-success')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                         className="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path
                            d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                    </svg>
                </div>
            </a>
        </OverlayTrigger>
        : null
}

export default DoneButton;
