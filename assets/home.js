import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import 'core-js/modules/es.array.map';
import Task from "./task";
import AddTask from "./add-task";
import TasksCounter from "./tasks-counter";
import DeleteAllButton from "./delete-all-button";
import {Toast, ToastContainer} from "react-bootstrap";
import {useGetTasksQuery, apiSlice} from "./api-slice";
import {useDispatch} from "react-redux";

const sortDataByStatus = (allTasks) => {
    const todoTasks = allTasks.filter(task => task.status === 'todo');
    const doneTasks = allTasks.filter(task => task.status === 'done');
    return todoTasks.concat(doneTasks);
}

function Home({setIsAuthenticated}) {
    const dispatch = useDispatch();

    const [notification, setNotification] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const { data: tasks = [], refetch } = useGetTasksQuery({}, {});

    useEffect(() => {
        refetch();
    }, []);

    const sortedTasks = useMemo(() => {
        return sortDataByStatus(tasks?.all_tasks || []);
    }, [tasks]);

    const fetchData = () => {
        refetch();
    }

    const showFlashMessage = (type, message) => {
        setNotification({type: type, message: message});
        setShowNotification(true);
    }

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await fetch('/logout', { method: 'POST' });
        dispatch(apiSlice.util.resetApiState());
        setIsAuthenticated(false);
        setIsLoggingOut(false);
    };

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
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <h1>Todo App</h1>
            </div>
            <div>
                <button onClick={handleLogout} disabled={isLoggingOut} className="btn btn-primary">Logout</button>
            </div>
        </div>
        <AddTask fetchData={fetchData} showNotification={showFlashMessage}/>
        {sortedTasks.map(task => <Task key={task.id} task={task} refetch={refetch} showFlashMessage={showFlashMessage}/>)}
        <div className="d-flex">
            <TasksCounter numberOfTasksTodo={sortedTasks.filter(task => task.status === 'todo').length}/>
            {sortedTasks.length > 0 ? <DeleteAllButton refetch={refetch} showFlashMessage={showFlashMessage}/> : null}
        </div>
    </div>;
}

export default Home;