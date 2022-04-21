import { useContext } from "react";
import { Link } from "react-router-dom";
import { 
    Image
} from "react-bootstrap";

import indexContext from "../../reducer/context/indexContext";

const Commponent = (props) =>{
    const styles = {
        logoImage : {
            marginTop : "25px",
            marginLeft : "120px",
            width : "230px",
            marginRight : "40px"
        },
        profilUser : {
            marginTop : "20px"
        },
        nameUser : {
            marginTop : "35px",
            fontSize : "24px",
            fontWeight : "700"
        },
        subStatus : {
            color : "#D60000",
            fontSize : "18px",
            fontWeight : "600",
            marginTop : "20px"
        },
        subStatusS : {
            color : "green",
            fontSize : "18px",
            fontWeight : "600",
            marginTop : "20px"
        },
        upLine : {
            marginTop : "20px",
            marginBottom : "55px"
        },
        sideListTag :{
            fontSize : "25px",
            fontWeight : "400",
            color : "#929292",
            marginLeft : "20px",
            display : "inline"
        },
        sideListTagRed :{
            fontSize : "25px",
            fontWeight : "400",
            color : "red",
            marginLeft : "20px",
            display : "inline"
        },
        sideListGroup : {
            marginBottom : "80px"
        },
        color : {
            backgroundColor : "red"
        }
    }

    const [state, ] = useContext(indexContext);

    return (
        <div style={styles.logoImage} className="d-flex flex-column align-items-center">
            <Link to="/0/" style={{textDecoration : "none"}} >
                <Image src="../../../assets/sec-icon.png" />
            </Link>
            <div>
                <div className="d-flex flex-column align-items-center">
                    <Image style={styles.profilUser} src="../../../assets/user.png"/>
                    <h1 style={styles.nameUser}>{state.user.name}</h1>
                    { state?.user?.subs == 'done' ? 
                        (<h1 style={styles.subStatusS}>Subscribed</h1>) 
                        : 
                        (<h1 style={styles.subStatus}>Not Subscribed Yet</h1>)
                    }    
                </div>
                <Image style={styles.upLine} src="../../../assets/line.png"/>
                <div>
                    <div>
                        <Link to="/0/profile" style={{textDecoration : "none"}} >
                            { props.profile === true ? 
                            <div className="d-flex align-items-center" style={styles.sideListGroup} >
                                <div>
                                    <Image className="" src="../../../assets/icon-user-red.png"/>
                                </div>
                                <div>
                                    <p style={styles.sideListTagRed}>Profile</p>
                                </div>
                            </div>
                                :
                            <div className="d-flex align-items-center" style={styles.sideListGroup} >
                                <div>
                                    <Image className="" src="../../../assets/icon-user.png"/>
                                </div>
                                <div>
                                    <p style={styles.sideListTag}>Profile</p>
                                </div>
                            </div>
                            }
                        </Link>
                    </div>
                    <div>
                        <Link to="/0/subscribe" style={{textDecoration : "none"}}>
                            { props.subcribe === true ? 
                            <div className="d-flex align-items-center" style={styles.sideListGroup} >
                                <div>
                                    <Image className="" src="../../../assets/icon-bill-red.png"/>
                                </div>
                                <div>
                                    <p style={styles.sideListTagRed}>Subscribed</p>
                                </div>
                            </div>
                                :
                            <div className="d-flex align-items-center" style={styles.sideListGroup} >
                                <div>
                                    <Image className="" src="../../../assets/icon-bill.png"/>
                                </div>
                                <div>
                                    <p style={styles.sideListTag}>Subscribed</p>
                                </div>
                            </div>
                            }
                        </Link>
                    </div>
                </div>
                <Image style={styles.upLine} src="../../../assets/line.png"/>
                <div>
                    <div>
                        <Link to="/logout" style={{textDecoration : "none"}}>
                            <div className="d-flex align-items-center" style={styles.sideListGroup} >
                                <div>
                                    <Image className="" src="../../../assets/icon-logout.png"/>
                                </div>
                                <div>
                                    <p style={styles.sideListTag}>Logout</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Commponent