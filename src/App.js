import React from "react";
import Question from "./question";
import {nanoid} from "nanoid"
import { useState } from "react";
import he from "he"

export default function App(){
    const [questionsArray,setQuestionsArray] = React.useState([])
    function getquestions(){
        fetch("https://opentdb.com/api.php?amount=5&type=multiple").then(res => res.json()).then(data => setQuestionsArray(data.results))
    }
    const [start,setstart] = React.useState(true)
    const [check,setcheck] = React.useState(false)
    const numOfCorrectAnswers = React.useRef(0)

    
        
    

    const questionObj = React.useMemo(()=>questionsArray.map((q,i) => {
        
        return <Question 
        key={nanoid()}
        id={i}
        question={he.decode(q.question)}
        incorrectanswers={(q.incorrect_answers.map(inc => he.decode(inc)))}
        correctanswer= {he.decode(q.correct_answer)}
        getquestions={getquestions}
    />}),[check,questionsArray])
    
    
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
                    
                    <button onClick={() => {
                        getquestions(); 
                        checkanswers()
                        showresult()
                    }} className="btn check-btn play-again-btn">{"play again"}</button>
                    
                </section>}
        </main>
    )
}