//create context
//provide the state to the context
//wrap context in root componenet
//onsume the context using useContext

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listofProducts, setListofProduct] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  async function fetchListsOfProducts() {
    const apiResponce = await fetch("https://dummyjson.com/products");
    const result = await apiResponce.json();
    console.log(result);
    if (result && result?.products) {
      setListofProduct(result?.products);
      setLoading(false);
    }
  }

  function handleAddToCart(getProductDetails) {
    console.log(getProductDetails);
    let copyExistingCartItem = [...cartItems];
    const findIndexOfCurrentItem = copyExistingCartItem.findIndex(
      (cartItem) => cartItem.id === getProductDetails.id
    );

    if (findIndexOfCurrentItem == -1) {
      copyExistingCartItem.push({
        ...getProductDetails,
        quantity: 1,
        totalPrice: getProductDetails?.price,
      });
    } else {
      console.log("comming here");
      //   copyExistingCartItem[findIndexOfCurrentItem] = {
      //     ...copyExistingCartItem[findIndexOfCurrentItem],
      //     quantity: copyExistingCartItem[findIndexOfCurrentItem].quantity + 1,
      //     totalPrice:
      //       (copyExistingCartItem[findIndexOfCurrentItem].quantity + 1) *
      //       copyExistingCartItem[findIndexOfCurrentItem].price,
      //   };
      copyExistingCartItem[findIndexOfCurrentItem] = {
        ...copyExistingCartItem[findIndexOfCurrentItem],
        quantity: copyExistingCartItem[findIndexOfCurrentItem].quantity + 1,
        totalPrice:
          (copyExistingCartItem[findIndexOfCurrentItem].quantity +
      1) * copyExistingCartItem[findIndexOfCurrentItem].price,
      };
    }
    setCartItems(copyExistingCartItem);
    localStorage.setItem("CartItems", JSON.stringify(copyExistingCartItem));
    navigate("/cart");
  }

  function handleRemoveFromCart(getProductDetails, isFullyRemoveFromCart) {
    let copyExistingCartItem = [...cartItems];
    const findIndexOfCurrentCartItem = copyExistingCartItem.findIndex(
      (cuurentItem) => cuurentItem.id === getProductDetails.id
    );
    if (isFullyRemoveFromCart) {
      copyExistingCartItem.splice(findIndexOfCurrentCartItem, 1);
    } else {
      copyExistingCartItem[findIndexOfCurrentCartItem] = {
        ...copyExistingCartItem[findIndexOfCurrentCartItem],
        quantity: copyExistingCartItem[findIndexOfCurrentCartItem].quantity - 1,
        totalPrice:
          (copyExistingCartItem[findIndexOfCurrentCartItem].quantity - 1) *
          copyExistingCartItem[findIndexOfCurrentCartItem].price,
      };
    }
    localStorage.setItem("cartItems", JSON.stringify(copyExistingCartItem));
    setCartItems(copyExistingCartItem);
  }

  useEffect(() => {
    fetchListsOfProducts();
    setCartItems(JSON.parse(localStorage.getItem("CartItems") || []));
  }, []);

  console.log(listofProducts);

  return (
    <ShoppingCartContext.Provider
      value={{
        listofProducts,
        loading,
        productDetails,
        setProductDetails,
        setLoading,
        handleAddToCart,
        cartItems,
        handleRemoveFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
export default ShoppingCartProvider;
