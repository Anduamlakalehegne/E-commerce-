import React, { useState, useEffect, useRef } from 'react'
import styles from './carts.module.css'
import Headr from '../../Common/Header/Headr';
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Carts = () => {

    const childRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("eCommerceUser"));

    const userId = user === null ? "" : user.data[0].id;
    const email = user === null ? "" : user.data[0].email;
    const role = user === null ? "" : user.data[0].role;


    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 250,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "item",
            headerName: "Item",
            width: 170,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "quantity",
            headerName: "Quantity",
            width: 150,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "price",
            headerName: "Price",
            width: 150,
            headerClassName: "column-header",
            cellClassName: "column-cell",
        },
        {
            field: "Delete",
            headerClassName: "column-header",
            width: 150,
            renderCell: (params) => renderDeleteButton(params, params.row.id,),
        },
    ]

    const renderDeleteButton = (params, id) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                        deleteSingleCart(id)
                    }}>
                    Cancel
                </Button>
            </strong>
        );
    };
    const [dataSource2, setDataSource2] = useState([])

    const loddata2 = async () => {
        const response = await axios.get(`http://localhost:3007/api/actionplan/detail/${userId}`);
        setDataSource2(response.data);
        console.log(response.data)
    }
    useEffect(() => {
        loddata2()
    }, []);


    const formattedData = dataSource2.map((item, index) => ({
        // id: index + 1, // Assign a unique id to each row
        ...item,
    }));


    const checkout = async () => {
        await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: dataSource2 })
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if (response.url) {
                window.location.assign(response.url); // Forwarding user to Stripe
            }
        });
    }


    async function deleteSingleCart(id) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await axios.delete(
                `http://localhost:3007/api/singleCart/delete/${id}`,
            )
            if (response.status === 200) {

                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    html: (
                        <> <p><span style={{ fontSize: '19px', color: '#ff6b0b' }}> Sucessfully Deleted</span> </p> </>),
                    icon: 'success',
                    denyButtonText: "Close",
                    allowOutsideClick: false,
                    showCloseButton: true,
                })
                loddata2()
                childRef.current.loddata2();
            }
            else {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    html: (
                        <> <p> <span style={{ fontSize: '19px', color: '#ff6b0b' }}>Faild to Deleted</span> </p> </>
                    ),
                    icon: 'erroe',
                    denyButtonText: "Close",
                    allowOutsideClick: false,
                    showCloseButton: true,
                })
                childRef.current.loddata2()
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

    async function deleteCart() {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await axios.delete(
                `http://localhost:3007/api/cart/delete/${userId}`,
            )
            if (response.status === 200) {

                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    html: (
                        <><p> <span style={{ fontSize: '19px', color: '#ff6b0b' }}> Sucessfully Cleared</span> </p> </>
                    ),
                    icon: 'success',
                    denyButtonText: "Close",
                    allowOutsideClick: false,
                    showCloseButton: true,
                })
                loddata2()
                childRef.current.loddata2();
            }
            else {
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    html: (
                        <><p> <span style={{ fontSize: '19px', color: '#ff6b0b' }}>Faild to Clear Cart</span> </p></>
                    ),
                    icon: 'erroe',
                    denyButtonText: "Close",
                    allowOutsideClick: false,
                    showCloseButton: true,
                })
                childRef.current.loddata2();
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
        <>

            <Headr ref={childRef} />

            <div>
                <p className={styles.OTP_RequestTitle}>My Cart</p>

                <div style={{ width: "95%", margin: 'auto', marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>

                    <DataGrid
                        sx={{
                            m: 2,
                            border: 1,
                            borderColor: 'primary.light', '& .MuiDataGrid-cell:hover': { color: 'primary.main', },
                        }}
                        checkboxSelection
                        rows={formattedData}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
                    <Button
                        style={{ margin: '10px 50px' }}
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={checkout}>CheckOut</Button>

                    <Button
                        style={{ margin: '10px 50px' }}
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={deleteCart}>Clear Cart</Button>
                </div>
            </div>


        </>
    );
}

export default Carts;

