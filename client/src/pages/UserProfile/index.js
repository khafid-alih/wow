import SideBar from "../../components/Navigation/SideBar"
import ContentProfile from "../../components/content/ContentProfile"

const Component = () =>{

    return (
        <>
            <div className="d-flex">
                <SideBar profile={true}/>
                <ContentProfile />
            </div>
        </>
    )

}

export default Component