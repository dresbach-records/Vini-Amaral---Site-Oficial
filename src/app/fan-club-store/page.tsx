'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import styles from './page.module.css';

// --- TYPE DEFINITIONS ---
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

interface CartItem {
  id: string;
  name: string;
  price: string;
  icon: string;
}

const products: Product[] = [
    {
        id: 'cd-deluxe',
        category: 'cd',
        name: 'Nobody Knows',
        description: 'The complete sound journey in a special edition',
        price: '$9.99',
        priceNote: '+ Free Shipping',
        icon: 'icon-cd',
        badge: 'Exclusive',
        badgeType: 'exclusive',
        visualClass: 'visual-cd',
        details: [
            { key: 'Format', value: 'Deluxe Physical CD' },
            { key: 'Tracks', value: '6 + 2 Bonus' },
            { key: 'Booklet', value: '16 pages with lyrics and photos' },
            { key: 'Package', value: 'Special Digipack' },
        ],
    },
    {
        id: 'lp-gold',
        category: 'lp',
        name: 'Nobody Knows',
        description: 'The definitive high-fidelity vinyl experience',
        price: '$39.99',
        priceNote: 'Limited Edition',
        icon: 'icon-lp',
        badge: 'Signed',
        badgeType: 'signed',
        visualClass: 'visual-lp',
        details: [
            { key: 'Format', value: '180g Gold Vinyl LP' },
            { key: 'Cover', value: 'High Quality Gatefold' },
            { key: 'Edition', value: 'Limited to 300 copies' },
            { key: 'Extra', value: 'A3 Poster + Artist Pick' },
        ],
    },
    {
        id: 'book-lyrics',
        category: 'book',
        name: 'Songs & Secrets',
        description: 'The stories behind the album lyrics',
        price: '$19.99',
        icon: 'icon-book',
        badge: 'New',
        badgeType: 'new',
        visualClass: 'visual-book',
        details: [
            { key: 'Format', value: 'Hardcover · 120 pages' },
            { key: 'Content', value: 'Lyrics, Chords, Stories' },
            { key: 'Finishing', value: 'Gold Hot Stamping' },
            { key: 'Bonus', value: 'Magnetic Bookmark' },
        ],
    },
    {
        id: 'merch-tshirt',
        category: 'coming',
        name: 'Official T-Shirt',
        description: 'Wear the art from the Nobody Knows album',
        icon: 'icon-coming',
        badge: 'Coming Soon',
        badgeType: 'coming',
        visualClass: 'visual-merch',
        details: [
            { key: 'Material', value: '100% Premium Cotton' },
            { key: 'Print', value: 'HD Silk Screen Printing' },
            { key: 'Color', value: 'Faded Black' },
        ],
        comingSoon: true,
    },
];

// --- COMPONENT: FanClubStorePage ---
const FanClubStorePage = () => {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = useCallback((message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, { id: product.id + Date.now(), name: product.name, price: product.price!, icon: product.icon }]);
    showToast(`"${product.name}" added to cart`);
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const handleNotifyMe = (productName: string) => {
    showToast(`You will be notified about: ${productName}`);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
  }, [cart]);

  const filteredProducts = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter(p => p.category === filter);
  }, [filter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles.storeLayout}>
      <nav className={styles.nav}>
          <div className={styles.navLeft}>
              <a onClick={() => router.back()} className={styles.navBack} style={{cursor: 'pointer'}}>← Back to Site</a>
              <div className={styles.navLogo}>Vini Amaral</div>
              <div className={styles.navBadge}>Fan Club</div>
          </div>
          <button className={styles.navCart} onClick={() => setIsCartOpen(true)}>
              ✦ Cart
              <div className={styles.cartCount}>{cart.length}</div>
          </button>
      </nav>

      {/* --- HERO --- */}
      <section className={styles.storeHero}>
            <div className={styles.heroBgText}>STORE</div>
            <div className={styles.storeHeroInner}>
                <div className={styles.heroEyebrow}>Exclusive Fan Club Area</div>
                <h1 className={styles.storeTitle}>Our <em>Exclusive</em><br/>Store</h1>
                <p className={styles.storeDesc}>CDs, vinyl LPs, books, and more—released as the album grows. Fan Club members get first access and special pricing.</p>
            </div>
      </section>

      {/* --- FILTER BAR --- */}
      <div className={styles.filterBar}>
        <span className={styles.filterLabel}>Filter by</span>
        <div className={styles.filters}>
            {['all', 'cd', 'lp', 'book', 'coming'].map(cat => (
                <button key={cat} className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`} onClick={() => setFilter(cat)}>{cat.toUpperCase()}</button>
            ))}
        </div>
      </div>

      {/* --- PRODUCTS GRID --- */}
      <section className={styles.storeSection}>
          <div className={styles.productsGrid}>
              {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} onNotifyMe={handleNotifyMe} />
              ))}
          </div>
      </section>
      
      <CartDrawer 
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        handleRemoveFromCart={handleRemoveFromCart}
        cartTotal={cartTotal}
      />

      {/* --- TOAST --- */}
      <div className={`${styles.toast} ${toast.show ? styles.show : ''}`}>
        <span className={styles.toastIcon}>✦</span>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

export default FanClubStorePage;
