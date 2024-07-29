import React from 'react';
import "../style/orderModal.css";

const OrderModal = ({ show, handleClose, order }) => {
    if (!show) {
        return null;
    }


    return (
        <div className='modal display-block' style={{ justifyContent: 'center', display: 'flex'}}>
            <div className='modal-main'>
                <button className='close' onClick={handleClose}>&times;</button>
                <h2 className='modalhead'>Order Details</h2>
                <div className='modalbody'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Customized Content</th>
                                <th>Quantity</th>
                                <th>Content Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{order.product}</td>
                                <td>{order.customized}</td>
                                <td>{order.items}</td>
                                <td>content message 1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;