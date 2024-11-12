import { useState } from "react"
import DataContext from "./Context/DataContext"
import Welcome from "./pages/Welcome"


export default function Layout() {
    const [page, setPage] = useState(<Welcome />)

    return (
        <>
            <div>
                <DataContext.Provider value={{ page, setPage }}>

                    {page}
                </DataContext.Provider>
            </div>


        </>


    )


}