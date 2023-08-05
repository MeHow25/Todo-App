import React from "react";

function ClearAllButton({onClearAllClick}) {
    return <a onClick={onClearAllClick} className="btn btn-primary my-2">Clear All</a>
}

export default ClearAllButton;
