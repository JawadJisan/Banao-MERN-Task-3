import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './UserDetails.css'
import pic from '../assets/pic.png'
import { toast } from 'react-hot-toast';


const UserDetails = ({ id }) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();


    useEffect(() => {
        const fetchData = async () => {
            setData(undefined)
            try {
                setLoading(true);
                const response = await axios.get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${id}`);
                toast.success('User Data Load Successfull')
                setData(response.data);
                setLoading(false);
            } catch (error) {
                toast.error(error?.message)
                console.log("Error when fetching users", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id,setLoading ]);


    const replaceWithAvatar = (event) => {
        event.target.src = pic
        event.target.onError = null;

    };


    return (
        <div className='parentDiv' >
            <div className='Heading' > <p className='' >USERS DETAILS </p></div>
            {loading && data === undefined ? <div className="spinner-container">
                <div className="spinner"></div>
            </div>
                : ""}
            {data !== undefined ?
                <div className='detailsDiv' >
                    <img src={data?.avatar} onError={replaceWithAvatar} alt="AVATER" />
                    <p className='userName' >@{data?.profile?.username}</p>
                    <div className='details' >
                        <div className='bioDiv'>

                            <p> {data?.Bio} </p>
                        </div>
                        <div className='titleDiv' >
                            <h6 className='titleName' >Full Name</h6>
                            <div>
                                <p className='titleBox' > {data?.profile?.firstName + ' ' + data?.profile?.lastName} </p>
                            </div>
                        </div>
                        <div className='titleDiv' >
                            <h6 className='titleName' >Job Title</h6>
                            <div>
                                <p className='titleBox' > {data?.jobTitle} </p>
                            </div>
                        </div>
                        <div className='titleDiv' >
                            <h6 className='titleName' >Email</h6>
                            <div>
                                <p className='titleBox' > {data?.profile?.email} </p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div style={{ marginTop: "200px", textAlign: "center" }} className='bioDiv2'>
                    <p style={{ fontSize: "30px" }} > No user Select </p>
                </div>
            }
        </div>
    )
}

export default UserDetails