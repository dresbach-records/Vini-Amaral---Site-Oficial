import { useRouter } from 'next/navigation';
import styles from './CartDrawer.module.css';

interface CartItem {
  id: string;
  name: string;
  price: string;
  icon: string;
}

interface CartDrawerProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  handleRemoveFromCart: (itemId: string) => void;
  cartTotal: number;
}

const CartDrawer = ({ cart, isCartOpen, setIsCartOpen, handleRemoveFromCart, cartTotal }: CartDrawerProps) => {
  const router = useRouter();

  return (
    <div className={isCartOpen ? styles.open : ''}>
      <div className={styles.cartOverlay} onClick={() => setIsCartOpen(false)}></div>
      <div className={styles.cartDrawer}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>My <em>Cart</em></h2>
          <button className={styles.cartClose} onClick={() => setIsCartOpen(false)}>✕</button>
        </div>
        <div className={styles.cartItems}>
          {cart.length === 0 ? (
            <div className={styles.cartEmpty}>
              <div className={styles.cartEmptyIcon}>🎵</div>
              <div className={styles.cartEmptyText}>Your cart is empty.<br />Add something special.</div>
            </div>
          ) : (
            cart.map(item => (
              <div className={styles.cartItem} key={item.id}>
                <div className={styles.cartItemIcon}>{item.icon}</div>
                <div className={styles.cartItemInfo}>
                  <div className={styles.cartItemName}>{item.name}</div>
                  <div className={styles.cartItemPrice}>{item.price}</div>
                </div>
                <button className={styles.cartItemRemove} onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.cartTotal}>
              <span className={styles.cartTotalLabel}>Total</span>
              <span className={styles.cartTotalPrice}>${cartTotal.toFixed(2)}</span>
            </div>
            <button className={styles.btnCheckout} onClick={() => router.push('/checkout')}>✦ &nbsp; Checkout</button>
            <div className={styles.cartNote}>Secure Payment · Free shipping for Fan Club members</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
