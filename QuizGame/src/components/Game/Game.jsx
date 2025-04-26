import styles from './game.module.css'
import { Timer } from '../Timer'
import qustionsData from '../../data/questions.json'
import { useState, useEffect} from 'react'

export function Game({config, onRestart}){
    const [question, setQuestion] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [answers, setAnswers] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [timeLeft, setTimeLeft] = useState(config.timeLimit)

    useEffect(() => {
        const shuffled = config.shuffle
          ? [...qustionsData].sort(() => Math.random() - 0.5)
          : qustionsData;
      
        setQuestion(shuffled);
      }, [config]);
      
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [timeLeft])

    useEffect(() => {
        if (timeLeft === 0) {
            handleNextQuestion()
        }
    }, [timeLeft])

    useEffect(() => {
        if(showResult){
            saveScore(config.name, score)
        }
    }, [showResult, config.name, score])

    const getStoredScores = () => {
        return JSON.parse(localStorage.getItem('quizScores')) || {}
    }


    if (question.length === 0) {
        return <p>Se încarcă întrebările...</p>
    }

    const current = question[currentIndex]

    const handleAnswer = (option) => {
        setSelectedAnswer(option)

        setAnswers(prev => [...prev,{
            question: current.question,
            correct: current.correctOption,
            given: option
        }])

        if(option === current.correctOption){
            setScore((prev) => prev + 1)
        }

        setTimeout(handleNextQuestion, 100)
    }

    const handleNextQuestion = () => {
        if (currentIndex + 1 < question.length){
            setCurrentIndex((i) => i + 1)
            setSelectedAnswer(null)
            setTimeLeft(config.timeLimit)
        } else {
            setShowResult(true)
        }
    }

    const saveScore = (name, newScore) => {
        const storedScore = JSON.parse(localStorage.getItem('quizScores')) || {}

        if (!storedScore[name] || newScore > storedScore[name]){
            storedScore[name] = newScore
            localStorage.setItem('quizScores', JSON.stringify(storedScore))
        }
    }

    if(showResult){
        return <>
            <div className={styles.resultShow}>
                <p>{config.name}, ai acumulat - {score} puncte!</p>
                <button onClick={onRestart} className={styles.restartBtn}>Joc nou</button>
            </div>

            <div className={styles.answersList}>
            <h3>Răspunsuri oferite:</h3>
            {answers.map((a, index) => (
                <div key={index} className={styles.answerBox}>
                    <p>{a.question}</p>
                    {a.given === a.correct ? (
                        <p className={styles.correct}><strong>Corect:</strong> {a.correct}</p>
                    ) : (
                        <>
                            <p className={styles.incorrect}><strong>Greșit:</strong> {a.given}</p>
                            <p className={styles.correct}><strong>Corect:</strong> {a.correct}</p>
                        </>
                    )}
                </div>
            ))}
            </div>

            <div className={styles.scoreTable}>
                <p>Clasament</p>
                    <table>
                        <tr>
                            <th>Nume</th>
                            <th>Scor</th>
                        </tr>
                        {Object.entries(getStoredScores()).map(([name, score]) => (
                            <tr key = {name}>
                                <td>{name}</td>
                                <td>{score}</td>
                            </tr>)
                        )}
                    </table>
            </div>
            </>
    }

    return <>
    <div className={styles.container}>
        <div className={styles.infoQuestion}>
            <p>{current.category}</p> <p>{current.difficulty}</p> <p><Timer timeLeft={timeLeft}/></p>
        </div>

        <div className={styles.questionData}>
            <p>{current.question}</p>
            <div className={styles.optionsQuestion}>
                {current.options.map((opt, index) => {
                    return(
                        <button 
                            key={index}
                            className={styles.optionBtn}
                            onClick={() => handleAnswer(opt)}
                        >{opt}</button>
                    )
                })
                }
            </div>
        </div>
    </div>
    </>
}