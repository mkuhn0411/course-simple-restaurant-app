import './Cart.module.css';
import { useState,useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import Checkout from './Checkout';
import classes from './Cart.module.css';

const Cart = props => {
    const [checkout, setCheckout] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    }

    const orderHandler = () => {
        setCheckout(true);
    }

    const modalActions = <div className={classes.actions}>
        <button className={classes['button-alr']} onClick={() => props.onShowCart(false)}>Close</button>
        {cartCtx.items.length > 0 && <button onClick={orderHandler} className={classes.button}>Order</button>}
    </div>
 
    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item => (
        <CartItem
            key={item.key}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={() => cartItemRemoveHandler(item.id)}
            onAdd={() => cartItemAddHandler(item)}
        >{item.name}</CartItem>
        ))}
    </ul>


    return (   
        <Modal onClose={props.onShowCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {checkout && <Checkout onCancel={props.onShowCart} />}
            {!checkout && modalActions}
        </Modal>
    )
}

export default Cart;