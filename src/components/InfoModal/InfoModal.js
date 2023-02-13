import styles from './InfoModal.module.css';

function InfoModal({ title, message, onConfirm, onCancel }) {
    return (
        <div>
            <div className={styles.Backdrop} onClick={onCancel} />
            <div className={styles.ModalBackground}>
                <div className={styles.Wraper}>
                    <div className={styles.Messages}>
                        <h3>{title.toUpperCase()}</h3>
                        <p>{message}</p>
                    </div>
                    <div className={styles.Buttons}>
                        <button onClick={onCancel}>Cancel</button>
                        <button onClick={onConfirm}>Okay</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;