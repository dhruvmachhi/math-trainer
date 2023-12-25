import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Board from "./Board"

import global from "../global.module.css"
import styles from "./MathGame.module.css"

let fadeTimeout;

function fade(className) {
    clearTimeout(fadeTimeout);
    document.querySelector("body").classList.add(className);
    fadeTimeout = setTimeout(() => document.querySelector("body").classList.remove(className), 400)
}

function MathGame({questionGenerator, condition, pageTitle}) {
    const [data, setData] = useState({});
    const [results, setResults] = useState({timer: 0, accuracy: 1, questions: 0}); // ! will not rerender during game because its not on screen. also wont be updated until AFTER game ends
    var totalAttempts = useRef(0);
    var wonAttempts = useRef(0);
    var question = useRef(0);

    function handleAnswer(ref) {
        totalAttempts.current++;
        if (condition(ref.current.innerText, data.question.numbers[0], data.question.numbers[1])) {
            ref.current.innerText = "";
            // ! workaround
            question.current++;
            setData({...data, progress: data.progress + 1, question: questionGenerator()});
            wonAttempts.current++;
            fade("right");
        } else {
            fade("wrong");
        }
        setResults({...results, accuracy: wonAttempts.current/totalAttempts.current});
    }

    function startGame() {
        question.current = 0;
        totalAttempts.current = 0;
        wonAttempts.current = 0;

        setData({
            progress: 1,
            question: questionGenerator()
        });
    }

    function exitGame() {
        setResults(results_ => ({...results_, questions: question.current}));
        // ! you need to get results using an argument because setState is async, the value doesnt actually change until rerender, so using the argument will get you an up to date value, to fix this, i just seperated the needed value away using useRef (use instead of mutateble variable because it has multiple versions of it per component), then updated that along with the state, idk maybe not the best way
        setData({});
    }

    return (
        <>
        { Object.keys(data) == 0 ?
            <div className={styles.stats}>
                <h1 className={global.header1}>{pageTitle}</h1>
                { results.timer != 0 &&
                    <>
                        <h3 className={styles.statlabel}><b>Time:</b> {`${results.timer/100}s`}</h3>
                        <h3 className={styles.statlabel}><b>Accuracy:</b> {Math.trunc(results.accuracy * 10000)/100}%</h3>    
                        <h3 className={styles.statlabel}><b>Correct Questions:</b> {results.questions}</h3>    
                        <h3 className={styles.statlabel}><b>Avg Time Per Question:</b> {Math.trunc(results.timer/results.questions)/100}s</h3>    
                    </>
                }
                <button onClick={startGame} className={`${global["main-buttons"]} ${styles["start-game"]}`}>Start</button>
                <Link to={"/"}>
                    <button className={`${global["main-buttons"]} ${styles["back"]}`}>Back</button>
                </Link>
            </div>
            :
            <Board {...data} setResults={setResults} results={results} handleAnswer={handleAnswer} exitGame={exitGame}/>
        }
        </>
    )
}

export default MathGame