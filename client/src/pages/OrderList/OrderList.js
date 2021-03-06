import React from 'react'
import { Space, Table, Popconfirm, Typography, Tag, Button, Select } from 'antd'
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';

import httpRequest from '../../utils/httpRequest'
import Order from '../../components/Order'
import useFetch from '../../hooks/useFetch'
import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import styles from '../ProductList/ProductList.module.scss';

const cl = classNames.bind(styles);
const { Title } = Typography;
const { Option } = Select

function ProductList() {
    const { data: orders, loading, reFetch } = useFetch('/order')
    const { data: products, loading: productsLoading } = useFetch('/product')
    const { data: status } = useFetch('/order/status')


    const confirmDeleteOrder = async (id) => {
        try {
            const res = await httpRequest.delete(`/order/${id}`)
            if (res.data.success) {
                toast.success(res.data.message);
                reFetch()
            }
            else toast.error('Can not delete this order')
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Undefined Error!')
        }
    };

    const colorPicker = (status) => {
        let color = ''
        switch (status) {
            case 'Pending':
                color = 'geekblue'
                break
            case 'Confirmed':
                color = 'green'
                break
            case 'Cancelled':
                color = 'gray'
                break
            case 'Wrapped':
                color = 'yellow'
                break
            case 'Delivering':
                color = '#57c2c7'
                break
            case 'Delivered':
                color = '#ffc6ff'
                break
            default:
                color = 'white'
        }
        return color
    }

    const handleChangeStatus = async (value, orderId) => {
        try {
            const res = await httpRequest.patch(`/order/${orderId}`, { status: value })
            if (res.data.success) {
                toast.success(res.data.message)
                reFetch()
            }
        } catch (error) {
            console.log(error)
            toast.error("Can't update order status")
        }
    }

    const columns = [
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Order date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => formatDate(date, 'DD-MM-YYYY')
        },
        {
            title: 'Phone number',
            dataIndex: 'userPhone',
            key: 'userPhone',
        },
        {
            title: 'Address',
            dataIndex: 'userAddress',
            key: 'userAddress',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={colorPicker(status)}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Total',
            key: 'totalPrice',
            dataIndex: 'totalPrice',
            render: (price) => formatCurrency(price),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Select defaultValue={record.status} style={{ width: 160 }} onChange={(value) => handleChangeStatus(value, record._id)}>
                        {status.map(s => (
                            <Option key={s._id} value={s.name}>{s.name}</Option>
                        ))}

                    </Select>
                    <Popconfirm
                        title="Are you sure to delete this order? This can not be undone!"
                        onConfirm={() => confirmDeleteOrder(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },

    ];

    return (
        <div className={cl('wrapper')}>
            <div className="grid ultrawide">
                <Title level={2}>Orders</Title>
                {loading ? 'LOADING' : (
                    <Table
                        columns={columns}
                        dataSource={orders}
                        rowKey="_id"
                        expandable={{
                            expandedRowRender: (record) => (
                                <Order>
                                    <Order.List>
                                        {!productsLoading && record.productList.map(item => {
                                            const thisProduct = products.find(p => p._id === item.productId)

                                            return (
                                                <Order.Item key={item._id} data={{
                                                    photos: thisProduct.photos,
                                                    name: thisProduct.name,
                                                    amount: item.quantity,
                                                    price: item.currentPrice
                                                }}></Order.Item>
                                            )
                                        })}
                                    </Order.List>
                                </Order>
                            ),
                            rowExpandable: (record) => record.productList.length > 0,
                        }}
                    />)}
            </div>
        </div>
    )
}


export default ProductList