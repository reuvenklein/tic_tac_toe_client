import styles from './style.module.css'
import BackArrow from '../../components/BackArrow'
import Rectangle from '../../components/Rectangle'
import { useEffect, useState, useContext } from 'react'
import BoardWithPlayers from '../BoardWithPlayers'
import DataContext from '../../Context/DataContext'
import Loader from '../../components/Loader'
import JoinGame from '../JoinGame'



export default function WaitingJoin({ socketIO, name, image, typeOfGame }) {
    const { setPage } = useContext(DataContext)
    const [roomExists, setRoomExists] = useState("")
    const [game1, setGame1] = useState("")

    function click() {
        setPage(<JoinGame name={name} image={image} typeOfGame={typeOfGame} />)
    }

    useEffect(() => {

        socketIO.on('status-join', (data) => {
            if (data) {
                console.log(data)
                setRoomExists(true)
            }
            else {
                setRoomExists(false)
            }
        })
        socketIO.on('game-details', (data) => {
            setGame1(data)
            setPage(<BoardWithPlayers game={game1} setGame={setGame1} socketIO={socketIO} typeOfGame={typeOfGame} />)
        })






    }, [socketIO])

    return (
        <>

            <div>
                <div className={styles.arrow}>
                    <BackArrow clicked={click} />
                </div>
                <div className={styles.container}>
                    {roomExists ?
                        <>
                            <Loader />
                            <h3>waiting to join The Game</h3>
                        </>
                        :
                        <h1>Room does not exist</h1>
                    }
                </div>

            </div>

        </>
    )
}