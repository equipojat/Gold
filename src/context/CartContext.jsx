import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('marea_viva_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('marea_viva_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore write errors
    }
  }, [cartItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const addToCart = (product, quantity = 1, options = {}) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          options: { ...updated[existingIndex].options, ...options }
        };
        return updated;
      } else {
        return [...prev, { product, quantity, options }];
      }
    });

    setLastAddedItem(product);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const totalFormatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(totalAmount);

  // Procesar orden final y generar número de guía/pedido
  const processOrder = (customerData, paymentDetails) => {
    const orderId = `MV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cartItems],
      totalAmount,
      totalFormatted,
      customer: customerData,
      payment: paymentDetails,
      status: 'Confirmado - Preparando Despacho Asegurado'
    };

    setCompletedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  // Generador de pedido por WhatsApp
  const checkoutViaWhatsApp = (customerNotes = '') => {
    if (cartItems.length === 0) return;

    let message = `🌊 *PEDIDO EXCLUSIVO - MAREA VIVA JOYERÍA*\n`;
    message += `Hola, deseo adquirir las siguientes joyas en oro de 18K:\n\n`;

    cartItems.forEach((item, idx) => {
      message += `${idx + 1}. *${item.product.name}*\n`;
      message += `   - Cantidad: ${item.quantity}\n`;
      message += `   - Metal: ${item.product.metal}\n`;
      message += `   - Precio unitario: ${item.product.formattedPrice}\n`;
      if (item.options?.length) {
        message += `   - Medida elegida: ${item.options.length}\n`;
      }
      message += `   - Subtotal: $${(item.product.price * item.quantity).toLocaleString('es-CO')} COP\n\n`;
    });

    message += `──────────────────\n`;
    message += `*Total de la orden: ${totalFormatted}*\n`;
    message += `Envío asegurado nacional incluido.\n`;
    if (customerNotes) {
      message += `Nota adicional: ${customerNotes}\n`;
    }
    message += `\n¿Me podrían indicar los pasos para coordinar el pago y la entrega personalizada? Muchas gracias.`;

    const encoded = encodeURIComponent(message);
    const phoneNumber = '573001234567';
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        isCheckoutOpen,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
        totalFormatted,
        checkoutViaWhatsApp,
        processOrder,
        completedOrder,
        lastAddedItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
