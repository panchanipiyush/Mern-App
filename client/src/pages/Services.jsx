import { useAuth } from "../store/auth";

export const Services = () => {

    const { services } = useAuth()
    return (
        <>
            <section className="section-services">
                <div className="container">
                    <h1 className="main-heading">
                        services
                    </h1>
                </div>

                <div className="container grid grid-three-cols">

                    {
                        services.map((curEle, index) => {

                            return (
                                <>
                                    <div className="card" key={index}>
                                        <div className="card-img">
                                            <img src="/images/ITservices.png" alt="our services info" width="500" />
                                        </div>
                                        <div className="card-details">
                                            <div className="grid grid-two-cols">
                                                <p>{curEle.provider}</p>
                                                <p>{curEle.price}</p>
                                            </div>
                                            <h2>{curEle.services}</h2>
                                            <p>{curEle.description}</p>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }


                </div>
            </section>
        </>
    )
}