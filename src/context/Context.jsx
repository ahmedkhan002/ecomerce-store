import React, { createContext, useContext, useState, useEffect } from "react";

// Create the Context
const AppContext = createContext();



// Create the Provider component
export const ContextProvider = ({ children }) => {
    // Product filtering states
    const [type, setType] = useState('tops'); // Renamed from 'setype' for clarity
    const [productid, setProductid] = useState(null); // Renamed for clarity
    const [item, setItem] = useState(null); // 'item' can hold the currently viewed product or category products

    // --- Cart and Wishlist States (MUST BE ARRAYS) ---
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cartItems');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart items from localStorage:", error);
            return [];
        }
    });

    const [wishlistItems, setWishlistItems] = useState(() => {
        try {
            const storedWishlist = localStorage.getItem('wishlistItems');
            return storedWishlist ? JSON.parse(storedWishlist) : [];
        } catch (error) {
            console.error("Failed to parse wishlist items from localStorage:", error);
            return [];
        }
    });

    // --- API Fetching Logic (kept as is, but without the cart/wishlist side effects) ---
    async function getFilteredProducts(id, productType) { // Renamed params for clarity
        let url;
        if (id) {
            url = `https://dummyjson.com/products/${id}`;
        } else if (productType) {
            url = `https://dummyjson.com/products/category/${productType}`;
        } else {
            url = "https://dummyjson.com/products";
        }

        try {
            const res = await fetch(url);

            if (!res.ok) {
                console.error(`getFilteredProducts: HTTP error! Status: ${res.status} for URL: ${url}`);
                return null;
            }

            const data = await res.json();

            if (id) {
                return data; // Returns a single product object
            } else {
                if (data && Array.isArray(data.products)) {
                    return data.products; // Returns an array of products
                } else {
                    console.warn("getFilteredProducts: Expected 'products' array but not found in response:", data);
                    return []; // Return empty array if not found or malformed
                }
            }

        } catch (err) {
            console.error("Error fetching products:", err);
            return null;
        }
    }

    // --- Cart Management Functions ---
    const addToCart = (productToAdd) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === productToAdd.id);
            if (existingItem) {
                // If product already in cart, increment quantity
                return prevItems.map(item =>
                    item.id === productToAdd.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                // If new product, add it with quantity 1
                return [...prevItems, { ...productToAdd, quantity: 1 }];
            }
        });
    };

    const removeCartItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const decreaseCartItemQuantity = (id) => {
        setCartItems(prevItems => {
            return prevItems.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0); // Remove if quantity becomes 0
        });
    };

    // --- Wishlist Management Functions ---
    const addToWishlist = (productToAdd) => {
        setWishlistItems(prevItems => {
            // Check if product is already in wishlist to avoid duplicates
            if (!prevItems.some(item => item.id === productToAdd.id)) {
                return [...prevItems, productToAdd];
            }
            return prevItems; // If already exists, return current state
        });
    };

    const removeWishlistItem = (id) => {
        setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // --- Persist cart and wishlist to localStorage ---
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);


    // The value object that will be provided to consumers
    const contextValue = {
        // API/Product Fetching states and functions
        type,
        setType,
        productid,
        setProductid,
        item,
        setItem, // Consider if you truly need to expose setItem or if getFilteredProducts handles it
        getFilteredProducts,

        // Cart states and functions
        cartItems,
        addToCart,
        removeCartItem,
        decreaseCartItemQuantity,

        // Wishlist states and functions
        wishlistItems,
        addToWishlist,
        removeWishlistItem,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};