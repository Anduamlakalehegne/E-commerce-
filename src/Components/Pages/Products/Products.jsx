import React, { useState, useEffect, useRef } from 'react'
import Headr from '../../Common/Header/Headr'
import styles from './products.module.css'
import img1 from "../../../../public/news.png"
import img2 from "../../../../public/im1.webp"
import "animate.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { GrFormNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Footer from '../../Common/Footer/Footer';
import news from "../../../../public/tshert.webp"
import axios from 'axios';


const Products = () => {

    const childRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("eCommerceUser"));
    // console.log(user)

    const userId = user === null ? "" : user.data[0].id;
    const email = user === null ? "" : user.data[0].email;
    const role = user === null ? "" : user.data[0].role;


    const [count, setCount] = useState(1)

    // const [isLogedIn, setisLogedIn] = useState(false);

    const [popup, setpopup] = useState(false)

    const closePopup5 = () => {
        setpopup(false); 
        setCount(1)

    }

    const [dataSource, setDataSource] = useState([])

    const loddata = async () => {
        const response = await axios.get(`http://localhost:3007/api/select`);
        setDataSource(response.data);
    }
    useEffect(() => {
        loddata()
    }, []);

    const [dataSource2, setDataSource2] = useState([])

    const Detail = async (id) => {
        const response = await axios.get(`http://localhost:3007/api/product/detail/${id}`);
        setDataSource2(response.data[0]);
    }
    // useEffect(() => {
    //     loddata2()
    // }, []);

    const handleAddToCart = async (id, item, price) => {

        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const data = {
                id,
                item,
                count,
                price,
                userId,
            };
            const config = {
                headers,
                mode: 'no-cors',
            };
            const response = await axios.post(
                'http://localhost:3007/api/addtocart',
                data,
                config,
            )

            if (response.status === 200) {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    html: (
                        <>
                            <p>
                                <span style={{ fontSize: '19px', color: '#ff6b0b' }}> Sucessfully Added</span>
                            </p>
                        </>
                    ),
                    icon: 'success',
                    denyButtonText: "Close",
                    allowOutsideClick: false,
                    showCloseButton: true,
                })
                childRef.current.loddata2();
            }
            else {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    html: (
                        <>
                            <h5 style={{ fontSize: '19px', textAlign: 'center', color: 'red' }}>Faild to Assigne</h5>
                        </>
                    ),
                    showConfirmButton: false,
                    showDenyButton: true,
                    icon: 'error',
                    denyButtonText: "Close",
                    allowOutsideClick: false,
                    showCloseButton: true,
                })
                setPop2(false)

            }

        } catch (error) {
            console.log(error + "error");
            Swal.fire({
                title: "Something Went Wrong?",
                text: `net::ERR_INTERNET_DISCONNECTED `,
                icon: "warning",
                dangerMode: true,
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonColor: '#d33',
                showClass: {
                    popup: 'animate__animated animate__shakeX'
                },
                allowOutsideClick: false,
                showCloseButton: true,
            })
        }
    }

    const isLoggedIn = () => {
        Swal.fire({
            title: "Please login to buy our Products?",
            // text: `net::ERR_INTERNET_DISCONNECTED `,
            icon: "warning",
            dangerMode: true,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },
            allowOutsideClick: false,
            showCloseButton: true,
        })
    }

    return (
        <>
            <Headr ref={childRef} />

            <div>

                <div className={styles.container}>


                    <div className={styles.newsAndExchange}>

                        <div className={styles.news1}>

                            <h6 className={styles.newsHeader}>Products </h6>

                            <div className={styles.news}>
                                {dataSource.map(items => (

                                    <div className={`${styles.newsContent} animate__animated animate__bounceIn`} data-aos="zoom-in" data-aos-delay="400">
                                        <p className={styles.newsImgs}>
                                            <img src={news} />
                                        </p>
                                        <label>{items.productname}</label>
                                        <div className={styles.moreNews} >
                                            <h6 onClick={() => {
                                                Detail(items.id)
                                                setpopup(true)
                                            }
                                            }>More  <FaArrowRight style={{ paddingLeft: '10px' }} size="1.5vw"></FaArrowRight><b style={{ marginLeft: '70px' }}>{items.price}</b></h6>
                                            <button onClick={() => user === null ? isLoggedIn() : handleAddToCart(items.id, items.productname, items.price,)}>Add to Cart</button>
                                        </div>
                                    </div>

                                ))}

                            </div>
                        </div>
                    </div>

                </div>

            </div>


            {popup == true ?
                <>
                    <div className={styles.popup}>
                        <div className={`${styles.popupInner} animate__animated animate__slideInRight `}>
                            <button className={styles.closeBtn} onClick={closePopup5}>X</button>



                            <div className={styles.popOuter}>
                                <label className={styles.popTitle}>Product Detail</label>
                                <div className={styles.popContainer}>
                                    <div className={styles.popImg}>
                                        <img src={news} />
                                    </div>
                                    <div>

                                        <label style={{ fontSize: '29px', fontWeight: '700', }}>{dataSource2.price}</label><br />
                                        <label style={{ color: '#e24f00', fontWeight: '700', margin: '10px', fontSize: '19px' }}>{dataSource2.productname}</label><br />

                                        <p>
                                            {dataSource2.description}

                                        </p>

                                        <strong>Total Amount : 0$</strong><br />
                                        <label style={{ textAlign: 'center' }}>
                                            <AiOutlineMinus onClick={() => setCount(count - 1)} className={styles.icon}></AiOutlineMinus>
                                            <input
                                                className={styles.input}
                                                type='text' value={count}
                                                onChange={(e) => setCount(e.target.value)}>
                                            </input>
                                            <AiOutlinePlus onClick={() => setCount(count + 1)} className={styles.icon}></AiOutlinePlus>
                                        </label><br />
                                        <button onClick={() => user === null ? isLoggedIn() : handleAddToCart(dataSource2.id, dataSource2.productname, dataSource2.price,)}>Add to Cart</button>

                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>
                </>

                : ""}

        </>
    )
}

export default Products 