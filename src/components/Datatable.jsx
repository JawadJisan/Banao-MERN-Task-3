import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Data.css'
import UserDetails from './UserDetails';
import pic from '../assets/pic.png'
import toast from 'react-hot-toast';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');
                toast.success('Successfully Load Users')
                setData(response.data);
                setLoading(false);
            } catch (error) {
                toast.error(error?.message)
                setLoading(false);
            }
        };
        fetchData();
    }, [setLoading]);


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);



    const handleUserClick = (user) => {
        setSelectedUser(user)
    }

    let errorMessageShown = false;


    const replaceWithAvatar = (event) => {
        event.preventDefault();
        event.target.src = pic
        console.error("Image failed to load:", event.target.src);
        if (!errorMessageShown) {
            toast.error("Some images failed to load!");
            errorMessageShown = true;
        }
        event.target.onError = null;
    };

    return (
        <div className='container' >
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className='divContainer' >
                    <div className='Heading'> <p className='' >USERS LIST </p></div>
                    <div className='listContainer' >
                        {data.map((user) => (
                            <li
                                className={selectedUser && selectedUser?.id === user.id ? "active" : "userList"}
                                key={Math.floor(Math.random() * 1000)}
                                onClick={() => handleUserClick(user)}>
                                <img
                                    className='imagess'
                                    src={user.avatar}
                                    onError={replaceWithAvatar}
                                    alt="avater" />
                                <p>{user.profile.firstName}</p>
                            </li>
                        ))}
                    </div>
                </div>
            )}
            <UserDetails id={selectedUser?.id} />
        </div>
    );
};

export default DataTable;
