import { useEffect } from "react"
import { useGlobaleContext } from "./context"

const About = ()  =>{

    const {updateAboutPage} = useGlobaleContext()

    useEffect(()=>{
       updateAboutPage();
    },[])

    return(
        <>
        <h1>About page</h1>
        </>
    )
}


export default About