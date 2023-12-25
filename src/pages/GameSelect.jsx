import GameButton from "../components/GameButton"
import { faPlus, faMultiply } from '@fortawesome/free-solid-svg-icons'

import global from '../global.module.css'
import styles from './GameSelect.module.css'

function GameSelect() {
    return (
        <>
            <h1 className={global.header1}>Math Practice</h1>
            <h3 className={global.header3}>Click a button to get started.</h3>
            <div className={styles["game-buttons"]}>
                <GameButton icon={ faPlus } destination={"/add"} />
                <GameButton icon={ faMultiply } destination={"/multiply"} />
            </div>
        </>
    )
}

export default GameSelect