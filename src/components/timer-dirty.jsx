import { useEffect, useState } from "react"
import "../../src/index.css"

export default function TimerDirty() {

    const [count, setCount] = useState(0)
    const [cps, setCps] = useState(1);

    const handleBtn = () => {
       useEffect(() => {
        setInterval(() => {
            setCount((currentCount) => {currentCount + 1})
        }, 1000);
       }, [])
    }

     return (<>
        <p>Cookie Clicker</p>
        <button onClick={handleBtn} >Cookie Click</button> 
        <p>Count: {count}</p>
     </>)
}