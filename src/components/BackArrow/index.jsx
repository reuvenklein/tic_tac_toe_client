import YellowButton from '../YellowButton';
import styles from './style.module.css'
import { RiArrowGoBackFill } from "react-icons/ri";


export default function BackArrow({ clicked }) {

    let height = '60px'
    let width = '60px'

    return (
        <>

            <div >

                <YellowButton clicked={clicked} content={<div className={styles.icon}><RiArrowGoBackFill size={'30px'} /></div>} height={height} width={width} />

            </div>


        </>
    )
}