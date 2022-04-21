import { Image, Table, Dropdown } from "react-bootstrap"
import { API } from "../../config/Axios"
import { useState, useEffect } from "react"

import UpdateTransaction from "../modal/UpdateTransaction"
import TransactionProofDetail from "../modal/TransactionProofDetail"

const Commponent = () => {
    const styles = {
        sectionTabel : {
            margin : "75px 170px 70px 170px"
        },
        headingStyle : {
            fontSize : "24px",
            fontWeight : "700",
            marginBottom : "40px"
        },
        tabelHead : {
            height : "75px",
            fontSize : "14px",
            fontWeight : "400"
        },
        tabel : {
            fontSize : "14px",
            fontWeight : "400",
            height : "75px"
        }
    }

    localStorage.setItem('path', "/1/")

    const [ transaction, setTransaction ] = useState([])

    const [idUpdate, setIdUpdate] = useState(null)
    const [confirmUpdateApprove, setConfirmUpdateApprove] = useState(null)
    const [confirmUpdateCancel, setConfirmUpdateCancel] = useState(null)
    const [updateTo, setUpdateTo] = useState(null)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showImage, setShowImage] = useState(false)
    const [image, setImage] = useState(null)
    const handleCloseImage = () => {
        setShowImage(false)
        setImage(null)
    }
    const handleShowImage = (image) => {
        setShowImage(true)
        setImage(image)
    }

    const getTransaction = async () => {
        try {
            const response = await API.get("/transaction");
            setTransaction(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getTransaction();
    }, []);

    const handleApprove = (id) =>{
        setIdUpdate(id)
        setUpdateTo(true)
        handleShow()
    }

    const handleUpdateToApprove = async (id) =>{
        try {
            await API.patch("/transaction-approve/" + id);
            getTransaction()
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (id) =>{
        setIdUpdate(id)
        setUpdateTo(false)
        handleShow()
    }

    const handleUpdateToCancel = async (id) =>{
        try {
            await API.patch("/transaction-cancel/" + id);
            getTransaction()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleClose()
        handleUpdateToApprove(idUpdate)
        setUpdateTo(null)
        setConfirmUpdateApprove(null)
      }, [confirmUpdateApprove])

    useEffect(() => {
        handleClose()
        handleUpdateToCancel(idUpdate)
        setUpdateTo(null)
        setConfirmUpdateCancel(null)
      }, [confirmUpdateCancel])

    return(
        <>
            <div className="w-100">
                <div style={styles.sectionTabel}>
                    <h1 style={styles.headingStyle}>Incoming Transaction</h1>
                    <div>
                        <Table striped >
                            <tbody >
                                <tr style={styles.tabelHead}>
                                    <th className="align-middle">No</th>
                                    <th className="align-middle">Users</th>
                                    <th className="align-middle">Bukti Transfer</th>
                                    <th className="align-middle">Remaining Active</th>
                                    <th className="align-middle">Status User</th>
                                    <th className="align-middle">Status Payment</th>
                                    <th className="align-middle">Approver</th>
                                    <th className="align-middle">Action</th>
                                </tr>
                                {transaction.map((data, index)=>(
                                <tr style={styles.tabel}>
                                    <td className="align-middle">{index + 1}</td>
                                    <td className="align-middle">{data.user.fullName}</td>
                                    {/* rencana modal */}
                                    <td className="align-middle">
                                        <p onClick={()=>handleShowImage(data.transferProof)}
                                        style={{
                                            color:"grey",
                                            textDecoration:"none",
                                            backgroundColor:"grey",
                                            width:"30px",
                                            cursor:"pointer"
                                        }}>0 0   
                                        </p>
                                    </td>
                                    <td className="align-middle">{data.remainingActive} / Hari</td>
                                    <td className="align-middle">{data.userStatus}</td>
                                    { data.paymentStatus == 'pending' ? 
                                    <td className="align-middle" style={{color:"orange"}}>{data.paymentStatus}</td>
                                        :
                                        //check
                                        data.paymentStatus == 'cancel' ? 
                                        <td className="align-middle" style={{color:"red"}}>{data.paymentStatus}</td>
                                        :
                                            data.paymentStatus == 'approved' ? 
                                            <td className="align-middle" style={{color:"green"}}>{data.paymentStatus}</td>
                                            :
                                            <td className="align-middle" >{data.paymentStatus}</td>
                                    }
                                    { data?.admin?.fullName != null ? 
                                    <td className="align-middle">{data.admin.fullName}</td>
                                        :
                                    <td className="align-middle">-</td>
                                    }
                                    { data.paymentStatus == "pending" ? 
                                    <td className="align-middle">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="link" id="dropdown-basic" className="fs-3" style={{ color : "rgba(28, 156, 210, 1)"}}>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu align="end" style={{fontSize : "14px", fontWeight : "500"}} className="p-2">
                                                <Dropdown.Item className="m-2" href="#" style={{ color : "rgba(10, 207, 131, 1)", fontWeight : "500"}} 
                                                onClick={()=>handleApprove(data.id)}
                                                >
                                                    Approved
                                                </Dropdown.Item>
                                                <Dropdown.Item className="m-2" href="#" style={{ color : "rgba(255, 0, 0, 1)", fontWeight : "500"}}
                                                onClick={()=>handleCancel(data.id)}
                                                >
                                                    Cancel
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                        :
                                    <td className="align-middle">No Action Needed</td>
                                    }
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <UpdateTransaction setConfirmUpdateApprove={setConfirmUpdateApprove} setConfirmUpdateCancel={setConfirmUpdateCancel} show={show} handleClose={handleClose} updateTo={updateTo}/>
            <TransactionProofDetail show={showImage} handleClose={handleCloseImage} image={image}/>
        </>
    )
}

export default Commponent