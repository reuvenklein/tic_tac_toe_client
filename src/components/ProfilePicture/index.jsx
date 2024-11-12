import styles from './style.module.css'


export default function ProfilePicture({ imageSource, width, height, borderColor, clicked = () => { return; } }) {


    return (
        <>

            <div>

                <img className={styles.image} onClick={clicked} src={imageSource} alt="person" style={{ height: height, width: width, borderColor: borderColor }}></img>
            </div>


        </>
    )
}