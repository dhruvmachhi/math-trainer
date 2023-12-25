import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import global from "../global.module.css"
import styles from "./GameButton.module.css"

function GameButton({icon, destination, className}) {
    return (
        <Link to={destination}>
            <button className={`${global["main-buttons"]} ${styles.button} ${className}`}>
                <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
            </button>
        </Link>
    )
}

export default GameButton