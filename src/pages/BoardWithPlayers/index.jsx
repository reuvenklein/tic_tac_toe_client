import styles from './style.module.css'
import { useState, useEffect } from 'react'
import React from "react";
import Circle from '../../components/Circle';
import YellowButton from '../../components/YellowButton';
import ProfilePicture from '../../components/ProfilePicture';
import LetterX from '../../components/LetterX';
import Menu from '../Menu';
import DataContext from '../../Context/DataContext';
import { useContext } from 'react'




export default function BoardWithPlayers({ game, setGame, socketIO, typeOfGame }) {
    const { setPage } = useContext(DataContext)
    const [currentPlayer1, setCurrentPlayer1] = useState("player1")
    const [board, setBoard] = useState(Array.from({ length: 9 }))
    const [win, setWin] = useState(false)
    const [tie, setTie] = useState(false)
    const [player, setPlayer] = useState("")
    const [data, setData] = useState("")
    let size = '50px',
        color = '#FCD015',
        fontSize = '50px',
        Player = "",
        size1 = '30px',
        fontSize1 = '30px',
        secondPlayer = "",
        squareNumber


    //if player clicks on play again button,'play-again' event is emitted,which clears the board, so players could play again.
    function clickPlayAgain() {
        setCurrentPlayer1('player2')
        socketIO.emit('play-again')
    }
    //if player clicks the back to main button,the 'back-main' event is emitted,which takes user back to the menu.
    function clickMain() {
        socketIO.emit('back-main')

    }

    function clickBack() {
        setCurrentPlayer1('player2')
        socketIO.emit('play-again')
    }



    function clicked(e) {
        //if nobody won yet, setting "squareNumber" to the square that was clicked on
        //and if that square is empty,emitting the move event. 
        if (!win) {

            squareNumber = e.target.id
            let number = Number(squareNumber)


            if (!(board[number])) {
                secondPlayer = ""
                socketIO.emit('move', { currentPlayer1, squareNumber, typeOfGame, secondPlayer })


            }
        }

    }

    useEffect(() => {

        socketIO.on('back', () => {
            setPage(<Menu />)
        })

        socketIO.on('game-status', (data) => {
            setBoard(data["board"])
            setData(data)



            setPlayer(data[data.currentPlayer]["name"])
            if (data["status"]) {
                if (data["status"] == 'win') {

                    setWin(true)
                }
                else {
                    setTie(true)
                }
            }
            else {
                setWin(false)
                setTie(false)
            }



            Player = data.currentPlayer == 'player1' ? 'player2' : 'player1'
            setCurrentPlayer1(Player)
            if (typeOfGame == 'onePlayer' && data.currentPlayer == 'player1' && data["status"] != 'win') {
                secondPlayer = 'player2'
                squareNumber = data["index"]
                socketIO.emit('move', { currentPlayer1, squareNumber, typeOfGame, secondPlayer })

            }

        })


    }, [socketIO])


    return (
        <>
            <div>

                {win ?
                    <>
                        <div className={styles.players} >
                            <div>
                                <ProfilePicture imageSource={data[data.currentPlayer]["avatar"]} height={'70px'} width={'70px'} borderColor={'lightsalmon'} />
                                <div className={styles.wins}>
                                    {data[data.currentPlayer]["shape"] == 'O' ? <Circle color={color} size={size1} />
                                        :
                                        <LetterX color={color} fontSize={fontSize1} />
                                    }
                                    <h3>{`Wins: ${data[data.currentPlayer]["numberOfWins"]}`}</h3>
                                </div>
                                {data[data.currentPlayer]["name"]}
                            </div>
                            <div className={styles.winner}>
                                <h1>{`${player} wins!!`}</h1>
                            </div>
                        </div>
                    </>

                    :
                    data ?
                        <div className={styles.players}>
                            <div>
                                <ProfilePicture imageSource={data["player1"]["avatar"]} height={'70px'} width={'70px'} borderColor={'lightsalmon'} />
                                <div className={styles.wins}>
                                    {data["player1"]["shape"] == 'O' ? <Circle color={color} size={size1} />
                                        :
                                        <LetterX color={color} fontSize={fontSize1} />
                                    }
                                    <h3>{`Wins: ${data["player1"]["numberOfWins"]}`}</h3>
                                </div>
                                {data["player1"]["name"]}
                            </div>

                            <div>
                                <ProfilePicture imageSource={data["player2"]["avatar"]} height={'70px'} width={'70px'} borderColor={'lightsalmon'} />
                                <div className={styles.wins}>
                                    {data["player2"]["shape"] == 'O' ? <Circle color={color} size={size1} />
                                        :
                                        <LetterX color={color} fontSize={fontSize1} />
                                    }
                                    <h3>{`Wins: ${data["player2"]["numberOfWins"]}`}</h3>
                                </div>
                                {data["player2"]["name"]}
                            </div>
                        </div>
                        :
                        <div></div>
                }
            </div>
            <div className={styles.board}>


                {board.map((v, i) =>


                    <button key={i} id={i} onClick={clicked} className={styles.box}>{!v ? "" : v == 'X' ? <LetterX color={color} fontSize={fontSize} /> : <Circle color={color} size={size} />} </button>


                )

                }
            </div>

            <div className={styles.win}>
                {win || tie ?
                    <>
                        <YellowButton clicked={clickPlayAgain} content={<h2>Play Again</h2>} height={'100px'} width={'300px'} />
                        <YellowButton clicked={clickMain} content={<h2>Back To Main</h2>} height={'100px'} width={'300px'} />

                    </>
                    :
                    <YellowButton clicked={clickBack} content={<h2>Back</h2>} height={'100px'} width={'180px'} />
                }

            </div>

        </>

    )

}