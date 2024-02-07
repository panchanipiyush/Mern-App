import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth"
import { toast } from "react-toastify"


export const AdminUpdate = () => {

    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const params = useParams();
    const { authorizationtoken } = useAuth();
    // get SingleUser Data 

    const getSingleUserData = async () => {
        try {
            const response = await fetch(`http://localhost:9000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationtoken,
                },
            })
            const data = await response.json();
            // console.log(`users single data: ${data}`);

            setData(data.data)
            // if (response.ok) {
            //     getAllUsersData();
            // }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleUserData();
    }, []);


    // to update the data dynamically.
    const handleSubmit = async (e) => {
       e.preventDefault();

        try {
            const response = await fetch(`http://localhost:9000/api/admin/users/update/${params.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorizationtoken,
                    },
                    body: JSON.stringify(data)
                },
            );

            if (response.ok) {
                toast.success("Updated successful");
            } else {
                toast.error("Not Updated");
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data, [name]: value,
        });
    };
    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Update User Data</h1>
                </div>
                {/* contact page main  */}
                <div className="container grid grid-two-cols">

                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    value={data.username}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email">email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={data.email}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone">Mobile No.</label>
                                <input
                                    type="phone"
                                    name="phone"
                                    id="phone"
                                    autoComplete="off"
                                    value={data.phone}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <button className="btn secondary-btn" type="submit">Update</button>
                            </div>
                        </form>
                    </section>
                </div>
            </section>
        </>

    )
};


