import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";


export const AdminUsers = () => {

    const [users, setUsers] = useState([])
    const { authorizationtoken } = useAuth();

    const getAllUsersData = async () => {
        try {
            const response = await fetch("http://localhost:9000/apidmi/an/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationtoken,
                },
            })
            const data = await response.json();
            // console.log(`users: ${data}`);
            setUsers(data)
            // console.log(users);
        } catch (error) {
            console.log(error);
        }
    }

    // delete the user on delete button 
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:9000/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationtoken,
                },
            })
            const data = await response.json();
            console.log(`users after delete: ${data}`);
            if (response.ok) {
                getAllUsersData();
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllUsersData();
    }, [])
    return (
        <>
            <section className="admin-users-section">
                <div className="container">
                    <h1>Admin User Data</h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((curUser, index) => {

                                const {username,email,phone,_id} = curUser;
                                
                                return (
                                    <tr key={index}>
                                        <td>{username}</td>
                                        <td>{email}</td>
                                        <td>{phone}</td>
                                        <td><Link to={`/admin/users/${_id}/edit`}>Edit</Link></td>
                                        <td><button onClick={() => deleteUser(_id)}>Delete</button></td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>

                </div>
            </section>

        </>
    )
}