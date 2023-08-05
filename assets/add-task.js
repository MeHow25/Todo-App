import React, {useState} from "react";
import AddButton from "./add-button";

function AddTask({fetchData}) {
    const [value, setValue] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(true);

    function onKeyPress(event) {
        if (event.key === "Enter") {
            console.log(value, submitDisabled);
            saveTask();
        }
    }

    function saveTask() {
        if (submitDisabled || value.trim().length === 0) {
            return;
        }
        console.log('przeszlo')
        setSubmitDisabled(true);
        fetch("http://127.0.0.1:8000/task_add_json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "content": value
            }),
        }).then(response => {
            setValue("");
            fetchData();
        });
    }

    function onInputChange(event) {
        setValue(event.target.value);
        if (value.trim().length === 0) {
            setSubmitDisabled(true);
        } else {
            setSubmitDisabled(false);
        }
    }

    return <div className="d-flex" style={{gap: 10 + 'px'}}>
        <div className="flex-grow-1">
            <input
                type="text"
                className="form-control my-2 py-3"
                placeholder="Add Task"
                value={value}
                onKeyPress={event => onKeyPress(event)}
                onChange={onInputChange}
                autoFocus
            />
        </div>
        <AddButton saveTask={saveTask}/>
    </div>
}

export default AddTask;