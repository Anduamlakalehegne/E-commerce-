import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import styles from './header.module.css'
import { Link } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import 'animate.css';
import axios from 'axios';

const Headr = forwardRef((props, ref,) => {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);




    const user = JSON.parse(localStorage.getItem("eCommerceUser"));

    const id = user === null ? "" : user.data[0].id;
    const email = user === null ? "" : user.data[0].email;
    const role = user === null ? "" : user.data[0].role;


    const handleClickopen2 = () => {
        Swal.fire({
            text: "Are you sure You Want to Logout",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00cc44',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok!',
            showCloseButton: true,
            showClass: {
                popup: 'animate__animated animate__shakeX'
            }, 

        }).then((result) => { 
            if (result.isConfirmed) { 
                remove() 
                // window.location.href = "/"; 
            }
        })

    }

    const remove = () => {
        localStorage.removeItem("eCommerceUser");
        window.location.href = "/";
    }


    const [dataSource2, setDataSource2] = useState([]) 

    const loddata2 = async () => {
        const response = await axios.get(`http://localhost:3007/api/actionplan/detail/${id}`); 
        setDataSource2(response.data);
    }
    useEffect(() => {
        loddata2()
    }, []); 

    useImperativeHandle(ref, () => ({ 
        loddata2,
    }));

    return (
        <>

            <div className={`${styles.container} ${scrolled ? "scrolled" : ""}`}> 
                <p> <Link to="/" style={{ textDecoration: 'none' }}>My Shop</Link></p> 
                <ul>
                    <Link to="/" style={{ textDecoration: 'none' }}><li>Home</li></Link> 
                    <Link to="/Products" style={{ textDecoration: 'none' }}><li>Product</li></Link>
                    <Link to="/" style={{ textDecoration: 'none' }}><li>About Us</li></Link> 
                    <Link to="/" style={{ textDecoration: 'none' }}><li>Contact Us</li></Link>
                </ul>

                <ul>
                    {email == '' ? '' : <li><AiOutlineUser style={{ marginRight: '5px', fontSize: '25px' }}></AiOutlineUser>{email}</li>}
                    {email == '' ? <Link to="/login" style={{ textDecoration: 'none' }}> <li>Login</li></Link> : <li onClick={() => { handleClickopen2() }}>logout</li>}
                    <Link to="/Carts" style={{ textDecoration: 'none' }}> <li><FaCartShopping style={{ fontSize:'27px' }}></FaCartShopping>{user === null ? "" : <label style={{fontSize:'19px', marginLeft:'5px'}}>{dataSource2.length}</label>}</li></Link>

                </ul>

            </div >
        </>
    )
});

export default Headr  