import styles from './timer.module.css'

export function Timer({timeLeft}){
    return (
        <div className={styles.timer}>
            {timeLeft} s
        </div>
    )
}