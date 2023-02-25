import React, {useState} from "react";

export default function Question({question,answers,correctanswer, checkanswers, check, holdedanswers}){
    const [holdedanswer, setHoldedanswer] = useState(null)
    const haspickedanswer = holdedanswer !== null
    
    console.log(holdedanswers)

    const displayedAnswers = answers.map((answer,i) => {
        let className = "answer-btn"
        
        if(check && answer === correctanswer){
            className += " correct-answer"
        }
        if(holdedanswers.includes(answer)){
            className += " picked"
            if(check && answer !== correctanswer){
                className += " incorrect-answer"
            }
        }
        return <button 
        key={i}
        disabled={check || haspickedanswer}
        onClick={e => holdanswer(e)}
        className={className}>{answer}</button>}
    )

    function holdanswer(e){
        const playerAnswer = e.target.innerHTML
        setHoldedanswer(playerAnswer)
        holdedanswers.push(playerAnswer)
        checkanswers(playerAnswer,correctanswer)
    }



    return (
       <div className="question">
        <h1 style={{fontSize:"30px"}}>{question}</h1>
        <div className="form">
            {displayedAnswers}
        </div>
        <br />
       <hr />
       </div>
    )
}