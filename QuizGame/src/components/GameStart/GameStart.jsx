import styles from './gameStart.module.css'
import { useState } from 'react'

export function GameStart({onStartGame}){

    const [name, setName] = useState('')
    const [shuffle, setShuffle] = useState(false)
    const [timeLimit, setTimeLimit] = useState(10)

    const handleSubmit = () => {
        if(name){
            onStartGame({name, shuffle, timeLimit: Number(timeLimit)})
        } else{
            alert('Introdu un nume te rog!')
        }
    }

    return(
        <>
        <div className={styles.welcome}>
            <h1>Bine ai venit la QuizGame</h1>
            <div className={styles.userInput}>
                <label className={styles.labelStart} htmlFor="nume">Introdu numele</label>
                <input className={styles.inputStart} id='nume' name='nume' type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className={styles.userOptions}>
                <div>
                    <p className={styles.paragrafOrg}>Organizare aleatorie</p>
                    <label htmlFor="shuffleDa">
                        <input type="radio" name="shuffleQuestions" id="shuffleDa" value='da' onChange={() => setShuffle(true)}/>
                        Da
                    </label>
                    <label htmlFor="da">
                        <input type="radio" name="shuffleQuestions" id="shuffleNu" value='nu' onChange={() => setShuffle(false)} />
                        Nu
                    </label>
                </div>

                <div className={styles.alegereQuestion}>
                    <label htmlFor="timer">Timp per întrebare</label>
                    <select name="timer" id="timer" value={timeLimit} onChange={(e) =>setTimeLimit(e.target.value)}>
                        <option value={10} defaultValue={10}>10s</option>
                        <option value={20}>20s</option>
                        <option value={30}>30s</option>
                    </select>
                </div>
            </div>
            <button className={styles.butonStart} onClick={handleSubmit}>Start joc</button>
        </div>
        </>
    )
}