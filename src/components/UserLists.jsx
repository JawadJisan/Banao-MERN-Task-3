import React, { useState, useEffect } from 'react';
import axios from 'axios';



const UserLists = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const displayedUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get("https://602e7c2c4410730017c50b9d.mockapi.io/users");
                setUsers(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log("Error when fetching users", error);
                setIsLoading(false);
            }
        }
        fetchUsers()

        const fetchUserDetails = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${selectedUser.id}`);
                setUserDetails(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setIsLoading(false);
            }
        };

        if (selectedUser) {
            fetchUserDetails();
        } else {
            setUserDetails(null);
        }

    }, [selectedUser])

    const handleUserClick = (user) => {
        setSelectedUser(user)
    }

    console.log(userDetails)

    return (
        <div className="container">
            {displayedUsers.map((user) => (<li key={user.id} onClick={() => handleUserClick(user)}>
                <img src={user?.avatar} alt="Profile" />
                {user.profile.firstName}
            </li>))}

            <div className="pagination">
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>


        </div>
    )
}

export default UserLists