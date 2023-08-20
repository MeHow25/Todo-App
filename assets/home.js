import React, {useMemo, useState} from 'react';
import 'core-js/modules/es.array.map';
import Task from "./task";
import AddTask from "./add-task";
import TasksCounter from "./tasks-counter";
import ClearAllButton from "./clear-all-button";
import {Toast, ToastContainer} from "react-bootstrap";
import {useAddTaskMutation, useDeleteAllTasksMutation, useGetTasksQuery, useUpdateTaskMutation} from "./api-slice";

const sortDataByStatus = (allTasks) => {
    const todoTasks = allTasks.filter(task => task.status === 'todo');
    const doneTasks = allTasks.filter(task => task.status === 'done');
    return todoTasks.concat(doneTasks);
}

function Home() {
    //todo loading status
    const [notification, setNotification] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [addTask, {isAddLoading}] = useAddTaskMutation();
    const [deleteAllTasks, {isDeleteAllLoading}] = useDeleteAllTasksMutation();

    const {
        data: tasks = [],
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetTasksQuery({}, {});

    const sortedTasks = useMemo(() => {
        return sortDataByStatus(tasks?.all_tasks || []);
    }, [tasks]);

    const fetchData = () => {
        refetch();
    }

    const onClearAllClick = async () => {
        await deleteAllTasks();
        refetch();
        showFlashMessage('success', 'Successfully deleted all tasks');
    }

    const showFlashMessage = (type, message) => {
        setNotification({type: type, message: message});
        setShowNotification(true);
    }

    const notificationType = notification?.type;
    const notificationMessage = notification?.message;

    return <div>
        <ToastContainer
            className="p-3"
            position="top-end"
            style={{zIndex: 1}}
        >
            <Toast bg={notificationType}
                   onClose={() => setShowNotification(false)} show={showNotification}
                   delay={3000} autohide>
                <Toast.Body className="text-white">{notificationMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
        <h1>Todo App</h1>
        <AddTask fetchData={fetchData} showNotification={showFlashMessage}/>
        {sortedTasks.map(task => <Task key={task.id} task={task} refetch={refetch} showFlashMessage={showFlashMessage}/>)}
        <div className="d-flex">
            <TasksCounter numberOfTasksTodo={sortedTasks.filter(task => task.status === 'todo').length}/>
            {sortedTasks.length > 0 ? <ClearAllButton onClearAllClick={onClearAllClick}/> : null}
        </div>
    </div>;
}

export default Home;