import { useEffect } from "react"
import { useGlobaleContext } from "./context"

const Home = ()  =>{

    const {updateHomePage} = useGlobaleContext()

    useEffect(()=>{
         updateHomePage();
    },[])

    return(
        <>
        <h1>Home page</h1>
        </>
    )
}


export default Home