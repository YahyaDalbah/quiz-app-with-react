import React, {useRef, useState} from "react";

export default function Question({question,incorrectanswers,correctanswer,getquestions}){
    const answers = [...incorrectanswers,correctanswer]
    const [shuffledanswers,setshuffledanswers] = useState(shuffle(answers))
    const [holdedanswer,setholdedanswer] = useState(null)
    const haspickedanswer = holdedanswer !== null
    const [check,setcheck] = React.useState(false)
    const numOfCorrectAnswers = React.useRef(0)

    function checkanswers(answer, correctanswer){
        
        if(answer && answer === correctanswer){
           numOfCorrectAnswers.current = numOfCorrectAnswers.current + 1
        }
        console.log(answer,correctanswer)

    }
    function showresult(){
        setcheck(prev => !prev)
        if(check){
            numOfCorrectAnswers.current = 0
        }
    }

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

    const displayedAnswers = shuffledanswers.map((answer,i) => {
        let className = "answer-btn"
        
        if(check && answer === correctanswer){
            className += " correct-answer"
        }
        if(answer === holdedanswer){
            className += " picked"
            if(check && answer !== correctanswer){
                className +=" incorrect-answer"
            }
        }
        return <button 
        key={i}
        disabled={check || haspickedanswer}
        onClick={holdanswer}
        className={className}>{answer}</button>}
    )

    function holdanswer(e){
        const playerAnswer = e.target.innerHTML
        setholdedanswer(playerAnswer)
        checkanswers(playerAnswer,correctanswer)
    }



    return (
       <div className="question">
        <h1 style={{fontSize:"30px"}}>{question}</h1>
        <div className="form">
            {displayedAnswers}
        </div>
        
        <button onClick={() => {
                         
                        checkanswers()
                        showresult()
                    }} disabled={check} className="btn check-btn">{"check answer"}</button>
                    <h1 className="play-again-h1">{check && `u scored ${numOfCorrectAnswers.current}/1`}</h1>
       <hr />
       </div>
    )
}