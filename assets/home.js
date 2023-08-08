import React, {useEffect, useState} from 'react';
import axios from "axios";
import 'core-js/modules/es.array.map';
import Task from "./task";
import AddTask from "./add-task";
import TasksCounter from "./tasks-counter";
import ClearAllButton from "./clear-all-button";
import {Toast, ToastContainer} from "react-bootstrap";

function Home() {

    const [state, setState] = useState([]);
    const [notification, setNotification] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    const fetchData = () => {
        axios.get('http://127.0.0.1:8000/all_tasks').then(response => {
            const sortedTasks = sortDataByStatus(response.data.all_tasks);
            setState(sortedTasks);
        })
    }

    const sortDataByStatus = (allTasks) => {
        const todoTasks = allTasks.filter(task => task.status === 'todo');
        const doneTasks = allTasks.filter(task => task.status === 'done');
        return todoTasks.concat(doneTasks);
    }

    const onTaskClick = (task, target, notificationMessage) => {

        task.status = target;
        axios.post('http://127.0.0.1:8000/status', task).then(r => {
            fetchData();
            showFlashMessage('success', notificationMessage);
        })
    }

    const onClearAllClick = () => {
        axios.post('http://127.0.0.1:8000/delete_all').then(r => {
            fetchData();
            showFlashMessage('success', 'Successfully deleted all tasks');
        })
    }

    useEffect(() => {
        let ignore = false;

        if (!ignore) fetchData()
        return () => {
            ignore = true;
        }
    }, []);

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
        {state.map(task => <Task key={task.id} task={task} onTaskClick={onTaskClick}/>)}
        <div className="d-flex">
            <TasksCounter numberOfTasksTodo={state.filter(task => task.status === 'todo').length}/>
            {state.length > 0 ? <ClearAllButton onClearAllClick={onClearAllClick}/> : null}
        </div>
    </div>;
}

export default Home;