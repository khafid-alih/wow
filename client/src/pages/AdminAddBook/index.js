import AppBarAdmin from "../../components/Navigation/AppBarAdmin"
import AddBook from "../../components/form/AddBook"

const Component = () =>{

    return (
        <>
            <div className="d-flex flex-column">
                <AppBarAdmin />
                <AddBook />
            </div>
        </>
    )

}

export default Component