import styles from './style.module.css'
import { IoSettingsOutline } from "react-icons/io5";
import YellowButton from '../../components/YellowButton';
import DataContext from '../../Context/DataContext';
import { useContext, useState } from 'react'
import JoinGame from '../JoinGame';
import ChoosePlayer from '../ChoosePlayer';
import Setting from '../Setting';

export default function Menu() {

    const [typeOfGame, setTypeOfGame] = useState("")

    const { setPage } = useContext(DataContext)

    let content1 = 'Play Solo', content2 = 'Play With A Friend', height = '100px', width = '300px', height1 = '60px', width1 = '60px'

    function clickedFriend() {
        setTypeOfGame('twoPlayers')
    }
    function clickedSolo() {
        setTypeOfGame('onePlayer')
    }

    function clickedSettings() {
        setPage(<Setting typeOfGame={typeOfGame} />)
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.buttons} >
                    <YellowButton clicked={clickedSolo} content={content1} height={height} width={width} />
                    <YellowButton clicked={clickedFriend} content={content2} height={height} width={width} />
                </div>
                <div >
                    <YellowButton clicked={clickedSettings} content={<IoSettingsOutline />} height={height1} width={width1} />

                </div>

            </div>

        </>
    )
}
