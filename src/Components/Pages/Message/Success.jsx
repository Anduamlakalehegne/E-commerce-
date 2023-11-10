import React from 'react'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import 'animate.css';
import axios from 'axios';

const Success = () => {

    const user = JSON.parse(localStorage.getItem("eCommerceUser"));
    const id = user === null ? "" : user.data[0].id;

    const handleClickopen2 = () => {
        Swal.fire({
            text: "Continue to Shopping",
            icon: 'success',
            // showCancelButton: true,
            confirmButtonColor: '#00cc44',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok!',
            showCloseButton: true,
            // showClass: {
            //     popup: 'animate__animated animate__shakeX'
            // },

        }).then((result) => {
            if (result.isConfirmed) {
                deleteCart()
                // window.location.href = "/";
            }
        })

    }

    async function deleteCart() {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await axios.delete(
                `http://localhost:3007/api/cart/delete/${id}`,
            )
            if (response.status === 200) {

                window.location.href = "/";
            }
            else {
                window.location.href = "/";
            }
        } catch (error) {
            console.log(error + "error");
            Swal.fire({
                title: "Something Went Wrong?",
                text: `net::ERR_INTERNET_DISCONNECTED`,
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

    return (
        <div onClick={handleClickopen2()}>Success</div>
    )
}

export default Success