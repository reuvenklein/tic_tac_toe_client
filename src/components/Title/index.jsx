import styles from './style.module.css'


export default function Title({ content }) {


    return (
        <>
            <div className={styles.container}>
                <h1>{content}</h1>
            </div>
        </>
    )
}