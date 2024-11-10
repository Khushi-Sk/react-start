import { useEffect, useState } from "react"
import "../App.css";

export default function TimerClean() {
    console.log("TimerClean component render");
    const [count, setCount] = useState(0)
    const [cps, setCps] = useState(1);

    useEffect(() => {
        console.log("TimerClean component useEffect callback");
        const interval = setInterval(() => {
            setCount((currentCount) => currentCount + cps)
        }, 1000);

        return () => {
            console.log("TimerClean component useEffect cleanup");
            clearInterval(interval);
        };               // finding this very weird, it clears itself and runs again
    }, [cps]);

     return count
}