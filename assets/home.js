import React, {useMemo, useState} from 'react';
import 'core-js/modules/es.array.map';
import Task from "./task";
import AddTask from "./add-task";
import TasksCounter from "./tasks-counter";
import DeleteAllButton from "./delete-all-button";
import {Toast, ToastContainer} from "react-bootstrap";
import {useGetTasksQuery} from "./api-slice";

const sortDataByStatus = (allTasks) => {
    const todoTasks = allTasks.filter(task => task.status === 'todo');
    const doneTasks = allTasks.filter(task => task.status === 'done');
    return todoTasks.concat(doneTasks);
}

function Home() {
    const [notification, setNotification] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    const {data: tasks = [], refetch} = useGetTasksQuery({}, {});

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
            {sortedTasks.length > 0 ? <DeleteAllButton refetch={refetch} showFlashMessage={showFlashMessage}/> : null}
        </div>
    </div>;
}

export default Home;