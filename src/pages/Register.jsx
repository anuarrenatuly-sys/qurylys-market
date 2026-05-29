import { FaUser, FaLock, FaEnvelope } from "react-icons/fa"

export default function Register() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-green-700">
            Qurylys Market
          </h1>

          <p className="text-gray-500 mt-3">
            Тіркелу
          </p>

        </div>

        <form className="mt-10 space-y-6">

          {/* Name */}
          <div>

            <label className="text-gray-700 font-semibold">
              Аты-жөні
            </label>

            <div className="flex items-center mt-2 border rounded-2xl px-4 py-3">

              <FaUser className="text-gray-400" />

              <input
                type="text"
                placeholder="Атыңызды енгізіңіз"
                className="w-full outline-none ml-3"
              />

            </div>

          </div>

          {/* Email */}
          <div>

            <label className="text-gray-700 font-semibold">
              Email
            </label>

            <div className="flex items-center mt-2 border rounded-2xl px-4 py-3">

              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                placeholder="Email енгізіңіз"
                className="w-full outline-none ml-3"
              />

            </div>

          </div>

          {/* Password */}
          <div>

            <label className="text-gray-700 font-semibold">
              Құпия сөз
            </label>

            <div className="flex items-center mt-2 border rounded-2xl px-4 py-3">

              <FaLock className="text-gray-400" />

              <input
                type="password"
                placeholder="Құпия сөз"
                className="w-full outline-none ml-3"
              />

            </div>

          </div>

          {/* Button */}
          <button
            className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl text-lg font-bold transition"
          >
            Тіркелу
          </button>

        </form>

        <p className="text-center text-gray-500 mt-8">
          Аккаунтыңыз бар ма?
          <span className="text-green-700 font-bold cursor-pointer ml-2">
            Кіру
          </span>
        </p>

      </div>

    </div>
  )
}