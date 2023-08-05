import React, {useEffect, useState} from 'react';
import axios from "axios";
import 'core-js/modules/es.array.map';
import Task from "./task";
import AddTask from "./add-task";

function Home() {

    const dataState = useState();
    const state = dataState[0];
    const setState = dataState[1];
    const fetchData = () => {
        axios.get('http://127.0.0.1:8000/api').then(response => {
            const sortedTasks = sortDataByStatus(response.data.all_tasks);
            setState(sortedTasks);
        })
    }

    const sortDataByStatus = (allTasks) => {
        const todoTasks = allTasks.filter(task => task.status === 'todo');
        const doneTasks = allTasks.filter(task => task.status === 'done');
        return todoTasks.concat(doneTasks);
    }

    const onTaskClick = (task, target) => {

        task.status = target;
        axios.post('http://127.0.0.1:8000/status-json', task).then(r => {
            fetchData();
        })
    }

    useEffect(() => {
        let ignore = false;

        if (!ignore) fetchData()
        return () => {
            ignore = true;
        }
    }, []);

    return <div>
        <h1>Todo App</h1>
        <AddTask fetchData={fetchData}/>
        {state?.map(task => <Task key={task.id} task={task} onTaskClick={onTaskClick}/>)}
    </div>;
}

export default Home;