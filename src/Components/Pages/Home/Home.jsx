import React, { useState, useEffect, useRef } from 'react'
import styles from './home.module.css'
import Headr from '../../Common/Header/Headr'
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../../../../public/home2.jpg"
import img2 from "../../../../public/dd.jpg"
import img3 from "../../../../public/home.jpg"
import "animate.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsFillFileArrowUpFill } from "react-icons/bs";
import { GrFormNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Footer from '../../Common/Footer/Footer';
import news from "../../../../public/tshert.webp"
import ecommerce from "../../../../public/im1.webp"
import axios from 'axios';
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

const Home = () => {

    const childRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("eCommerceUser"));
    // console.log(user)

    const userId = user === null ? "" : user.data[0].id;
    const email = user === null ? "" : user.data[0].email;
    const role = user === null ? "" : user.data[0].role;


    const [count, setCount] = useState(1)

    const [dispaly, setDisplay] = useState(1);

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
                                <span style={{ fontSize: '19px', color: '#ff6b0b' }}> Sucessfully</span>
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

            <div className={styles.container}>

                <Carousel data-bs-theme="dark">
                    <Carousel.Item interval={20000}>
                        <p className={styles.slider1} />
                        <Carousel.Caption>
                            <div className={styles.sliderContent}>
                                <h1>HEY!</h1>
                                <p>Welcome to MY SHOP: Discover Unbeatable Deals on Quality Products!</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <p className={styles.slider2} />
                        <Carousel.Caption>
                            <div className={styles.sliderContent}>
                                {/* <h1>First slide label</h1> */}
                                <p>Explore a wide range of top-quality products at MY SHOP.
                                    Start your shopping journey today and experience the difference!</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <p className={styles.slider3} />
                        <Carousel.Caption>
                            <div className={styles.sliderContent}>
                                {/* <h1>First slide label</h1> */}
                                <p>Find Your Perfect Fit at MY SHOP: Shop the Latest Trends Now!</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className={styles.Ebanking}>

                {dispaly == 1 ? (
                    <div className='wow animate__animated animate__backInLeft data-wow-offset="10"'>
                        <div className={styles.business}>
                            <div className={styles.rightSide}>
                                <h1 className={styles.headerTitle}>MY SHOP</h1>
                                <h1 className={styles.headerTitle2}>Explore Limitless Possibilities!</h1>
                                <p className={styles.paragraph}>
                                    Elevate your style with  MY SHOP. Discover the hottest fashion trends, must-have accessories,
                                    and timeless classics. Whether you're revamping your wardrobe or shopping for the perfect gift, our
                                    diverse collection has something for everyone. Embrace style, quality, and affordability all in one place!
                                </p>
                            </div>
                            <div className={styles.rightImg}>
                                <img src={ecommerce} />
                            </div>
                        </div>
                    </div>
                ) : ("")}

            </div>


            <div className={styles.newsAndExchange}>

                <div className={styles.news1}>

                    <h6 className={styles.newsHeader}>Latest Products </h6>

                    <div className={styles.news}>
                        {dataSource.map(items => (

                            <div className={`${styles.newsContent} animate__animated animate__bounceIn`} data-aos="zoom-in" data-aos-delay="400">
                                <p className={styles.newsImgs}>
                                    <img src={news} />
                                </p>
                                <label>{items.productname}</label>
                                <div className={styles.moreNews} >
                                    <h6 onClick={() => setpopup(true)}>More  <FaArrowRight style={{ paddingLeft: '10px' }} size="1.5vw"></FaArrowRight><b style={{ marginLeft: '70px' }}>{items.price}</b></h6>
                                    <button onClick={() => user === null ? isLoggedIn() : handleAddToCart(items.id, items.productname, items.price,)}>Add to Cart</button>
                                </div>
                            </div>
                        ))}
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

                                        <label style={{ fontSize: '29px', fontWeight: '700', }}>18$</label><br />
                                        <label style={{ color: '#e24f00', fontWeight: '700', margin: '10px', fontSize: '19px' }}>OUR LEGACY New Box T-shirt</label><br />

                                        <p>
                                            This black Our Legacy New Box cotton T-shirt is cut with a crew neck,
                                            short sleeves and loose, relaxed fit. We've always thought of ourselves as anything but basic,
                                            but when it comes to an Our Legacy tee, we'll make an exception.
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
                                        <button onClick={() => user === null ? isLoggedIn() : handleAddToCart(items.id, items.productname, items.price,)}>Add to Cart</button>

                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>
                </>

                : ""}

            <Footer />

        </>
    )
}

export default Home