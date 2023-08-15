import {CartItemContainer , Img , ItemDetails } from './cart-item.styles.jsx'


const CartItem = ({cartItem}) => {
    const {name , price , imageUrl, quantity} = cartItem;
    return (
        <CartItemContainer>
            <Img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                {name}
                <span className='price'>
                    {quantity} x ${price} 
                </span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;