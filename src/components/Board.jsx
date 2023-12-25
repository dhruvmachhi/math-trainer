import { useRef, useEffect, useState } from "react"

import styles from "./Board.module.css"

import enterIcon from "../assets/enter.svg"
import clockIcon from "../assets/clock.svg"
import bullseyeIcon from "../assets/bullseye.svg"

function Board(props) {
    const answerElement = useRef();

    function handleChange(e) {
        const allowed = ["Backspace", "Enter", "-"];
        if (!isFinite(e.key) && !allowed.includes(e.key)) {
            e.preventDefault();
        }
        if (e.key === "Enter") {
            props.handleAnswer(answerElement);
            e.preventDefault();
        }
    }

    function handleESC(e) {
        if (e.key == "Escape") {
            props.exitGame();
        }
    } 

    useEffect(() => {
        const update = setInterval(() => {
            props.setResults(results => ({...results, timer: results.timer + 1 })) // ! you have to take in the previous state as an argument
        }, 10);
        
        document.addEventListener("keydown", handleESC);

        return () => {
            document.removeEventListener("keydown", handleESC);
            clearInterval(update);
        };
    }, [])
    // ! having empty dependencies only makes it run on first render, where specifying no dependencies makes it run on every render

    return (
        <div className={styles.game}>
            <p className={styles.progress}>Question {props.progress}</p>
            <div className={styles.question}>
                <span className={styles.symbol}>{props.question.symbol}</span>
                <div className={styles.numbers}>
                    <p>{props.question.numbers[0]}</p>
                    <p>{props.question.numbers[1]}</p>
                </div>
            </div>
            <hr />
            <div className={styles.answer}>
                <div className={styles.textbox} ref={answerElement} contentEditable data-ph="0" onPaste={(e) => e.preventDefault()} onKeyDown={handleChange}></div>
                <img className={styles.enter} src={enterIcon} />
            </div>
            <div className={styles.stats}>
                <span className={styles.time}>
                    <img src={clockIcon} />
                    <span className={styles.value}>{props.results.timer / 100}s</span>
                </span>
                <span className={styles.accuracy}>
                    <img src={bullseyeIcon} />
                    <span className={styles.value}>{Math.trunc(props.results.accuracy * 1000)/10}%</span>
                </span>
            </div>
            <p className={styles.exitnotice}>Press <b>ESC</b> to end game.</p>
        </div>
    )
}

export default Board