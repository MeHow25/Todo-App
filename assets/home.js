import React, {useMemo, useState} from 'react';
import axios from "axios";
import 'core-js/modules/es.array.map';
import Task from "./task";
import AddTask from "./add-task";
import TasksCounter from "./tasks-counter";
import ClearAllButton from "./clear-all-button";
import {Toast, ToastContainer} from "react-bootstrap";
import {useAddTaskMutation, useGetTasksQuery, useUpdateTaskMutation} from "./api-slice";

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
    const [updateTask, {isUpdateLoading}] = useUpdateTaskMutation();

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

    const onTaskClick = async (task, target, notificationMessage) => {
        const taskToUpdate = {...task};
        taskToUpdate.status = target;
        await updateTask(taskToUpdate);
        showFlashMessage('success', notificationMessage);
        refetch();
    }

    const onClearAllClick = () => {
        axios.post('http://127.0.0.1:8000/delete_all').then(r => {
            fetchData();
            showFlashMessage('success', 'Successfully deleted all tasks');
        })
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
        <AddTask fetchData={fetchData} showNotification={showFlashMessage} addTask={addTask}/>
        {sortedTasks.map(task => <Task key={task.id} task={task} onTaskClick={onTaskClick}/>)}
        <div className="d-flex">
            <TasksCounter numberOfTasksTodo={sortedTasks.filter(task => task.status === 'todo').length}/>
            {sortedTasks.length > 0 ? <ClearAllButton onClearAllClick={onClearAllClick}/> : null}
        </div>
    </div>;
}

export default Home;