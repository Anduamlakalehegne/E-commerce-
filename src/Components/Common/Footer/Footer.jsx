import React from 'react'
import './footer.css'
import { BsFacebook } from "react-icons/bs";
import { BsTelegram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";

export default function Footer({ footerColor }) {

    const getColor = () => {
        return '#007070'
    }

    return (
        <div className='footer' style={footerColor == "wadya" ? { backgroundColor: getColor(), textDecoration: 'none' } : { textDecoration: 'none' }}>
            <div className='footerContents'>
                <div className='contacts'>
                    <label>Contact Us</label>
                    <p>Addis Ababa</p>
                    <p> +251115523800</p>
                    <p> +251115177500</p>
                    <p> info@wegagen.com</p>
                </div>
                <div className='usefulLinkd'>
                    <label>Useful Links</label>
                    <p>Home</p>
                    <p>Products</p>
                    <p>About Us</p>
                    <p>Contact Us</p>
                </div>
                <div className='gallery'>
                    <label>Gallery</label>
                    <p>Link 1</p>
                    <p>Link 2</p>
                    <p>Link 3</p>
                    <p>Link 4</p>
                </div>
                <div className='customerSupport'>
                    <label>Customer Support</label>
                    <p>FAQ</p>
                    <p>Security Tips</p>
                    <p>Info</p>
                </div>
            </div>
            <hr />

            <div className='footerSocialMedias'>
                <p>Copyright © 2023 My Shop. Terms of Use | Privacy Policy</p>
                <ul>
                    <li><BsFacebook ></BsFacebook></li>
                    <li><BsTelegram ></BsTelegram></li>
                    <li><BsLinkedin ></BsLinkedin></li>
                    <li><BsTwitter ></BsTwitter></li>
                    <li><BsInstagram ></BsInstagram></li>
                    <li><BsYoutube ></BsYoutube></li>
                </ul>
            </div>
        </div>
    )
}
