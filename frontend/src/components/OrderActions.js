import React from 'react';
import './OrderActions.css';
function OrderActions({ orderId }) {
    const handleCancel = async () => {
        await fetch('http://localhost:5000/api/orders/cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId }),
        });
        alert('Order Cancelled');
    };

    const handleEscalate = async () => {
        await fetch('http://localhost:5000/api/orders/escalate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId }),
        });
        alert('Order Escalated');
    };

    return (
      <div className="order-actions">
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          <button className="escalate-button" onClick={handleEscalate}>Escalate</button>
      </div>
  );
}

export default OrderActions;
