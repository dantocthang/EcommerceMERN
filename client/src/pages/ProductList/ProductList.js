import React, { useEffect, useState } from 'react'
import { Space, Table, Popconfirm } from 'antd'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom'

import { get } from '../../utils/httpRequest'

import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import axios from 'axios';
const cl = classNames.bind(styles);

function ProductList() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function fetchFeaturedProduct() {
            const data = await get(`/product`)
            setProducts(data.data)
        }
        fetchFeaturedProduct()
    }, [])

    const confirm = async (e, id) => {
        console.log(e);
        try{
            const res = await axios.delete(`/product/${id}`)
            if (res.data.success){
                toast.success('Deleted');
                setProducts(prev=>prev.filter(item=>item._id!==id))
            }
            else toast.error('Can not delete this product')
        }catch(err){
            toast.error(err?.response?.data?.message || 'Undefined Error!')
        }
    };

    const cancel = (e) => {
        console.log(e);
        toast.error('Click on No');
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
            render: (price) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/product/${record._id}`}>Edit</Link>
                    <Popconfirm
                        title="Are you sure to delete this product?"
                        onConfirm={(e)=>confirm(e, record._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#">Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },

    ];

    return (
        <div className={cl('wrapper')}>
            <div className="grid wide">
                <Table columns={columns} dataSource={products} rowKey="_id" />
                <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            </div>
        </div>
    )
}


export default ProductList