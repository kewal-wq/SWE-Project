import React from "react";
import { AutoComplete, Input } from "antd";

const SearchBar = ({inputValue, options, onSelect, onChange, enterButton, placeholder, width, handleSearch}) => {
    
    return (
        <div>
          <AutoComplete
        value={inputValue}
        options={options}
        autoFocus={true}
        style={{ width: width }}
        onSelect={onSelect}
        onChange={onChange}
        // onSearch={handleSearch ? handleSearch : null}
      >
         <Input.Search size="large" placeholder={placeholder} enterButton={enterButton} onSearch={handleSearch}/>
        </AutoComplete>
        </div>
    )
}

export default SearchBar;