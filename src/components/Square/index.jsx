import styles from './style.module.css'


export default function Square({ backgroundColor, content, clicked }) {


    return (
        <>

            <button onClick={clicked} className={styles.square} style={{ backgroundColor: backgroundColor }}>
                {content}
            </button>


        </>
    )
}