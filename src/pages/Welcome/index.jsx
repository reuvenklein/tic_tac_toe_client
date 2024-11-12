import styles from './style.module.css'
import Setting from '../Setting'
import Menu from '../Menu'
import { useEffect } from 'react'
import DataContext from '../../Context/DataContext'
import { useContext } from 'react'


export default function Welcome() {
    const { setPage } = useContext(DataContext)
    useEffect(() => {
        setTimeout(() => {
            setPage(<Menu />);

        }, 3000);
    }, [])

    return (
        <>

            <div className={styles.logo}>
                <img className={styles.image} src="Logo.png" alt="ticTacToe"></img>

            </div>





        </>
    )
}


