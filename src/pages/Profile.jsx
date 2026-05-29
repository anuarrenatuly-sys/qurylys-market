import { sendTelegramMessage } from "../api/telegram"
import {
    useState,
    useEffect,
  } from "react"
import {
    Link,
    useNavigate,
  } from "react-router-dom"
  import {
    FaBars,
    FaUser,
  } from "react-icons/fa"

import { signOut } from "firebase/auth"

import { auth } from "../firebase"
import {
    updateProfile,
    updateEmail,
    updatePassword,
  } from "firebase/auth"
  
  import {
    doc,
    updateDoc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
  } from "firebase/firestore"
  
  import { db } from "../firebase"

export default function Profile({
  user,
}) {
    const navigate = useNavigate()

const [showMenu, setShowMenu] = useState(false)
const [showSettings, setShowSettings] = useState(false)
const [profileName, setProfileName] = useState("")
const [orders, setOrders] = useState([])
const [selectedOrder, setSelectedOrder] = useState(null)

const [newName, setNewName] = useState("")

const [newEmail, setNewEmail] = useState("")

const [newPassword, setNewPassword] = useState("")

useEffect(() => {

    const loadUserData = async () => {
  
      try {
  
        const userRef = doc(
          db,
          "users",
          user.uid
        )
  
        const userSnap = await getDoc(userRef)
  
        if (userSnap.exists()) {
  
          setProfileName(
            userSnap.data().name
          )

          const ordersQuery = query(
            collection(db, "orders"),
            where("userId", "==", user.uid)
          )
          
          const ordersSnapshot =
            await getDocs(ordersQuery)
          
          const ordersData =
            ordersSnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            )
          
          setOrders(ordersData)
  
        }
  
      } catch (error) {
  
        console.log(error)
  
      }
  
    }
  
    if (user) {
  
      loadUserData()
  
    }
  
  }, [user])

  return (



    <div className="min-h-screen bg-gray-100">

      {/* Header */}
<nav className="bg-green-700 text-white p-4 shadow-lg sticky top-0 z-50">

<div className="max-w-7xl mx-auto flex items-center justify-between">

  {/* Logo */}
  <Link
    to="/"
    className="text-lg md:text-3xl font-bold"
  >
    Qurylys Market
  </Link>

  {/* Desktop Menu */}
  <ul className="hidden md:flex items-center gap-8 text-lg">

    <li className="hover:text-yellow-300 transition">
      <Link to="/">
        Басты бет
      </Link>
    </li>

    <li className="hover:text-yellow-300 transition">
      <Link to="/products">
        Тауарлар
      </Link>
    </li>

  </ul>

  {/* Right Side */}
  <div className="flex items-center gap-4">

    <button
      onClick={() => setShowMenu(!showMenu)}
      className="md:hidden text-3xl"
    >
      <FaBars />
    </button>

    <div className="w-12 h-12 rounded-full bg-white text-green-700 font-bold flex items-center justify-center shadow-xl border-4 border-green-200">

      {user?.email?.slice(0, 2).toUpperCase()}

    </div>

  </div>

</div>

</nav>

{/* Mobile Menu */}
{showMenu && (

<div
  onClick={() => setShowMenu(false)}
  className="fixed inset-0 bg-black/30 z-40 md:hidden"
>

  <div
    onClick={(e) => e.stopPropagation()}
    className="absolute top-[72px] left-0 w-full bg-green-700 text-white shadow-2xl"
  >

    <div className="flex flex-col px-6 py-6 space-y-5 text-base font-semibold">

      <Link
        to="/"
        onClick={() => setShowMenu(false)}
      >
        Басты бет
      </Link>

      <Link
        to="/products"
        onClick={() => setShowMenu(false)}
      >
        Тауарлар
      </Link>

    </div>

  </div>

</div>

)}

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden">

          {/* Top */}
          <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-900 p-10 text-white">

          <button
  onClick={async () => {

    await signOut(auth)

    window.location.href = "/"

  }}
  className="absolute top-8 right-8 px-6 py-3 bg-black text-white rounded-2xl font-semibold hover:bg-gray-800 transition duration-300 shadow-lg"
>

  Шығу

</button>

            <div className="flex flex-col md:flex-row items-center gap-8">

              <div className="w-36 h-36 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center text-5xl font-bold shadow-2xl">

                {user?.email?.slice(0, 2).toUpperCase()}

              </div>

              <div>

              <h1 className="text-5xl font-black tracking-tight">
                {profileName || "Qurylys User"}
                </h1>

                <p className="text-green-100/90 text-lg mt-4 break-all">
                  {user?.email}
                </p>

                <div className="flex items-center gap-3 mt-5">

                  <div className="w-4 h-4 rounded-full bg-green-300"></div>

                  <span className="text-lg">
                    Онлайн
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Dashboard */}
          <div className="p-8 grid md:grid-cols-2 gap-8">

          <button
  onClick={() => setSelectedOrder("orders")}
  className="group bg-gradient-to-br from-white to-gray-100 rounded-[35px] p-8 hover:shadow-2xl hover:-translate-y-1 transition duration-300 border border-gray-200"
>

  <h2 className="text-2xl font-bold">
    📦 Тапсырыстар
  </h2>

  <p className="text-gray-500 mt-3">
    Тапсырыстар тарихын көру
  </p>

</button>

            <button
  onClick={() => setShowSettings(true)}
  className="bg-gray-100 rounded-3xl p-8 hover:shadow-xl transition text-left"
>

  <h2 className="text-2xl font-bold">
    ⚙️ Баптаулар
  </h2>

  <p className="text-gray-500 mt-3">
    Профиль параметрлері
  </p>

</button>

          </div>

          {/* Settings Modal */}
{showSettings && (

<div
  onClick={() => setShowSettings(false)}
  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-6"
>

  <div
    onClick={(e) => e.stopPropagation()}
    className="bg-white max-w-xl w-full rounded-[40px] p-10 shadow-2xl"
  >

    <h2 className="text-4xl font-bold text-gray-800">
      Баптаулар
    </h2>

    <div className="space-y-5 mt-8">

      <input
        type="text"
        placeholder="Жаңа есім"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="w-full border rounded-2xl px-5 py-4 outline-none"
      />

      <input
        type="email"
        placeholder="Жаңа email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        className="w-full border rounded-2xl px-5 py-4 outline-none"
      />

      <input
        type="password"
        placeholder="Жаңа пароль"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border rounded-2xl px-5 py-4 outline-none"
      />

      <button
        onClick={async () => {

          try {

            if (newName.trim()) {

                await updateDoc(
                  doc(db, "users", user.uid),
                  {
                    name: newName,
                  }
                )
              
                setProfileName(newName)
              
              }

            if (newEmail) {

              await updateEmail(
                auth.currentUser,
                newEmail
              )

            }

            if (newPassword) {

              await updatePassword(
                auth.currentUser,
                newPassword
              )

            }

            alert("Сақталды 😎")

            setShowSettings(false)

          } catch (error) {

            alert("Қате шықты")

          }

        }}
        className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl text-lg font-bold transition"
      >

        Сақтау

      </button>

    </div>

  </div>

</div>

)}

{/* Orders Modal */}
{selectedOrder === "orders" && (

<div
  onClick={() => setSelectedOrder(null)}
  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
>

  <div
    onClick={(e) => e.stopPropagation()}
    className="bg-white max-w-3xl w-full rounded-[40px] p-8 max-h-[90vh] overflow-y-auto"
  >

    <div className="flex items-center justify-between">

      <h2 className="text-4xl font-bold">
        Тапсырыстар
      </h2>

      <button
        onClick={() => setSelectedOrder(null)}
        className="text-3xl"
      >
        ✕
      </button>

    </div>

    <div className="mt-8 space-y-6">

      {orders.length === 0 ? (

        <div className="text-gray-500 text-lg">
          Тапсырыс жоқ
        </div>

      ) : (

        orders.map((order) => (

          <div
            key={order.id}
            className="border rounded-3xl p-6"
          >

            <div className="flex items-center justify-between">

              <h3 className="text-2xl font-bold text-green-700">
                {order.total} ₸
              </h3>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                {order.status}
              </span>

            </div>

            <div className="mt-5 space-y-4">

              {order.products.map((product, index) => (

                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-4"
                >

                  <div className="flex items-center justify-between">

                    <h4 className="font-bold">
                      {product.name}
                    </h4>

                    <span className="font-bold text-green-700">
                      {product.price} ₸
                    </span>

                  </div>

                  <p className="text-gray-500 mt-2">
                    Саны: {product.quantity}
                  </p>

                </div>

              ))}

            </div>

            <button
  onClick={async () => {

    try {

      await deleteDoc(
        doc(db, "orders", order.id)
      )

      setOrders(
        orders.filter(
          (item) => item.id !== order.id
        )
      )

      if (orders.length === 1) {

        setSelectedOrder(null)
      
      }

      await sendTelegramMessage(
`❌ Тапсырыс отменен

👤 ${user.email}

💰 ${order.total} ₸
`
      )

    } catch (error) {

      console.log(error)

    }

  }}
  className="w-full mt-5 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl text-lg font-bold transition"
>

  Тапсырысты болдырмау

</button>

          </div>

        ))

      )}

    </div>

  </div>

</div>

)}

      </div>

        </div>

      </div>

  )

}