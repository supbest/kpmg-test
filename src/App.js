import React, { useState, useEffect } from 'react';

const ShoppingCartSummary = () => {
  const [cartItems, setCartItems] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [editedPrice, setEditedPrice] = useState({});
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductQuantity, setNewProductQuantity] = useState(0);
  const [userPoints, setUserPoints] = useState(0); // State to track user's points
  const [appliedDiscountCategories, setAppliedDiscountCategories] = useState([]);

  const exampleCartItems = [
  ];

  useEffect(() => {
    setCartItems(exampleCartItems);
  }, []);

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
    let discountedTotal = subtotal;

    discounts
      .filter(discount => discount.type === 'fixedAmount' || discount.type === 'percentage')
      .forEach((coupon) => {
        if (coupon.type === 'fixedAmount') {
          discountedTotal -= coupon.value;
        } else if (coupon.type === 'percentage') {
          discountedTotal -= (subtotal * coupon.value) / 100;
        }
      });
    discounts
      .filter(discount => discount.type === 'percentageByItemCategory' || discount.type === 'discountByPoints')
      .forEach((ontop) => {
        if (ontop.type === 'percentageByItemCategory') {
          const categoryItems = cartItems.filter(item => item.category === ontop.category);
          const categorySubtotal = categoryItems.reduce((total, item) => total + calculateSubtotal(item), 0);
          const categoryDiscount = (categorySubtotal * ontop.value) / 100;
          discountedTotal -= categoryDiscount;
        } else if (ontop.type === 'discountByPoints') {
          const maxDiscount = subtotal * 0.2;
          const pointsDiscount = Math.min(ontop.value, maxDiscount);
          discountedTotal -= pointsDiscount;
        }
      });
    discounts
      .filter(discount => discount.type === 'specialCampaigns')
      .forEach((specialCampaign) => {
      const campaignDiscount = Math.floor(subtotal / 300) * 40;
      discountedTotal -= campaignDiscount;
      });
  
    return discountedTotal;
  };
  
  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: cartItems.length + 1,
      name: newProductName,
      category: newProductCategory,
      price: newProductPrice,
      quantity: newProductQuantity,
    };
    setCartItems([...cartItems, newProduct]);
    setNewProductName('');
    setNewProductCategory('');
    setNewProductPrice(0);
    setNewProductQuantity(0);
  };

  const handleDeleteProduct = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
  };

  const handleApplyDiscount = () => {
    if (window.confirm('Are you sure you want to apply this discount?')) {
    }
  };

  const handleAddDiscount = (type, value, category = '') => {
    if (discounts.length < 3) {
      const sameCategoryDiscount = discounts.find(
        (discount) => discount.category === category && discount.type !== 'specialCampaigns'
      );
      if (sameCategoryDiscount) {
        const confirmReplace = window.confirm(
          `A discount of type ${sameCategoryDiscount.type} for category ${category} already exists. Do you want to replace it with the new discount?`
        );
        if (!confirmReplace) {
          return; 
        }
        const updatedDiscounts = discounts.filter(
          (discount) => !(discount.category === category && discount.type !== 'specialCampaigns')
        );
        setDiscounts([...updatedDiscounts, { type, value, category }]);
      } else {
        setDiscounts([...discounts, { type, value, category }]);
      }
    } else {
      alert('You can only apply up to three discounts.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Shopping Cart Summary</h1>
      <div>
        {cartItems.map((item) => (
          <div key={item.id} style={styles.cartItem}>
            <p>{item.name}</p>
            <p>
              Category: 
              <select
                value={item.category}
                onChange={(e) => {
                  const updatedItems = [...cartItems];
                  const index = updatedItems.findIndex((cartItem) => cartItem.id === item.id);
                  updatedItems[index].category = e.target.value;
                  setCartItems(updatedItems);
                }}
              >
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Electronics">Electronics</option>
              </select>
            </p>
            <p>
              Price: ${editedPrice[item.id] !== undefined ? editedPrice[item.id] : item.price}

            </p>
            <p>
  Quantity: 
  <span>{item.quantity}</span>
</p>
            <p>Subtotal: ${calculateSubtotal(item)}</p>
            <button onClick={() => handleDeleteProduct(item.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div style={styles.newProductForm}>
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <select
          value={newProductCategory}
          onChange={(e) => setNewProductCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
          <option value="Electronics">Electronics</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(parseFloat(e.target.value))}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProductQuantity}
          onChange={(e) => setNewProductQuantity(parseInt(e.target.value))}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div>
        <p>Coupon</p>
      </div>
      <div style={styles.discountSection}>
  
        <button onClick={() => handleAddDiscount('fixedAmount', 20)}>Add Fixed Amount Discount $20</button>
        <button onClick={() => handleAddDiscount('percentage', 10)}>Add Percentage Discount 10%</button>
      </div>
        <p>Ontop</p>
      <div style={styles.discountSection}>
        <button onClick={() => handleAddDiscount('percentageByItemCategory', 10, 'Clothing')}>
          Add Percentage Discount by Clothing Category 10%
        </button>
        <button onClick={() => handleAddDiscount('discountByPoints', 20)}>Add Discount by Points 20</button>
      </div>
      <div style={styles.discountSection}>
        <p>Special Campaigns</p>
        <button onClick={() => handleAddDiscount('specialCampaigns')}>Add Special Campaigns</button>
      </div>
      <button onClick={handleApplyDiscount}>Apply Discounts</button>
      <p>Total: ${calculateTotal()}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
  },
  cartItem: {
    marginBottom: 10,
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 5,
  },
  newProductForm: {
    marginTop: 20,
  },
  discountSection: {
    marginTop: 20,
  },
};

export default ShoppingCartSummary;