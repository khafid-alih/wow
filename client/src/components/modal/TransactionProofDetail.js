import {
    Button,
    Modal,
} from "react-bootstrap"

const TransactionProofDetail = (props) => {
    const styles = {
        modalMainSize : {
            width : "416px",
            marginLeft : "37%",
        },
        modalBody : {
            padding : "40px 33px 20px 33px",
        },
        modalheading : {
            fontWeight : "700",
            fontSize : "36px",
            marginBottom : "30px",
        },
        buttonNo : {
            width: '135px',
            backgroundColor : "#D60000",
            color : "#FFFFFF",
            border : "none"
        }
    }

    return (
        <>
            <Modal
            show={props.show} 
            onHide={props.handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            // style={styles.modalMainSize}
            size="md"
            centered
            >
            <Modal.Body>
                <div style={styles.modalBody}>
                    <h4 style={styles.modalheading}>Transfer Proof Image</h4>
                    <div className="d-flex justify-content-center">
                        <img src={props.image} />
                    </div>
                    <div className="text-end mt-5">
                        <Button onClick={props.handleClose} style={styles.buttonNo}>Close</Button>
                    </div>
                </div>
            </Modal.Body>
            </Modal>
        </>
    )
}

export default TransactionProofDetail