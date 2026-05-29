import { useState } from "react"
import { Link,useNavigate, } from "react-router-dom"
import {
  FaShoppingCart,
  FaTrash,
  FaMinus,
  FaPlus,
FaUser,
FaBars,
} from "react-icons/fa"
import { sendTelegramMessage } from "../api/telegram"
import {
    collection,
    addDoc,
  } from "firebase/firestore"
  
  import { db } from "../firebase"

export default function Cart({
  cart,
  setCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  user,
}) {

  const [showMenu, setShowMenu] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [name, setName] = useState("")
const [phone, setPhone] = useState("")
const [address, setAddress] = useState("")
const [error, setError] = useState("")

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )
  const navigate = useNavigate()

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

    <li className="font-bold">
      Себет
    </li>

  </ul>

  {/* Right Side */}
  <div className="flex items-center gap-3 md:gap-4 text-2xl">

    <button
      onClick={() => setShowMenu(!showMenu)}
      className="md:hidden"
    >
      <FaBars />
    </button>

    {user ? (

<button
  onClick={() => navigate("/profile")}
  className="w-12 h-12 rounded-full bg-white text-green-700 font-bold flex items-center justify-center shadow-xl border-4 border-green-200 hover:scale-110 transition"
>

  {user.email.slice(0, 2).toUpperCase()}

</button>

) : (

<FaUser
  onClick={() => navigate("/")}
  className="cursor-pointer hover:text-yellow-300 transition"
/>

)}

    <div className="flex items-center gap-2">

      <FaShoppingCart />

      <span className="text-sm md:text-lg">

        {cart.reduce((total, item) =>
          total + item.quantity, 0
        )}

      </span>

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
    className="bg-green-700 text-white mt-[72px] px-6 py-6 space-y-5 shadow-2xl"
  >

    <Link
      to="/"
      onClick={() => setShowMenu(false)}
      className="block"
    >
      Басты бет
    </Link>

    <Link
      to="/products"
      onClick={() => setShowMenu(false)}
      className="block"
    >
      Тауарлар
    </Link>

    <div className="font-bold">
      Себет
    </div>

  </div>

</div>

)}

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10 flex items-center gap-4">

          <FaShoppingCart />

          Себет

        </h1>

        {cart.length === 0 ? (

          <div className="bg-white rounded-[30px] p-16 text-center shadow-xl">

            <h2 className="text-3xl font-bold text-gray-700">
              Себет бос
            </h2>

            <Link to="/products">

              <button className="mt-8 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-2xl font-bold transition">

                Тауарларды көру

              </button>

            </Link>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-10">

            {/* Products */}
            <div className="lg:col-span-2 space-y-6">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-[35px] p-5 md:p-6 shadow-xl hover:shadow-2xl transition duration-300"
                >

                  <img
                    src={item.image}
                    alt=""
                    className="w-full md:w-48 h-48 object-cover rounded-3xl"
                  />

                  <div className="flex-1 flex flex-col justify-between">

                    <div>

                      <h2 className="text-3xl font-bold text-gray-800">
                        {item.name}
                      </h2>

                      <p className="text-gray-500 mt-3">
                        {item.category}
                      </p>

                      <p className="text-3xl font-bold text-green-700 mt-5">
                        {item.price} ₸
                      </p>

                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between mt-8">

                      <div className="flex items-center gap-4">

                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="w-12 h-12 rounded-2xl bg-gray-200 flex items-center justify-center text-xl"
                        >
                          <FaMinus />
                        </button>

                        <span className="text-2xl font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="w-12 h-12 rounded-2xl bg-green-700 text-white flex items-center justify-center text-xl"
                        >
                          <FaPlus />
                        </button>

                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="text-red-500 text-2xl"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* Summary */}
            <div className="bg-white rounded-[35px] p-8 shadow-2xl h-fit sticky top-28 border border-gray-100">

              <h2 className="text-3xl font-bold text-gray-800">
                Тапсырыс
              </h2>

              <div className="mt-8 space-y-5">

                <div className="flex items-center justify-between text-lg">

                  <span className="text-gray-500">
                    Тауар саны
                  </span>

                  <span className="font-bold">

                    {cart.reduce((total, item) =>
                      total + item.quantity, 0
                    )}

                  </span>

                </div>

                <div className="flex items-center justify-between text-lg">

                  <span className="text-gray-500">
                    Жалпы сумма
                  </span>

                  <span className="font-bold text-green-700 text-2xl">
                    {totalPrice} ₸
                  </span>

                </div>

              </div>

              <button
  onClick={() => setShowCheckout(true)}
  className="w-full mt-10 bg-green-700 hover:bg-green-800 text-white py-5 rounded-2xl text-xl font-bold transition shadow-lg hover:shadow-green-300/40"
>

  Тапсырыс беру

</button>

            </div>

          </div>

        )}

      </div>

      {/* Checkout Modal */}
{showCheckout && (

<div
  onClick={() => setShowCheckout(false)}
  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
>

  <div
    onClick={(e) => e.stopPropagation()}
    className="bg-white w-full max-w-2xl rounded-[35px] p-6 md:p-10 max-h-[90vh] overflow-y-auto"
  >

    <div className="flex items-center justify-between mb-8">

      <h2 className="text-3xl md:text-4xl font-bold">
        Тапсырыс беру
      </h2>

      <button
        onClick={() => setShowCheckout(false)}
        className="text-3xl"
      >
        ✕
      </button>

    </div>

    {!orderSuccess ? (

      <div className="space-y-6">

<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
          placeholder="Аты-жөніңіз"
          className="w-full border rounded-2xl px-5 py-4 outline-none text-lg"
        />

<input
  type="tel"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон нөмірі"
          className="w-full border rounded-2xl px-5 py-4 outline-none text-lg"
        />

<textarea
  value={address}
  onChange={(e) => setAddress(e.target.value)}
          placeholder="Жеткізу мекенжайы"
          rows="4"
          className="w-full border rounded-2xl px-5 py-4 outline-none text-lg resize-none"
        ></textarea>

<select
  value={paymentMethod}
  onChange={(e) => setPaymentMethod(e.target.value)}
  className="w-full border rounded-2xl px-5 py-4 outline-none text-lg"
>

          <option>
            Төлем тәсілі
          </option>

          

<option value="cash">
  Қолма-қол
</option>

        </select>

        <div className="bg-gray-100 rounded-3xl p-6 mt-6">

          <div className="flex items-center justify-between text-lg">

            <span>
              Жалпы сумма
            </span>

            <span className="font-bold text-2xl text-green-700">
              {totalPrice} ₸
            </span>

          </div>

        </div>

        {error && (

<div className="bg-red-100 text-red-600 p-4 rounded-2xl font-semibold">

  {error}

</div>

)}

        <button
          onClick={async () => {

            if (
              !name ||
              !phone ||
              !address ||
              !paymentMethod
            ) {
          
              setError("Барлық өрістерді толтырыңыз")
          
              return
            }
          
            setError("")
          
            if (paymentMethod === "kaspi") {
          
              window.open(
                "https://kaspi.kz",
                "_blank"
              )
          
            }

            if (!user) {

                alert("Тапсырыс беру үшін аккаунтқа кіріңіз")
              
                navigate("/")
              
                return
              }

              await addDoc(
                collection(db, "orders"),
                {
              
                  userId: user.uid,
              
                  userEmail: user.email,
              
                  customerName: name,
              
                  phone: phone,
              
                  address: address,
              
                  paymentMethod: paymentMethod,
              
                  status: "Қабылданды",
              
                  products: cart,
              
                  total: totalPrice,
              
                  createdAt: new Date(),
              
                }
              )

            const orderMessage = `
🛒 Жаңа тапсырыс

👤 Аты: ${name}

📱 Телефон: ${phone}

📍 Мекенжай: ${address}

💳 Төлем: ${paymentMethod}

📦 Тауарлар:

${cart.map((item) =>
`• ${item.name}
Саны: ${item.quantity}
Бағасы: ${item.price} ₸`
).join("\n\n")}

💰 Жалпы сумма:
${totalPrice} ₸
`


sendTelegramMessage(orderMessage)
          
            setOrderSuccess(true)

            setCart([])
          
          }}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-5 rounded-2xl text-xl font-bold transition"
        >

          Тапсырысты растау

        </button>

      </div>

    ) : (

      <div className="text-center py-10">

        <div className="text-7xl mb-6">
          ✅
        </div>

        <h2 className="text-4xl font-bold text-gray-800">
          Тапсырыс қабылданды!
        </h2>

        <p className="text-gray-500 text-lg mt-6 leading-8">

          Менеджер жақын арада сізбен байланысады.

        </p>

        <button
          onClick={() => {
            setShowCheckout(false)
            setOrderSuccess(false)
          }}
          className="mt-10 bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-2xl text-lg font-bold transition"
        >

          Жабу

        </button>

      </div>

    )}

  </div>

</div>

)}

    </div>
  )
}