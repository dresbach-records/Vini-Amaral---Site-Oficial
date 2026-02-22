import styles from './ProductCard.module.css';

interface Product {
  id: string;
  category: 'cd' | 'lp' | 'book' | 'coming';
  name: string;
  description: string;
  price?: string;
  priceNote?: string;
  icon: string;
  badge?: string;
  badgeType?: 'new' | 'exclusive' | 'signed' | 'coming';
  visualClass: string;
  details: { key: string; value: string }[];
  comingSoon?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onNotifyMe: (productName: string) => void;
}

const ProductCard = ({ product, onAddToCart, onNotifyMe }: ProductCardProps) => (
  <div className={`${styles.productCard} ${product.comingSoon ? styles.comingSoon : ''}`} data-category={product.category}>
    <div className={`${styles.productVisual} ${styles[product.visualClass]}`}><div className={styles[product.icon]}></div></div>
    {product.badge && <div className={`${styles.productBadge} ${styles[product.badgeType]}`}>{product.badge}</div>}
    <div className={styles.fanBadge}>Fan Club</div>
    <div className={styles.productInfo}>
      <div className={styles.productCategory}>{product.category} · {product.badgeType === 'exclusive' ? 'Deluxe Edition' : 'Digital Audio'}</div>
      <div className={styles.productName}><em>{product.name}</em></div>
      <div className={styles.productDesc}>{product.description}</div>
      <div className={styles.productFooter}>
        {product.price ? (
          <div className={styles.productPrice}>{product.price}<span>{product.priceNote}</span></div>
        ) : (
          <div className={styles.priceComing}>Coming Soon · Notify Me</div>
        )}
        {product.comingSoon ? (
          <button className={styles.btnNotify} onClick={(e) => { e.stopPropagation(); onNotifyMe(product.name); }}>✦ Notify Me</button>
        ) : (
          <button className={styles.btnAdd} onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>+ Add</button>
        )}
      </div>
    </div>
    <div className={styles.productDetails}>
        <div className={styles.detailsInner}>
            {product.details.map(detail => (
                <div className={styles.detailRow} key={detail.key}><span className={styles.detailKey}>{detail.key}</span><span className={styles.detailVal}>{detail.value}</span></div>
            ))}
        </div>
    </div>
  </div>
);

export default ProductCard;
