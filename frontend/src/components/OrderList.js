import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import OrderActions from './OrderActions';
import './OrderList.css';

function OrderList() {
    const [orders, setOrders] = useState([]);
    const location = useLocation();
    const email = location.state?.email;
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId'); // Get orderId from URL query params

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const query = orderId 
                ? `?orderId=${orderId}` 
                : `?email=${email}`;
            const response = await fetch(`https://mernstack-xym0.onrender.com/api/orders${query}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            setOrders(orderId ? [data] : data); // Wrap data in an array if it's a single order
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
        fetchOrders();
    }, [email, orderId]);

    return (
        <div className="order-list-container">
            <h2 className="order-list-title">Your Orders</h2>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.productName}</td>
                            <td>{order.status}</td>
                            <td>{order.price}</td>
                            <td>
                                <OrderActions orderId={order.orderId} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
