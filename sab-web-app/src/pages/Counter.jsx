import React, { useMemo, useCallback, useState } from "react";

/*
Interview Answer (Best)

useMemo is a React Hook used to memoize expensive calculations and prevent unnecessary recalculations. 
It improves performance by recomputing value only when dependencies change.

Interview Short Answer

useCallback is a React Hook used to memoize functions and prevent unnecessary re-creation of functions during 
re-render, improving performance.

Difference: useMemo vs useCallback
useMemo			useCallback
Memoizes value	Memoizes function
Returns value	Returns function
*/
const users = ["Suman", "Sandhya", "Sanvy", "Hanvy"];
const Counter = () => {
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = useState("");


  // Expensive function
  const expensiveCount = (num) => {
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += num;
    }
    return result;
  };

  // useMemo to cache expensive calculation
  const counterValue = useMemo(() => expensiveCount(count), [count]);

  // useMemo to filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  // useCallback to memoize function
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <>
      <div>Counter: {count}</div>
      <div>Counter Value: {counterValue}</div>

      <button onClick={handleClick}>Increment Count</button>

      <div>
        <p>Search Text: {searchText}</p>

        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {filteredUsers.map((user, index) => (
          <p key={index}>{user}</p>
        ))}
      </div>
    </>
  );
};

export default Counter;