import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
   const [login, setlogein] = useState(false);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count+10)}>+</button>
      <button onClick={() => setCount(count+10)}>change</button>
    </div>
  );
}