import { useState } from "react"
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaLock,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa"
import {
    Link,
    useNavigate,
  } from "react-router-dom"
import { sendTelegramMessage } from "../api/telegram"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
  } from "firebase/auth"
  import { auth } from "../firebase"
  import {
    doc,
    setDoc,
  } from "firebase/firestore"
  
  import { db } from "../firebase"

  export default function Home({
    addToCart,
    cart,
    user,
  }) {
  const navigate = useNavigate()
  const [cartCount,] = useState(0)
  const [showLogin, setShowLogin] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [showRegister, setShowRegister] = useState(false)
  const [registerError, setRegisterError] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const [contactName, setContactName] = useState("")
const [contactEmail, setContactEmail] = useState("")
const [contactMessage, setContactMessage] = useState("")
const [loginEmail, setLoginEmail] = useState("")
const [loginPassword, setLoginPassword] = useState("")
const [registerEmail, setRegisterEmail] = useState("")
const [registerName, setRegisterName] = useState("")
const [registerPassword, setRegisterPassword] = useState("")
  return (
    <div className="min-h-screen bg-gray-100">
      
{/* Navbar */}
<nav className="bg-green-700 text-white p-4 shadow-lg sticky top-0 z-50">

  <div className="max-w-7xl mx-auto flex items-center justify-between">

    {/* Logo */}
    <h1 className="text-lg md:text-3xl font-bold">
      Qurylys Market
    </h1>

    {/* Desktop Menu */}
    <ul className="hidden md:flex items-center gap-8 text-lg">

      <li className="hover:text-yellow-300 cursor-pointer">
        <a href="#home">Басты бет</a>
      </li>

      <li className="hover:text-yellow-300 cursor-pointer">
        <Link to="/products">Тауарлар</Link>
      </li>

      <li className="hover:text-yellow-300 cursor-pointer">
        <a href="#categories">Санаттар</a>
      </li>

      <li className="hover:text-yellow-300 cursor-pointer">
        <a href="#about">Біз туралы</a>
      </li>

      <li className="hover:text-yellow-300 cursor-pointer">
        <a href="#contact">Байланыс</a>
      </li>

    </ul>

    {/* Right Side */}
    <div className="flex items-center gap-2 md:gap-4">

      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="md:hidden text-3xl"
      >
        <FaBars />
      </button>

      {/* User */}
      <div className="cursor-pointer hover:text-yellow-300 transition text-2xl">
      
      {user ? (

<button
  onClick={() => navigate("/profile")}
  className="w-12 h-12 rounded-full bg-white text-green-700 font-bold flex items-center justify-center shadow-xl border-4 border-green-200 hover:scale-110 transition"
>

  {user.email.slice(0, 2).toUpperCase()}

</button>

) : (

<FaUser
  onClick={() => setShowLogin(true)}
  className="cursor-pointer hover:text-yellow-300 transition"
/>

)}

      </div>

      {/* Cart */}
      <div
  onClick={() => navigate("/cart")}
  className="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition"
>

  <FaShoppingCart />

  <span className="text-sm md:text-lg">

    {cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
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
    className="absolute top-[72px] left-0 w-full bg-green-700 text-white shadow-2xl"
  >

    <div className="flex flex-col px-6 py-6 space-y-5 text-base font-semibold">

      <a
        href="#home"
        onClick={() => setShowMenu(false)}
      >
        Басты бет
      </a>

      <Link
        to="/products"
        onClick={() => setShowMenu(false)}
      >
        Тауарлар
      </Link>

      <a
        href="#categories"
        onClick={() => setShowMenu(false)}
      >
        Санаттар
      </a>

      <a
        href="#about"
        onClick={() => setShowMenu(false)}
      >
        Біз туралы
      </a>

      <a
        href="#contact"
        onClick={() => setShowMenu(false)}
      >
        Байланыс
      </a>

    </div>

  </div>

</div>

)}

      {/* Hero Section */}
      <section
  id="home"
  className="max-w-7xl mx-auto px-6 py-20"
>
        
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between">
          
          <div className="max-w-xl">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
              Құрылысқа қажетті барлық тауарлар бір жерде
            </h2>

            <p className="text-gray-600 mt-6 text-lg">
              Сапалы құрылыс материалдары, құрал-саймандар және үйге арналған тауарлар.
            </p>

            <Link to="/products">

  <button className="mt-8 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition">

    Тауарларды көру

  </button>

</Link>
          </div>

          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
            alt="construction"
            className="w-full md:w-[450px] rounded-3xl mt-10 md:mt-0"
          />
        </div>
      </section>

            {/* Categories */}
<section
  id="categories"
  className="max-w-7xl mx-auto px-6 pb-20"
>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          Санаттар
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition cursor-pointer">
            <h3 className="text-2xl font-bold text-green-700">
              Құрылыс материалдары
            </h3>

            <p className="text-gray-600 mt-3">
              Цемент, кірпіш, блоктар және тағы басқа.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition cursor-pointer">
            <h3 className="text-2xl font-bold text-green-700">
              Электр тауарлары
            </h3>

            <p className="text-gray-600 mt-3">
              Кабельдер, шамдар, розеткалар.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition cursor-pointer">
            <h3 className="text-2xl font-bold text-green-700">
              Сантехника
            </h3>

            <p className="text-gray-600 mt-3">
              Крандар, құбырлар және ванна тауарлары.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition cursor-pointer">
            <h3 className="text-2xl font-bold text-green-700">
              Құрал-саймандар
            </h3>

            <p className="text-gray-600 mt-3">
              Дрель, балға, бұрағыш және тағы басқа.
            </p>
          </div>

        </div>
      </section>

            {/* Products */}
            {/* Products */}
<section
  id="products"
  className="max-w-7xl mx-auto px-6 pb-20"
>
<h2 className="text-4xl font-bold text-gray-800 mb-10">
  Танымал тауарлар
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

  {/* Product 1 */}
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition">
    <img
      src="https://aeroblock.net/upload/resize_cache/iblock/dfe/viumb30w2ybyqgawimgr1hlaws6pj6pz/788_465_1/cement.jpg"
      alt=""
      className="h-56 w-full object-cover"
    />

    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800">
        Цемент
      </h3>

      <p className="text-gray-500 mt-2">
        Жоғары сапалы цемент
      </p>

      <div className="flex items-center justify-between mt-6">
        <span className="text-2xl font-bold text-green-700">
          3500 ₸
        </span>

        <button
  onClick={() =>
    addToCart({
      id: 1,
      name: "Цемент",
      price: 3500,
      image:
        "https://aeroblock.net/upload/resize_cache/iblock/dfe/viumb30w2ybyqgawimgr1hlaws6pj6pz/788_465_1/cement.jpg",
    })
  }
  className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl"
>

  Себетке

</button>
      </div>
    </div>
  </div>

  {/* Product 2 */}
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition">
    <img
      src="https://st7.stpulscen.ru/images/product/472/671/090_original.jpg"
      alt=""
      className="h-56 w-full object-cover"
    />

    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800">
        Кірпіш
      </h3>

      <p className="text-gray-500 mt-2">
        Берік құрылыс кірпіші
      </p>

      <div className="flex items-center justify-between mt-6">
        <span className="text-2xl font-bold text-green-700">
          500 ₸
        </span>

        <button
  onClick={() =>
    addToCart({
      id: 2,
      name: "Кірпіш",
      price: 500,
      image:
        "https://st7.stpulscen.ru/images/product/472/671/090_original.jpg",
    })
  }
  className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl"
>

  Себетке

</button>
      </div>
    </div>
  </div>

  {/* Product 3 */}
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition">
    <img
      src="https://www.p-i-t.kz/uploads/store/product/a159eb27f71cdf88909e720ef830f47e.jpg"
      alt=""
      className="h-56 w-full object-cover"
    />

    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800">
        Дрель
      </h3>

      <p className="text-gray-500 mt-2">
        Кәсіби құрал-сайман
      </p>

      <div className="flex items-center justify-between mt-6">
        <span className="text-2xl font-bold text-green-700">
          25000 ₸
        </span>

        <button
  onClick={() =>
    addToCart({
      id: 3,
      name: "Дрель",
      price: 25000,
      image:
        "https://www.p-i-t.kz/uploads/store/product/a159eb27f71cdf88909e720ef830f47e.jpg",
    })
  }
  className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl"
>

  Себетке

</button>
      </div>
    </div>
  </div>

  {/* Product 4 */}
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition">
    <img
      src="https://images.satu.kz/170402733_w640_h640_emal-pf-133-tsveta.jpg"
      alt=""
      className="h-56 w-full object-cover"
    />

    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800">
        Бояу
      </h3>

      <p className="text-gray-500 mt-2">
        Үйге арналған сапалы бояу
      </p>

      <div className="flex items-center justify-between mt-6">
        <span className="text-2xl font-bold text-green-700">
          7800 ₸
        </span>

        <button
  onClick={() =>
    addToCart({
      id: 4,
      name: "Бояу",
      price: 7800,
      image:
        "https://images.satu.kz/170402733_w640_h640_emal-pf-133-tsveta.jpg",
    })
  }
  className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl"
>

  Себетке

</button>
      </div>
    </div>
  </div>

</div>
</section>

{/* Advantages */}
<section className="max-w-7xl mx-auto px-6 pb-20">

  <h2 className="text-4xl font-bold text-gray-800 mb-10">
    Неліктен бізді таңдайды?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

    <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
      <h3 className="text-2xl font-bold text-green-700">
        Жылдам жеткізу
      </h3>

      <p className="text-gray-600 mt-4">
        Қазақстан бойынша тез және сенімді жеткізу.
      </p>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
      <h3 className="text-2xl font-bold text-green-700">
        Сапалы өнім
      </h3>

      <p className="text-gray-600 mt-4">
        Тек тексерілген құрылыс тауарлары.
      </p>
    </div>

    <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
      <h3 className="text-2xl font-bold text-green-700">
        Қолжетімді баға
      </h3>

      <p className="text-gray-600 mt-4">
        Барлық тауарларға тиімді бағалар.
      </p>
    </div>

  </div>
</section>

{/* Banner */}
<section className="max-w-7xl mx-auto px-6 pb-20">

  <div className="bg-green-700 rounded-3xl p-12 text-white flex flex-col md:flex-row items-center justify-between">

    <div>
      <h2 className="text-3xl md:text-5xl font-bold leading-tight">
        Үйіңізді бірге салайық
      </h2>

      <p className="mt-5 text-lg text-green-100">
        Qurylys Market — сапалы құрылысқа арналған сенімді дүкен.
      </p>
    </div>

    <Link to="/products">

  <button className="mt-8 md:mt-0 bg-white text-green-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-200 transition">

    Қазір сатып алу

  </button>

</Link>

  </div>
</section>

{/* Login Popup */}
{showLogin && (
  <div
  onClick={() => setShowLogin(false)}
  className="fixed inset-0 bg-gray-200/70 backdrop-blur-sm flex items-center justify-center z-50 px-6"
>

<div
  onClick={(e) => e.stopPropagation()}
  className="bg-white w-full max-w-md rounded-3xl p-10 relative shadow-2xl"
>

      <button
        onClick={() => setShowLogin(false)}
        className="absolute top-5 right-5 text-gray-500 text-2xl"
      >
        ✕
      </button>

      <h1 className="text-4xl font-bold text-green-700 text-center">
        Qurylys Market
      </h1>

      <p className="text-center text-gray-500 mt-3">
        Аккаунтқа кіру
      </p>

      <form className="mt-10 space-y-6">

        <input
          type="email"
          placeholder="Email"
          value={loginEmail}
onChange={(e) => setLoginEmail(e.target.value)}
          className="w-full border rounded-2xl px-4 py-4 outline-none"
        />

        <input
          type="password"
          placeholder="Құпия сөз"
          value={loginPassword}
onChange={(e) => setLoginPassword(e.target.value)}
          className="w-full border rounded-2xl px-4 py-4 outline-none"
        />

<button
type="button"
  onClick={async () => {

    if (!loginEmail) {

      alert("Email енгізіңіз")

      return
    }

    try {

      await sendPasswordResetEmail(
        auth,
        loginEmail
      )

      alert("Қалпына келтіру хаты жіберілді 😎")

    } catch (error) {

      alert("Қате шықты")

    }

  }}
  className="text-green-700 font-semibold mt-2 hover:underline"
>

  Парольді ұмыттыңыз ба?

</button>

{loginError && (

<div className="bg-red-100 text-red-600 p-4 rounded-2xl font-semibold mb-4">

  {loginError}

</div>

)}

<button
 type="button"
 onClick={async () => {

    if (!loginEmail || !loginPassword) {
  
      setLoginError("Барлық өрістерді толтырыңыз")
  
      return
    }
  
    try {
  
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
  
      setLoginError("")
  
      alert("Кіру сәтті 😎")
  
      setShowLogin(false)
      navigate("/products")
  
    } catch (error) {
  
      setLoginError("Қате email немесе пароль")
  
    }
  
  }}
  className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl font-bold transition"
>

  Кіру

</button>

      </form>

      <p className="text-center text-gray-500 mt-8">
        Аккаунтыңыз жоқ па?

        <span
          onClick={() => {
            setShowLogin(false)
            setShowRegister(true)
          }}
          className="text-green-700 font-bold ml-2 cursor-pointer"
        >
          Тіркелу
        </span>

      </p>

    </div>

  </div>
)}

{/* Register Popup */}
{showRegister && (
  <div
  onClick={() => setShowRegister(false)}
  className="fixed inset-0 bg-gray-200/70 backdrop-blur-sm flex items-center justify-center z-50 px-6"
>

<div
  onClick={(e) => e.stopPropagation()}
  className="bg-white w-full max-w-md rounded-3xl p-10 relative shadow-2xl"
>

      <button
        onClick={() => setShowRegister(false)}
        className="absolute top-5 right-5 text-gray-500 text-2xl"
      >
        ✕
      </button>

      <h1 className="text-4xl font-bold text-green-700 text-center">
        Qurylys Market
      </h1>

      <p className="text-center text-gray-500 mt-3">
        Тіркелу
      </p>

      <form className="mt-10 space-y-6">

        <input
          type="text"
          placeholder="Аты-жөні"
          value={registerName}
onChange={(e) => setRegisterName(e.target.value)}
          className="w-full border rounded-2xl px-4 py-4 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={registerEmail}
onChange={(e) => setRegisterEmail(e.target.value)}
          className="w-full border rounded-2xl px-4 py-4 outline-none"
        />

        <input
          type="password"
          placeholder="Құпия сөз"
          value={registerPassword}
onChange={(e) => setRegisterPassword(e.target.value)}
          className="w-full border rounded-2xl px-4 py-4 outline-none"
        />

{registerError && (

<div className="bg-red-100 text-red-600 p-4 rounded-2xl font-semibold mb-4">

  {registerError}

</div>

)}

<button
  type="button"
  onClick={async () => {

    if (
        !registerName ||
        !registerEmail ||
        !registerPassword
      ) {
  
      setRegisterError("Барлық өрістерді толтырыңыз")
  
      return
    }
  
    try {
  
        const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        )
      
      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          name: registerName,
          email: registerEmail,
          createdAt: new Date(),
        }
      )

      await sendEmailVerification(
        userCredential.user
      )
      
      alert(
        "Email растау хаты жіберілді"
      )
  
      setRegisterError("")
  
      alert("Тіркелу сәтті 😎")
  
      setShowRegister(false)
      navigate("/products")
  
    } catch (error) {
  
      setRegisterError("Мұндай аккаунт бар немесе қате email")
  
    }
  
  }}
  className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl font-bold transition"
>

  Тіркелу

</button>

      </form>

      <p className="text-center text-gray-500 mt-8">
        Аккаунтыңыз бар ма?

        <span
          onClick={() => {
            setShowRegister(false)
            setShowLogin(true)
          }}
          className="text-green-700 font-bold ml-2 cursor-pointer"
        >
          Кіру
        </span>

      </p>

    </div>

  </div>
)}

{/* About Section */}
<section
  id="about"
  className="max-w-7xl mx-auto px-6 pb-24"
>

  <div className="grid md:grid-cols-2 gap-10 items-center">

    <div>
      <img
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
        alt=""
        className="rounded-3xl shadow-2xl h-full object-cover"
      />
    </div>

    <div className="bg-white rounded-3xl shadow-2xl p-10">

      <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
        Біз туралы
      </span>

      <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mt-6 leading-tight">
        Сенімді құрылыс маркетплейсі
      </h2>

      <p className="text-gray-600 text-lg mt-6 leading-9">
        Qurylys Market — құрылыс материалдары мен құрал-саймандарға арналған
        заманауи интернет-дүкен.
      </p>

      <p className="text-gray-600 text-lg mt-5 leading-9">
        Біз клиенттерге сапалы өнімдер, тиімді бағалар және
        жылдам жеткізу ұсынамыз.
      </p>

      <a href="#contact">

  <button className="mt-8 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-2xl font-bold transition">

    Толығырақ

  </button>

</a>

    </div>

  </div>

</section>

{/* Contact Section */}
<section
  id="contact"
  className="max-w-7xl mx-auto px-6 pb-24"
>

  <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-[40px] p-6 md:p-12 overflow-hidden text-white shadow-2xl">

    <div className="grid md:grid-cols-2 gap-14">

      <div>

        <span className="bg-white/20 px-5 py-2 rounded-full">
          Байланыс
        </span>

        <h2 className="text-3xl md:text-3xl md:text-5xl font-bold mt-6 leading-tight">
          Бізбен байланысыңыз
        </h2>

        <p className="text-green-100 text-lg mt-6 leading-8">
          Кез келген сұрақ бойынша бізге хабарласыңыз.
        </p>

        <div className="space-y-5 mt-10 text-lg">

          <p>
            📍 Алматы, Қазақстан
          </p>

          <p>
            📞 +7 777 777 77 77
          </p>

          <p>
            ✉️ info@qurylysmarket.kz
          </p>

        </div>

      </div>

      <div className="bg-white rounded-3xl p-5 md:p-8 text-black">

        <h3 className="text-3xl font-bold mb-6">
          Хабарлама жіберу
        </h3>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Аты-жөніңіз"
            value={contactName}
onChange={(e) => setContactName(e.target.value)}
            className="w-full border rounded-2xl px-5 py-4 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={contactEmail}
onChange={(e) => setContactEmail(e.target.value)}
            className="w-full border rounded-2xl px-5 py-4 outline-none"
          />

          <textarea
            placeholder="Хабарлама"
            value={contactMessage}
onChange={(e) => setContactMessage(e.target.value)}
            rows="5"
            className="w-full border rounded-2xl px-5 py-4 outline-none resize-none"
          ></textarea>

<button
  onClick={() => {

    const message = `
📩 Жаңа хабарлама

👤 Аты: ${contactName}

📧 Email: ${contactEmail}

💬 Хабарлама:
${contactMessage}
`

    sendTelegramMessage(message)

    alert("Хабарлама жіберілді 😎")

    setContactName("")
    setContactEmail("")
    setContactMessage("")

  }}
  className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl font-bold transition"
>

  Жіберу

</button>

        </div>

      </div>

    </div>

  </div>

</section>

{/* Footer */}
<footer className="bg-gray-900 text-white mt-10">

  <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

    <div>
      <h2 className="text-3xl font-bold text-green-500">
        Qurylys Market
      </h2>

      <p className="text-gray-400 mt-4">
        Құрылысқа арналған заманауи интернет-дүкен.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-4">
        Компания
      </h3>

      <ul className="space-y-3 text-gray-400">
        <li>Біз туралы</li>
        <li>Жаңалықтар</li>
        <li>Байланыс</li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-4">
        Санаттар
      </h3>

      <ul className="space-y-3 text-gray-400">
        <li>Құрылыс материалдары</li>
        <li>Электр тауарлары</li>
        <li>Сантехника</li>
        <li>Құрал-саймандар</li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-4">
        Байланыс
      </h3>

      <ul className="space-y-3 text-gray-400">
        <li>+7 777 777 77 77</li>
        <li>info@qurylysmarket.kz</li>
        <li>Алматы, Қазақстан</li>
      </ul>
    </div>

  </div>

  <div className="border-t border-gray-800 text-center py-6 text-gray-500">
    © 2026 Qurylys Market. Барлық құқықтар қорғалған.
  </div>

</footer>

    </div>
  )
}

