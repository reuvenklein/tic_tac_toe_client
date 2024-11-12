
import styles from './style.module.css'
import BackArrow from '../../components/BackArrow'
import YellowButton from '../../components/YellowButton'
import Title from '../../components/Title'
import Rectangle from '../../components/Rectangle'
import DataContext from '../../Context/DataContext'
import { useContext, useState, useEffect } from 'react'
import Waiting from '../Waiting'
import WaitingJoin from '../WaitingJoin'
import { io } from 'socket.io-client'
import Setting from '../Setting'

export default function JoinGame({ image, name, typeOfGame }) {
    const [id, setId] = useState(io())
    const [socketIO, setSocketIO] = useState(io())


    useEffect(() => {
        const socket = io('http://localhost:2000', {

        })



        setSocketIO(socket)
    }, [])


    const { setPage } = useContext(DataContext)



    let content1 = 'join'
    let height1 = '50px'
    let width1 = '100px'
    let height2 = '100px'
    let width2 = '300px'
    let content2 = 'Create A Game'

    function clicked1() {

        socketIO.emit('join-game', { id, name, image })
        setPage(<WaitingJoin socketIO={socketIO} name={name} image={image} typeOfGame={typeOfGame} />)


    }

    function clicked2() {
        socketIO.emit('Create-Game', typeOfGame)


        setPage(<Waiting socketIO={socketIO} name={name} image={image} typeOfGame={typeOfGame} />)

    }

    function click() {
        setPage(<Setting typeOfGame={typeOfGame} />)
    }

    return (
        <>

            <div>

                <div className={styles.arrow}>
                    <BackArrow clicked={click} />
                </div>

                <div className={styles.join}>
                    {typeOfGame == 'twoPlayers' ?
                        <>
                            <Title content={'Join To A Game'} />

                            <Rectangle height='50px' width='250px' >
                                <input type='text' placeholder='enter code game' onInput={(e) => setId(e.target.value)}></input>
                            </Rectangle>


                            <YellowButton clicked={clicked1} content={<h2>{content1}</h2>} height={height1} width={width1} />
                            <div className={styles.lines}>
                                <div className={styles.line}></div>
                                <div className={styles.or}> <h1 >OR</h1></div>
                                <div className={styles.line}></div>
                            </div>
                            <YellowButton clicked={clicked2} content={<h2>{content2}</h2>} height={height2} width={width2} />
                        </>
                        :
                        <YellowButton clicked={clicked2} content={<h2>{content2}</h2>} height={height2} width={width2} />

                    }
                </div>




            </div>


        </>
    )
}