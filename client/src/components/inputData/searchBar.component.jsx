import React from "react";
import { AutoComplete, Input } from "antd";

const SearchBar = ({inputValue, options, onSelect, onChange}) => {
    
    return (
        <div>
          <AutoComplete
        value={inputValue}
        options={options}
        autoFocus={true}
        style={{ width: 200 }}
        onSelect={onSelect}
        onChange={onChange}
      >
         <Input.Search size="large" placeholder="search by location" enterButton />
        </AutoComplete>
        </div>
    )
}

export default SearchBar;