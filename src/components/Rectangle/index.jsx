

import styles from './style.module.css'


export default function Rectangle(props) {


    return (
        <>
            <div style={{ height: props.height, width: props.width }} className={styles.container}>
                {props.children}
            </div>
        </>
    )
}