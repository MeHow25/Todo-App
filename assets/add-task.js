import React, {useState} from "react";

function AddTask() {
    const [value, setValue] = useState("");
    const [inputDisabled, setInputDisabled] = useState(false);

    function handleSubmit(event) {
        if (event.key === "Enter") {
            setInputDisabled(true);
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
                setInputDisabled(false);
            });
        }
    }

    return <input
        type="text"
        disabled={inputDisabled}
        placeholder="Add Task"
        value={value}
        onKeyPress={event => handleSubmit(event)}
        onChange={event => setValue(event.target.value)}
    />
}

export default AddTask;