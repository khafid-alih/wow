import SideBar from "../../components/Navigation/SideBar"
import ContentSubscribe from "../../components/content/ContentSubscribe"

const Component = () =>{

    return (
        <>
            <div className="d-flex">
                <SideBar subcribe={true}/>
                <ContentSubscribe />
            </div>
        </>
    )

}

export default Component