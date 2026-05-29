import { useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import Profile from "./pages/Profile"

function App() {
  const [user, setUser] = useState(null)

  const [cart, setCart] = useState([])

  const addToCart = (product) => {

    const existingProduct = cart.find(
      (item) => item.id === product.id
    )

    if (existingProduct) {

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      )

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ])

    }

  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
  
        setUser(currentUser)
  
      }
    )
  
    return () => unsubscribe()
  
  }, [])

  const increaseQuantity = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    )

  }

  const decreaseQuantity = (id) => {

    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )

  }

  const removeFromCart = (id) => {

    setCart(
      cart.filter((item) => item.id !== id)
    )

  }

  return (
    <BrowserRouter>

      <Routes>

      <Route
  path="/"
  element={
    <Home
      addToCart={addToCart}
      cart={cart}
      user={user}
    />
  }
/>

        <Route
          path="/products"
          element={
            <Products
  cart={cart}
  addToCart={addToCart}
  user={user}
/>
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
              user={user}
            />
          }
        />

<Route
  path="/profile"
  element={
    <Profile
      user={user}
    />
  }
/>

      </Routes>

    </BrowserRouter>
  )
}

export default App