import React from "react";
import {useDeleteAllTasksMutation} from "./api-slice";

function DeleteAllButton({refetch, showFlashMessage}) {
    const [deleteAllTasks, {isLoading}] = useDeleteAllTasksMutation();

    async function onClick() {
        await deleteAllTasks();
        refetch();
        showFlashMessage('success', 'Successfully deleted all tasks');
    }

    return <a onClick={onClick} className={"btn my-2 " + (isLoading ? "btn-secondary" : "btn-primary")}>Delete All</a>
}

export default DeleteAllButton;
