import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
export const AdminContacts = () => {

    const [contactData, setContactData] = useState([])
    const { authorizationtoken } = useAuth();

    const getContactsData = async () => {
        try {
            const response = await fetch("http://localhost:9000/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationtoken
                }
            });
            const data = await response.json();
            console.log("contact data: ", data);
            if (response.ok) {
                setContactData(data)
            }
        } catch (error) {
            console.log(error);
        }
    }


    // defining the fuction deleteContactById

    const deleteContactById = async (id) => {
        try {
            const response = await fetch(`http://localhost:9000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationtoken,
                },
            }
            );
            if (response.ok) {
                getContactsData();
                toast.success("Contact deleted successful");
            } else {
                toast.error("Contact not deleted");
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getContactsData();
    }, [])

    return (
        <>



            <section className="admin-contacts-section">
                <h1>Hello Contacts</h1>
                <div className="container admin-users">
                    {
                        contactData.map((curContactData, index) => {

                            const { username, email, message, _id } = curContactData;

                            return (
                                <div key={index}>
                                    <p>{username}</p>
                                    <p>{email}</p>
                                    <p>{message}</p>
                                    <button className="btn" onClick={() => deleteContactById(_id)}>delete</button>
                                </div>
                            );
                        })
                    }
                </div>

            </section>
        </>
    )
}