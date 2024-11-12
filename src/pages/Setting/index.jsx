import styles from './style.module.css'
import Rectangle from '../../components/Rectangle'
import ProfilePicture from '../../components/ProfilePicture'
import BackArrow from '../../components/BackArrow'
import { FaCheck } from "react-icons/fa";
import YellowButton from '../../components/YellowButton';
import DataContext from '../../Context/DataContext';
import { useContext, useState } from 'react'
import Menu from '../Menu';
import JoinGame from '../JoinGame';

export default function Setting({ typeOfGame }) {
    const { setPage } = useContext(DataContext)
    const [name, setName] = useState("")
    const [image, setImage] = useState("")

    function clicked() {

        setPage(<JoinGame name={name} image={image} typeOfGame={typeOfGame} />)
    }

    function clicked1(e) {
        setImage(e.target.src)


    }

    function click() {
        setPage(<Menu />)
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img className={styles.image} src="Logo.png" alt="ticTacToe"></img>

                </div>



                <Rectangle height='50px' width='250px' >
                    <div className={styles.text}>
                        <label>Your Name
                            <input type='text' id='text' onInput={(e) => setName(e.target.value)} ></input>
                        </label>
                    </div>
                </Rectangle>

                <h2 className={styles.avatar}>Choose Avatar</h2>
                <div className={styles.images}>
                    <ProfilePicture clicked={clicked1} imageSource={' man-police-officer-light-skin-tone.svg'} height={'70px'} width={'70px'} borderColor={'lightsalmon'} />
                    <ProfilePicture clicked={clicked1} imageSource={' man-office-worker.svg'} height={'70px'} width={'70px'} borderColor={'lightsalmon'} />
                    <ProfilePicture clicked={clicked1} imageSource={' woman-teacher-light-skin-tone.svg'} height={'70px'} width={'70px'} borderColor={'lightsalmon'} />
                </div>

                <div className={styles.icons}>
                    <BackArrow clicked={click} />
                    <YellowButton clicked={clicked} content={<div className={styles.icon}><FaCheck size={'30px'} /></div>} height={'60px'} width={'60px'} />

                </div>
            </div>




        </>
    )
}