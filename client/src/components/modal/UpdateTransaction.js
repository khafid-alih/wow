import {
    Button,
    Modal,
} from "react-bootstrap"

const UpdateTransaction = (props) => {
    const styles = {
        modalMainSize : {
            width : "416px",
            // height : "408px",
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
        buttonYes : {
            width: '135px',
            backgroundColor : "#CDCDCDB2",
            color : "Black",
            border : "none"
        },
        buttonNo : {
            width: '135px',
            backgroundColor : "#D60000",
            color : "#FFFFFF",
            border : "none"
        }
    }

    const handleUpdate = () => {
        if(props.updateTo){
            props.setConfirmUpdateApprove(true)
        }else{
            props.setConfirmUpdateCancel(true)
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
                    <h4 style={styles.modalheading}>{props.updateTo ?  <>Approve</>: <>Cancel</>} Transaction</h4>
                    <div>
                        Are you sure you want to {props.updateTo ? <p style={{color:"green", display:"inline"}}>Approve</p> : <p style={{color:"red", display:"inline"}}>Cancel</p>} this data?
                    </div>
                    <div className="text-end mt-5">
                        <Button onClick={handleUpdate} className="me-2" style={styles.buttonYes}>Yes</Button>
                        <Button onClick={props.handleClose} style={styles.buttonNo}>No</Button>
                </div>
                </div>
            </Modal.Body>
            </Modal>
        </>
    )
}

export default UpdateTransaction