import React, {useState} from "react";

function AddTask() {
    const [value, setValue] = useState("");
    console.log(value);

    function handleSubmit(event) {
        console.log(event.target.value)
    }

    return <input type="text" placeholder="Add Task" onKeyUp={event => handleSubmit(event)} onChange={event => setValue(event.target.value)}/>
}

export default AddTask;