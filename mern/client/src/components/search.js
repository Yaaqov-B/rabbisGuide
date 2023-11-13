import React, { useState } from "react";

const SearchBox = (props) => {
    return (
        <input
            type="text"
            placeholder="חפש..."
            value={props.value}
            onChange={props.onChange}
        />
    );
};

export default SearchBox;