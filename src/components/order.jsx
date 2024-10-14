import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './order.css';

function Order({ contract }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      if (contract) {
        try {
          const orderCount = await contract.orderCount(ethers.constants.AddressZero); 
          
          const fetchedOrders = await Promise.all(
            Array.from({ length: orderCount.toNumber() }, async (_, i) => {
              const order = await contract.orders(ethers.constants.AddressZero, i + 1); 
              
              return order;
            })
          );
          setOrders(fetchedOrders);
        } catch (err) {
          console.error('Failed to fetch orders:', err);
        }
      }
    }
    fetchOrders();
  }, [contract]);

  return (
    <div>
      <h1>Orders</h1>
      {orders.map((order, index) => (
        <div key={index}>
          <h2>Order {index + 1}</h2>
          <p>Item ID: {order.item.id}</p>
          <p>Time: {new Date(order.time * 1000).toLocaleString()}</p>
          <p>Cost: {ethers.utils.formatEther(order.item.cost)} ETH</p>
        </div>
      ))}
    </div>
  );
}

export default Order;
