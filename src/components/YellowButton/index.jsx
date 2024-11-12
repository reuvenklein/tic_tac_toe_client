import styles from './style.module.css'


export default function YellowButton({ content, height, width, clicked }) {


    return (
        <>

            <div >
                <button onClick={clicked} className={styles.btn} style={{ height: height, width: width }}>{content}</button>

            </div>


        </>
    )
}