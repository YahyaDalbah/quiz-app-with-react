import React, { useEffect, useMemo, useRef } from "react";
import Question from "./question";
import {nanoid} from "nanoid"
import { useState } from "react";
import he from "he"

export default function App(){
    const [questionsArray,setQuestionsArray] = useState([])
    const [holdedanswers, sethold] = useState([])
    function getquestions(){
        fetch("https://opentdb.com/api.php?amount=5&type=multiple").then(res => res.json()).then(data => data.results).then(questions => {
            const arr = questions.map(q => {
                let answers = shuffle([...q.incorrect_answers, q.correct_answer])
                return {
                    ...q,
                    answers
                }
            })
            return setQuestionsArray(arr)
        })
        sethold([])
    }
    
    const [start,setstart] = React.useState(true)
    const [check, setcheck] = useState(false)
    const numOfCorrectAnswers = useRef(0)

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const questionObj = questionsArray.map((q,i) => 
        <Question 
            key={nanoid()}  
            id={i}
            question={he.decode(q.question)}
            answers={(q.answers.map(inc => he.decode(inc)))}
            correctanswer={he.decode(q.correct_answer)}
            checkanswers = {checkanswers}
            check = {check}
            holdedanswers = {holdedanswers}
        />
    )
    function checkanswers(answer, correctanswer){
        if(answer && answer === correctanswer){
           numOfCorrectAnswers.current = numOfCorrectAnswers.current + 1
        }
        
    }
    function showresult(){
        setcheck(prev => !prev)
        if(check){
            numOfCorrectAnswers.current = 0
        }
        
    }
    
    
    function startquiz(){
        setstart(false)
        getquestions()
    }
    
    

    return(
        <main>
            {start ? <div className="start-menu">
                <h1 className="start-title">Quizzicle</h1>
                <button onClick={startquiz} className="btn">Start quiz</button>
            </div> : <section>
                    {questionObj} 
                    <div className="checkedDiv">
                        {!check ? <button onClick={() => {
                            checkanswers()
                            showresult()
                        }} className="btn check-btn play-again-btn">check answers</button> : <button onClick={() => {
                            getquestions(); 
                            checkanswers()
                            showresult()
                        }} className="btn check-btn play-again-btn">play again</button>}
                        
                        {check && <h1>you scored {numOfCorrectAnswers.current}/5</h1>}
                    </div>
                    
                    
                </section>}
        </main>
    )
}