import styles from './style.module.css'
import { VscCircleLarge } from "react-icons/vsc";


export default function Circle({ color, size }) {


    return (
        <>

            <div>

                <div><VscCircleLarge size={size} color={color} /></div>
            </div>


        </>
    )
}