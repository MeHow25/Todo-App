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

    return <div className="d-flex" style={{gap: 10 + 'px'}}>
        <div className="flex-grow-1">
            <input
                type="text"
                className="form-control my-2 py-3"
                disabled={inputDisabled}
                placeholder="Add Task"
                value={value}
                onKeyPress={event => handleSubmit(event)}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    </div>;
}

export default AddTask;