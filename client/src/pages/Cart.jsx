import { useEffect, useState } from "react";
import fossil from "../assets/Fossil Men's Neutra Chronograph Brown Leather Strap Watch 44mm - Macy's.jpg";
import { Link, NavLink } from "react-router-dom";
import PaymentSummary from "./PaymentSummary";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "./firebase/firebase";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const Cart = () => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cartItems from local storage on initial load
        const savedCartItems = localStorage.getItem("cartItems");
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });
    const auth = getAuth(firebaseApp);
    const [uId, setUId] = useState(auth.currentUser?.uid);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userState, setUserState] = useState(false);

    const getCartItems = async () => {
        try {
            if (!uId) return; // Don't fetch if no user ID

            const response = await axios.get(
                `http://localhost:5001/fsdproject-2f44c/us-central1/napi/api/cart/getCartItems/${uId}`
            );
            const fetchedItems = response.data || [];
            setCartItems(fetchedItems); // Update state
            calculateTotal(fetchedItems); // Calculate total
            localStorage.setItem("cartItems", JSON.stringify(fetchedItems)); // Save to local storage
        } catch (error) {
            console.error("Error fetching cart items:", error);
            toast.error("Failed to load cart items. Please refresh the page.");
        }
    };

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotalPrice(total);
    };

    // Update cart when user logs in or out
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserState(true);
                setUId(user.uid);
            } else {
                setUserState(false);
                setUId(null);
                setCartItems([]); // Clear cart items when logged out
                localStorage.removeItem("cartItems"); // Clear local storage
            }
        });

        return () => unsubscribe();
    }, []);

    // Fetch cart items when user ID changes
    useEffect(() => {
        if (uId) {
            getCartItems();
        }
    }, [uId, userState]);

    const handleDelete = async (id) => {
        try {
            if (!uId) {
                toast.error("You need to be logged in to remove items");
                return;
            }

            // Remove from backend first
            await axios.delete(
                `http://localhost:5001/fsdproject-2f44c/us-central1/napi/api/cart/removeFromCart/${uId}/${id}`
            );

            // Then update local state
            const updatedCartItems = cartItems.filter((item) => item.id !== id);
            setCartItems(updatedCartItems);
            calculateTotal(updatedCartItems);
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

            toast.success("Item removed from cart successfully!");
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("Failed to remove item. Please try again.");
        }
    };

    return (
        <>
            {userState ? (
                <div>
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1">
                            <div className="flex items-center justify-start gap-5 px-52 py-5 border-b-2 border-gray-200 mx-8">
                                <FaShoppingCart className="text-4xl" />
                                <h1 className="text-3xl">Your Cart</h1>
                            </div>
                            <div className="flex px-52 py-5 justify-between mx-auto w-full">
                                <section className="w-[50%]">
                                    <div>
                                        {cartItems.length > 0 ? (
                                            cartItems.map((item) => (
                                                <div key={item.id} className="flex items-center gap-5 rounded-lg shadow-md bg-slate-200 m-2 p-6 relative">
                                                    <button
                                                        className="absolute top-2 right-2 rounded-full bg-gray-300 hover:bg-gray-400 text-black w-8 h-8 flex items-center justify-center"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                    <div>
                                                        <img
                                                            src={item.pictureUrl || fossil}
                                                            alt={item.serviceHead}
                                                            className="w-[112px] h-[112px] drop-shadow-lg"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <h1 className="text-xl whitespace-nowrap">{item.serviceHead}</h1>
                                                        <div>
                                                            <p className="text-lg">₹{item.price}</p>
                                                        </div>
                                                        <div className="flex justify-center items-center w-[234px] ">
                                                            <NavLink
                                                                to="/checkout"
                                                                state={{ totalPrice }}
                                                                className="bg-black text-white px-10 py-3 whitespace-nowrap rounded-md w-full text-center"
                                                            >
                                                                Proceed to Checkout
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Your cart is empty</p>
                                        )}
                                    </div>
                                </section>
                                <div className="w-[40%]">
                                    <PaymentSummary totalPrice={totalPrice} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="flex flex-col items-center gap-5">
                        <h1 className="text-3xl font-bold">You are not logged in</h1>
                        <div>
                            <button className="bg-black text-white px-10 py-2 rounded-md"><Link to="/login">Login</Link></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;    