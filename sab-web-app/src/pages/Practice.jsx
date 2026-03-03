import React, { useState, useMemo } from "react";

const Practice = () => {
    const [count, setCount] = useState(0);

    const expensiveComputation = (num) => {
        console.log("Running expensive computation...");
        let result = 0;
        for (let i=0; i < 1000000000; i++) {
            result += num;
        }
        return result;
    }

    const memoizedValue = useMemo(()=> expensiveComputation(count), [count]);

    return (
        <div>
            <h2>Expensive Computation with useMemo</h2>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
            <p>Expensive Computation Result: {memoizedValue}</p>
        </div>
    );
}
export default Practice;