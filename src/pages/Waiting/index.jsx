import styles from './style.module.css'
import BackArrow from '../../components/BackArrow'
import Rectangle from '../../components/Rectangle'
import { useState, useEffect } from 'react'
import ChoosePlayer from '../ChoosePlayer';
import { Socket } from 'socket.io-client';
import DataContext from '../../Context/DataContext';
import { useContext } from 'react'
import Loader from '../../components/Loader';
import JoinGame from '../JoinGame';



export default function Waiting({ socketIO, name, image, typeOfGame }) {

    const { setPage } = useContext(DataContext)


    const [code, setCode] = useState(false)
    const [awaiting, setAwaiting] = useState(false)
    let number

    function click() {
        setPage(<JoinGame name={name} image={image} typeOfGame={typeOfGame} />)
    }

    useEffect(() => {


        socketIO.on('awaiting', (data) => {
            setCode(data.number)
            number = data.number
            let player1Id = data.idPlayer1

            data.data == 'twoPlayers' ?
                setAwaiting(true)
                :
                name = 'Computer'
            socketIO.emit('join-game', { player1Id, number, name, image })


        })



        socketIO.on('found-player', () => {
            setPage(<ChoosePlayer socketIO={socketIO} name={name} image={image} typeOfGame={typeOfGame} />)


        })

    }, [socketIO])



    return (
        <>

            <div>
                <div className={styles.arrow}>
                    <BackArrow clicked={click} />
                </div>
                <div className={styles.container}>
                    <Rectangle height='70px' width='150px' >
                        <div className={styles.text}>
                            <h3 className={styles.code}>Your Code</h3>
                            <h1>{code}</h1>
                        </div>
                    </Rectangle>
                    {typeOfGame == 'onePlayer' ?
                        setPage(<ChoosePlayer socketIO={socketIO} name={name} image={image} typeOfGame={typeOfGame} />)
                        :
                        <>

                            {awaiting ?
                                <>
                                    <Loader />
                                    <h3 className={styles.opponent}>Waiting For Opponent</h3>
                                </>
                                : <div></div>
                            }
                        </>
                    }

                </div>
            </div>





        </>
    )
}