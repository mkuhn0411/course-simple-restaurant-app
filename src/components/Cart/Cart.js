import './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = props => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    }
 
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
            <div className={classes.actions}>
                <button className={classes['button-alr']} onClick={() => props.onShowCart(false)}>Close</button>
                {cartCtx.items.length > 0 && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;