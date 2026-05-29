const TOKEN = "8801214091:AAGoq16DzsR7sDsD70R-RkKoMRFVzu0loJ8"
const CHAT_ID = "5594857511"

export const sendTelegramMessage = async (message) => {

  try {

    await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      }
    )

  } catch (error) {

    console.log(error)

  }

}