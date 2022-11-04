import React from "react";
const { useState } = React;

const Searchbar = (props) => {
  const {onSearch} = props;
  const [search, setSearch] = useState("");


  const onChange = (evt) => {
    setSearch(evt.target.value);
    if(evt.target.value.length === 0) {
      setSearch(null);
    }
  };

  const onClick = async (evt) => {
    onSearch(search);
  };

  return (
    <div className="searchbar-container">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <div className="searchbar">
        <input onChange={onChange}></input>
      </div>
      <div className="searchbar-btn">
        <button onClick={onClick}>
        <span class="material-symbols-outlined">
search
</span>
        </button>
      </div>      
    </div>
  );
};

export default Searchbar;
