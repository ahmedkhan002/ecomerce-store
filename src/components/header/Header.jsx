import React, { useState, useEffect, useRef } from 'react';
import {
    Search, ShoppingCart, Heart, User, Menu, X,
    ChevronDown, ChevronUp, ShoppingBag, LogOut, Settings,
    HelpCircle, ArrowRight
} from 'lucide-react';
import { fetchallproducts, fetchByCategory } from '../../store/apidata/apiData';
import { useSelector, useDispatch } from 'react-redux';
import { removefromcart, removefromwishlist, increaseitemquantity, removeitemcompletely } from '../../store/cart/productSlice';

const Header = () => {
    const cartItems = useSelector((state) => state.product.cartItems);
    const wishlistItems = useSelector((state) => state.product.wishlistItems);


    const dispatch = useDispatch();

    const [prodata, setprodata] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [hoverTimeout, setHoverTimeout] = useState(null);



    const dropdownRef = useRef(null);
    const navRef = useRef(null);

    const navItems = [
        { id: 'home', label: 'Home', dropdown: false },
        {
            id: 'shop',
            label: 'Shop',
            dropdown: true,
            items: [
                { title: 'Shop Layouts', items: ['Left Sidebar', 'Right Sidebar', 'Full Width', 'List View'] },
                { title: 'Product Types', items: ['Simple Product', 'Variable Product', 'Grouped Product', 'Digital Product'] },
                { title: 'Shop Pages', items: ['Cart', 'Checkout', 'My Account', 'Wishlist'] }
            ]
        },
        {
            id: 'pages',
            label: 'Pages',
            dropdown: true,
            items: [
                { title: 'About', items: ['About Us', 'Our Team', 'Testimonials'] },
                { title: 'Account', items: ['Login', 'Register', 'Forgot Password'] },
                { title: 'Other', items: ['FAQ', 'Contact', 'Error 404'] }
            ]
        },
        { id: 'blog', label: 'Blog', dropdown: false },
        { id: 'contact', label: 'Contact', dropdown: false }
    ];

    // Profile dropdown items
    const profileItems = [
        { icon: <User size={16} />, label: 'My Account' },
        { icon: <ShoppingBag size={16} />, label: 'My Orders' },
        { icon: <Heart size={16} />, label: 'My Wishlist' },
        { icon: <Settings size={16} />, label: 'Settings' },
        { icon: <HelpCircle size={16} />, label: 'Help Center' },
        { icon: <LogOut size={16} />, label: 'Logout' }
    ];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the clicked element is part of a dropdown or a button that opens one
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                !event.target.closest('button[onClick*="toggleDropdown"]')) {
                setActiveDropdown(null);
            }
        };

        if (activeDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDropdown]);

    // Toggle dropdowns
    const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    // Handle hover for desktop dropdowns
    const handleMouseEnter = (dropdownId) => {
        if (window.innerWidth >= 1024) { 
            clearTimeout(hoverTimeout);
            setActiveDropdown(dropdownId);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth >= 1024) {
            const timeout = setTimeout(() => {
                setActiveDropdown(null);
            }, 300);
            setHoverTimeout(timeout);
        }
    };

    // Toggle search bar
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen === false) {
            setActiveDropdown(null);
            setIsMenuOpen(false);
        }
    };

    // Close mobile menu
    const closeMobileMenu = () => { // This function isn't used directly, but kept in case
        setIsMenuOpen(false);
    };

    // Cart Total Calculation (using context's cartItems)
    const cartTotal = cartItems.reduce((total, item) => {
        return total + (item.price * (item.quantity || 1));
    }, 0);

    // Handle mobile search
    const handleMobileSearch = () => {
        setIsSearchOpen(true);
        setIsMenuOpen(false);
        setActiveDropdown(null);
    };

    return (
        <>
            <div className="bg-gray-100 p-3 text-center text-md text-gray-800 mb-6">
                ⚠️ This is a development preview - Not all features are finalized
            </div>
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                {/* Main header */}
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="text-2xl font-bold text-fuchsia-600 cursor-pointer select-none">F L O N E.</div>
                        </div>

                        {/* Navigation - Desktop */}
                        <nav className="hidden lg:flex items-center space-x-8" ref={navRef}>
                            {navItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative group"
                                    ref={dropdownRef}
                                    onMouseEnter={() => handleMouseEnter(item.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <button
                                        onClick={() => item.dropdown && toggleDropdown(item.id)}
                                        className="flex items-center cursor-pointer text-gray-800 hover:text-fuchsia-600 transition-colors font-medium"
                                    >
                                        {item.label}
                                        {item.dropdown && (
                                            activeDropdown === item.id ? (
                                                <ChevronUp size={16} className="ml-1" />
                                            ) : (
                                                <ChevronDown size={16} className="ml-1" />
                                            )
                                        )}
                                    </button>

                                    {/* Dropdown menu */}
                                    {item.dropdown && activeDropdown === item.id && (
                                        <div
                                            className="absolute left-0 mt-2 bg-white shadow-lg rounded-md py-4 px-6 z-50"
                                            style={{ width: item.id === 'shop' ? '700px' : '500px' }}
                                        >
                                            {item.id === 'shop' || item.id === 'pages' ? (
                                                <div className={`grid gap-6 ${item.id === 'shop' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                                                    {item.items.map((category, index) => (
                                                        <div key={index}>
                                                            <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                                                            <ul className="space-y-2">
                                                                {category.items.map((subItem, subIndex) => (
                                                                    <li key={subIndex}>
                                                                        <a
                                                                            href="#"
                                                                            className="text-gray-600 hover:text-fuchsia-600 transition-colors block py-1"
                                                                        >
                                                                            {subItem}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <ul className="space-y-3">
                                                    {item.items.map((page, index) => (
                                                        <li key={index}>
                                                            <a
                                                                href="#"
                                                                className="text-gray-600 hover:text-fuchsia-600 transition-colors block py-1"
                                                            >
                                                                {page}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Icons */}
                        <div className="flex items-center space-x-5">
                            {/* Search (Untouched) */}
                            <button
                                onClick={toggleSearch}
                                className="text-gray-600 -top-2 hover:text-fuchsia-600 cursor-pointer hidden lg:inline"
                            >
                                <Search size={20} />
                            </button>

                            {/* Wishlist - Corrected to always show count */}
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown('wishlist')}
                                    className="text-gray-600 hover:text-fuchsia-600 cursor-pointer transition-colors"
                                >
                                    <Heart size={20} />
                                </button>
                                {/* Always display wishlist count from context state */}
                                <span onClick={() => toggleDropdown('wishlist')} className="absolute cursor-pointer -top-2 -right-2 bg-fuchsia-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {wishlistItems.length}
                                </span>

                                {/* Wishlist dropdown */}
                                {activeDropdown === 'wishlist' && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute max-sm:-right-22 right-0 mt-2 w-80 bg-white shadow-lg rounded-md py-4 z-50"
                                    >
                                        <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                                            <h3 className="font-semibold text-gray-900">Wishlist : {wishlistItems?.length}</h3>
                                            <button
                                                onClick={() => setActiveDropdown(null)}
                                                className="text-gray-400 cursor-pointer hover:text-red-500"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <div className="max-h-72 overflow-y-auto">
                                            {/* Conditional rendering based on wishlistItems.length */}
                                            {wishlistItems.length > 0 ? (
                                                wishlistItems.map((item) => (
                                                    <div key={item.id} className="flex items-center px-4 py-3 hover:bg-gray-50">
                                                        <img src={item.images[0]} alt={item.title} className="w-12 h-12 object-cover rounded-md border" />
                                                        <div className="ml-3 flex w-full h-full flex-row justify-between">
                                                            <div className="flex flex-col mt-1">
                                                                <h4 className="text-sm font-semibold text-gray-800">{item.title}</h4>
                                                                <p className="text-gray-600 text-xs">
                                                                    ${item.price?.toFixed(2)}
                                                                </p>
                                                            </div>
                                                            <button onClick={() => dispatch(removefromwishlist(item.id))}
                                                                className="text-gray-400 cursor-pointer hover:text-red-500">
                                                                <X size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-6 text-center text-gray-500">
                                                    Your wishlist is empty
                                                </div>
                                            )}
                                        </div>
                                        <div className="px-4 py-3 border-t border-gray-100">
                                            <a href="/wishlist" className="w-full py-2 bg-fuchsia-600 text-white rounded-md flex items-center justify-center font-medium hover:bg-fuchsia-500 transition-colors">
                                                View Wishlist
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Cart - Functionality Corrected */}
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown('cart')}
                                    className="text-gray-600 hover:text-fuchsia-600 cursor-pointer transition-colors"
                                >
                                    <ShoppingCart size={20} />
                                </button>

                                <span onClick={() => toggleDropdown('cart')} className="absolute cursor-pointer -top-2 -right-2 bg-fuchsia-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItems.length}
                                </span>

                                {/* Cart dropdown */}
                                {activeDropdown === 'cart' && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute max-sm:-right-12 right-0 mt-2 w-80 bg-white shadow-lg rounded-md py-4 z-50"
                                    >
                                        <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                                            <h3 className="font-semibold text-gray-900">Cart : {cartItems?.length}</h3>
                                            <button
                                                onClick={() => setActiveDropdown(null)}
                                                className="text-gray-400 cursor-pointer hover:text-red-500"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <div className="max-h-72 overflow-y-auto">
                                            {cartItems.length > 0 ? cartItems.map((item) => (
                                                <div key={item.id} className="flex group items-center px-4 py-3 hover:bg-gray-100">
                                                    <img src={item.images[0]} alt={item.title} className="w-12 h-12 object-cover rounded-md border" />
                                                    <div className="ml-3 flex w-full h-full gap-4 flex-row items-center">
                                                        <div className="flex-1 flex-col mt-1">
                                                            <h4 className="font-semibold text-sm text-gray-800">{item.title}</h4>
                                                            <div className='flex flex-row gap-10 w-full'>
                                                                <p className="text-gray-600 text-xs">
                                                                    ${item.price?.toFixed(2)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-5 h-6 items-center w-min group-hover:bg-white px-1 rounded-2xl'>
                                                            <button className=' cursor-pointer' onClick={() => dispatch(removefromcart(item.id))}>-</button>
                                                            <p className=' text-xs'>{item.quantity}</p>
                                                            <button className=' cursor-pointer' onClick={() => dispatch(increaseitemquantity(item.id))}>+</button>
                                                        </div>

                                                        <button onClick={() => dispatch(removeitemcompletely(item.id))}
                                                            className="text-gray-400 cursor-pointer hover:text-red-500">
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="px-4 py-6 text-center text-gray-500">Your cart is empty</div>
                                            )}

                                        </div>
                                        <div className="px-4 py-3 border-t border-gray-100">
                                            <div className="flex justify-between mb-3">
                                                <span className="text-gray-600">Subtotal:</span>
                                                <span className="font-medium">${cartTotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <a href="/cart" className="flex-1 py-2 border text-center border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors">
                                                    View Cart
                                                </a>
                                                <button className="flex-1 py-2 cursor-pointer bg-fuchsia-600 text-white rounded-md font-medium hover:bg-fuchsia-600 transition-colors">
                                                    Checkout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Profile (Untouched) */}
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown('profile')}
                                    className={`text-gray-600 cursor-pointer hover:text-fuchsia-600 ${activeDropdown === 'profile' ? 'text-fuchsia-600' : ''
                                        }`}
                                >
                                    <User size={20} />
                                </button>

                                {/* Profile dropdown */}
                                {activeDropdown === 'profile' && (
                                    <div className="absolute right-4 mt-2 w-56 bg-white shadow-lg rounded-md z-50">
                                        <div className="px-4 py-3 border-b">
                                            <h3 className="font-medium">John Doe</h3>
                                            <p className="text-sm text-gray-500">john@example.com</p>
                                        </div>
                                        <ul className="py-1">
                                            {profileItems.map((item, i) => (
                                                <li key={i}>
                                                    <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                                        <span className="mr-3">{item.icon}</span>
                                                        {item.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                            </div>

                            {/* Mobile menu button (Untouched) */}
                            <button
                                onClick={() => {
                                    setIsMenuOpen(!isMenuOpen);
                                    setIsSearchOpen(false);
                                    setActiveDropdown(null);
                                }}
                                className="text-gray-600 hover:text-fuchsia-600 transition-colors lg:hidden"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Search bar (Untouched) */}
                    {isSearchOpen && (
                        <div className="mt-4 pb-3">
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-fuchsia-500 focus:border-fuchsia-500"
                                    autoFocus
                                />
                                <button className="bg-fuchsia-600 text-white px-6 py-2 rounded-r-md hover:bg-fuchsia-700">
                                    Search
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile menu (Untouched) */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-white border-t">
                        <div className="container mx-auto px-4 py-3">

                            {/* Mobile Search Button */}
                            <div className="mb-3">
                                <button
                                    onClick={handleMobileSearch}
                                    className="w-full flex items-center justify-center py-2 border border-fuchsia-600 text-fuchsia-600 rounded-md font-medium hover:bg-fuchsia-50"
                                >
                                    <Search size={16} className="mr-2" />
                                    Search Products
                                </button>
                            </div>

                            <ul className="space-y-2">
                                {navItems.map((item) => (
                                    <li key={item.id} className="border-b border-gray-100 pb-2">
                                        <button
                                            onClick={() => item.dropdown && toggleDropdown(item.id)}
                                            className="w-full flex justify-between items-center py-2 text-gray-800 font-medium"
                                        >
                                            <span>{item.label}</span>
                                            {item.dropdown && (
                                                activeDropdown === item.id ? (
                                                    <ChevronUp size={16} />
                                                ) : (
                                                    <ChevronDown size={16} />
                                                )
                                            )}
                                        </button>

                                        {item.dropdown && activeDropdown === item.id && (
                                            <div className="pl-4 mt-2 space-y-3">
                                                {item.id === 'shop' ? (
                                                    <>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900 mb-2">Shop Layouts</h3>
                                                            <ul className="space-y-2 pl-2">
                                                                {item.items[0].items.map((subItem, index) => (
                                                                    <li key={index}>
                                                                        <a href="#" className="text-gray-600 hover:text-fuchsia-600 block py-1">
                                                                            {subItem}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900 mb-2">Product Types</h3>
                                                            <ul className="space-y-2 pl-2">
                                                                {item.items[1].items.map((subItem, index) => (
                                                                    <li key={index}>
                                                                        <a href="#" className="text-gray-600 hover:text-fuchsia-600 block py-1">
                                                                            {subItem}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </>
                                                ) : item.id === 'pages' ? (
                                                    <>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900 mb-2">About</h3>
                                                            <ul className="space-y-2 pl-2">
                                                                {item.items[0].items.map((subItem, index) => (
                                                                    <li key={index}>
                                                                        <a href="#" className="text-gray-600 hover:text-fuchsia-600 block py-1">
                                                                            {subItem}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900 mb-2">Account</h3>
                                                            <ul className="space-y-2 pl-2">
                                                                {item.items[1].items.map((subItem, index) => (
                                                                    <li key={index}>
                                                                        <a href="#" className="text-gray-600 hover:text-fuchsia-600 block py-1">
                                                                            {subItem}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <ul className="space-y-2 pl-2">
                                                        {item.items.map((page, index) => (
                                                            <li key={index}>
                                                                <a href="#" className="text-gray-600 hover:text-fuchsia-600 block py-1">
                                                                    {page}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        )}
                                    </li>
                                ))}
                                <li className="pt-2">
                                    <button className="w-full flex items-center justify-center py-2 bg-fuchsia-600 text-white rounded-md font-medium">
                                        <User size={16} className="mr-2" />
                                        Login / Register
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;