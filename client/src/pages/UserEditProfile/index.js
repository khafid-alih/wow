import EditProfile from "../../components/form/EditProfile"
import SideBar from "../../components/Navigation/SideBar"

const Component = () =>{

    return (
        <>
            <div className="d-flex">
                <SideBar />
                <EditProfile />
            </div>
        </>
    )

}

export default Component