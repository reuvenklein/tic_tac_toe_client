
import styles from './style.module.css'
import BackArrow from '../../components/BackArrow'
import LetterX from '../../components/LetterX'
import Circle from '../../components/Circle'
import Square from '../../components/Square'
import Rectangle from '../../components/Rectangle'
import Title from '../../components/Title'
import { useEffect, useState } from 'react'
import BoardWithPlayers from '../BoardWithPlayers'
import DataContext from '../../Context/DataContext';
import { useContext } from 'react'
import YellowButton from '../../components/YellowButton'
import JoinGame from '../JoinGame'

export default function ChoosePlayer({ socketIO, name, image, typeOfGame }) {

    const [shape, setShape] = useState("")
    const [game, setGame] = useState("")

    let color1 = 'lightblue'
    let size = '80px'
    let color2 = '#FCD015'
    let fontSize = '80px'

    const { setPage } = useContext(DataContext)

    function clickX() {
        setShape('X')
    }

    function clickCircle() {
        setShape('O')
    }

    function clicked() {
        socketIO.emit('start-game', { name, image, shape })
    }

    function clickBack() {
        setPage(<JoinGame name={name} image={image} typeOfGame={typeOfGame} />)
    }



    useEffect(() => {




        socketIO.on('game-details', (data) => {
            setGame(data)
            setPage(<BoardWithPlayers game={game} setGame={setGame} socketIO={socketIO} shape={shape} typeOfGame={typeOfGame} />)
        })



    }, [socketIO])

    return (
        <>

            <div>
                <div className={styles.arrow}>
                    <BackArrow clicked={clickBack} />
                </div>
                <div className={styles.choose}>
                    <Title content={'Choose Player'} />
                </div>


                <div className={styles.container}>
                    <Rectangle height='125px' width='250px' >
                        <div className={styles.rectangle}>

                            <div >

                                <Square clicked={clickX} backgroundColor={color1} content={<LetterX color={color2} fontSize={fontSize} />} />

                            </div>
                            <div >
                                <Square clicked={clickCircle} backgroundColor={color1} content={<Circle color={color2} size={size} />} />

                            </div>


                        </div>


                    </Rectangle>
                </div>
                <div className={styles.play}>
                    {shape ?
                        <YellowButton clicked={clicked} content={<h2>Let's play</h2>} height={'100px'} width={'200px'} />
                        :
                        <div></div>
                    }

                </div>
            </div>

        </>
    )
}