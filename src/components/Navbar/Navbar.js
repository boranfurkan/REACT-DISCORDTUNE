import styles from "./Navbar.module.css"
function Navbar() {
    return (
        <div className={styles.Navbar}>
            <div className={styles.Logo}>
                <h2>DISCORDTUNES</h2>
            </div>
            <div className={styles.Items}>
                <h3>Create List</h3>
                <h3>Lists</h3>
                <h3>Contact</h3>
            </div>
        </div>)
}

export default Navbar