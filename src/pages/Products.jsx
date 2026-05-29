import { useState } from "react"
import { Link,useNavigate, } from "react-router-dom"
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaSearch,
} from "react-icons/fa"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

export default function Products({
    cart,
    addToCart,
    user,
  }) {
    const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Барлығы")
  const [showMenu, setShowMenu] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const products = [
    {
      id: 1,
      name: "Цемент",
      category: "Цемент",
      price: 3500,
      image:
        "https://aeroblock.net/upload/resize_cache/iblock/dfe/viumb30w2ybyqgawimgr1hlaws6pj6pz/788_465_1/cement.jpg",
    },

    {
        id: 9,
        name: "Цемент",
        category: "Цемент",
        price: 3200,
        image:
          "https://srm2.kz/upload/resize_cache/iblock/ef1/ujono66fb1xupxgz1024vwc5pgw84pja/450_450_140cd750bba9870f18aada2478b24840a/gallery_medium%20(1).jpg",
      },

    {
      id: 2,
      name: "Кірпіш",
      category: "Кірпіш",
      price: 500,
      image:
        "https://st7.stpulscen.ru/images/product/472/671/090_original.jpg",
    },

    {
        id: 10,
        name: "Кірпіш",
        category: "Кірпіш",
        price: 400,
        image:
          "https://images.satu.kz/197692566_penoblok-gazoblok-teploblok.jpg",
      },

    {
      id: 3,
      name: "Дрель",
      category: "Құралдар",
      price: 25000,
      image:
        "https://www.p-i-t.kz/uploads/store/product/a159eb27f71cdf88909e720ef830f47e.jpg",
    },

    {
        id: 11,
        name: "Дрель",
        category: "Құралдар",
        price: 15000,
        image:
          "https://resources.cdn-kaspi.kz/img/m/p/hf1/hae/63775139659806.jpg?format=gallery-medium",
      },

    {
      id: 4,
      name: "Бояу",
      category: "Бояулар",
      price: 7800,
      image:
        "https://images.satu.kz/170402733_w640_h640_emal-pf-133-tsveta.jpg",
    },

    {
        id: 12,
        name: "Бояу",
        category: "Бояулар",
        price: 9800,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA4Wm5htV3htPdyhqjsWvO44kLMo1kz339fg&s",
      },

    {
        id: 5,
        name: "Перфоратор",
        category: "Құралдар",
        price: 45000,
        image:
          "https://opt.eland.by/upload/iblock/b20/pym2qbgviy27bfhp1lvxedcv35i77n0e.jpg",
      },

      {
        id: 13,
        name: "Перфоратор",
        category: "Құралдар",
        price: 48000,
        image:
          "https://electrolite.ru/Pc/shop/full/2876_17407494027768.jpg",
      },
      
      {
        id: 6,
        name: "Құбыр",
        category: "Құбырлар",
        price: 2200,
        image:
          "https://images.satu.kz/233843760_w1280_h640_truba-matovaya-aisi.jpg",
      },

      {
        id: 14,
        name: "Құбыр",
        category: "Құбырлар",
        price: 2800,
        image:
          "https://images.satu.kz/239633535_w1280_h640_truba-profilnaya-kvadratnaya.jpg",
      },
      
      {
        id: 7,
        name: "Ламинат",
        category: "Еден",
        price: 12000,
        image:
          "https://img.santehnica.ru/files/images/resized/products/9/4/9431310-943131_2.300x300.jpg",
      },

      {
        id: 15,
        name: "Ламинат",
        category: "Еден",
        price: 14000,
        image:
          "https://images.satu.kz/234228473_w1280_h640_terrasnaya-doska-iz.jpg",
      },
      
      {
        id: 8,
        name: "Шуруповерт",
        category: "Құралдар",
        price: 38000,
        image:
          "https://p-i-t.kz/uploads/store/product/726c1becdc031c03cc33a3e0fcfc06e4.jpg",
      },
      {
        id: 16,
        name: "Шуруповерт",
        category: "Құралдар",
        price: 33000,
        image:
          "https://static.insales-cdn.com/images/products/1/2994/733203378/ICDK-21Li__1_.png",
      },
  ]

  const filteredProducts = products.filter((product) => {

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === "Барлығы" ||
      product.category === selectedCategory

    return matchesSearch && matchesCategory
  })


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

    <li className="hover:text-yellow-300 transition font-bold">
      Тауарлар
    </li>

    <li className="hover:text-yellow-300 transition">
      <Link to="/#categories">
        Санаттар
      </Link>
    </li>

    <li className="hover:text-yellow-300 transition">
      <Link to="/#about">
        Біз туралы
      </Link>
    </li>

    <li className="hover:text-yellow-300 transition">
      <Link to="/#contact">
        Байланыс
      </Link>
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

    <Link
  to="/cart"
  className="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition"
>

      <FaShoppingCart />

      <span className="text-sm md:text-lg">
      {cart.reduce((total, item) =>
  total + item.quantity, 0
)}
      </span>

      </Link>

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

    <div className="font-bold">
      Тауарлар
    </div>

    <Link
      to="/#categories"
      onClick={() => setShowMenu(false)}
      className="block"
    >
      Санаттар
    </Link>

    <Link
      to="/#about"
      onClick={() => setShowMenu(false)}
      className="block"
    >
      Біз туралы
    </Link>

    <Link
      to="/#contact"
      onClick={() => setShowMenu(false)}
      className="block"
    >
      Байланыс
    </Link>

  </div>

</div>

)}

      {/* Search */}
      <div className="max-w-7xl mx-auto px-6 pt-10">

      <div className="bg-white rounded-[30px] shadow-xl p-5 flex items-center gap-4 border border-gray-200">

          <FaSearch className="text-gray-400 text-xl" />

          <input
            type="text"
            placeholder="Тауар іздеу..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-lg"
          />

        </div>

      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 pt-8">

        <div className="flex gap-4 overflow-x-auto pb-4">

          {[
            "Барлығы",
            "Цемент",
            "Кірпіш",
            "Құралдар",
            "Бояулар",
            "Құбырлар",
            "Еден",
          ].map((category) => (

            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl whitespace-nowrap transition font-semibold ${
                selectedCategory === category
                  ? "bg-green-700 text-white"
                  : "bg-white shadow"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {filteredProducts.map((product) => (

<div
key={product.id}
onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-[30px] overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >

              <img
                src={product.image}
                alt=""
                className="h-64 w-full object-cover"
              />

              <div className="p-6">

              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
  Танымал
</div>

                <h2 className="text-2xl font-bold text-gray-800">
                  {product.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  {product.category}
                </p>

                <p className="text-2xl font-bold text-green-700 mt-4">
                  {product.price} ₸
                </p>

                <button
  onClick={(e) => {
    e.stopPropagation()
    addToCart(product)
  }}
  className="w-full mt-6 bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition"
>

  <FaShoppingCart />

  Себетке

</button>

              </div>

            </div>

          ))}

        </div>

        {/* Empty */}
        {filteredProducts.length === 0 && (

          <div className="text-center text-gray-500 text-2xl mt-20">
            Тауар табылмады
          </div>

        )}

      </div>


      {/* Product Modal */}
{selectedProduct && (

<div
  onClick={() => setSelectedProduct(null)}
  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-6"
>

  <div
    onClick={(e) => e.stopPropagation()}
    className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl"
  >

{/* Image */}
<div className="bg-gray-100 flex items-center justify-center p-5 md:p-10 relative">

  <img
    src={selectedProduct.image}
    alt=""
    className="w-full max-h-[300px] md:max-h-[450px] object-contain"
  />

  <button
    onClick={() => setSelectedProduct(null)}
    className="absolute top-5 right-5 text-3xl text-black transition"
  >
    ✕
  </button>

</div>

{/* Info */}
<div className="p-5 md:p-10">

  <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold mb-6">
    {selectedProduct.category}
  </div>

  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
    {selectedProduct.name}
  </h2>

  <p className="text-gray-500 text-lg mt-6 leading-8">

    Бұл өнім құрылыс жұмыстарына арналған жоғары сапалы тауар.
    Сенімді материалдардан жасалған және ұзақ уақыт қолдануға жарамды.

  </p>

  <div className="mt-8">

    <p className="text-gray-400">
      Бағасы
    </p>

    <h3 className="text-4xl md:text-5xl font-bold text-green-700 mt-2">
      {selectedProduct.price} ₸
    </h3>

  </div>

  <button
  onClick={() => addToCart(selectedProduct)}
  className="w-full mt-10 bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl text-lg font-bold transition"
>

    Себетке қосу

  </button>

</div>

    </div>

  </div>

)}

    </div>
  )
}