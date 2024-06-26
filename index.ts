const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/api", async (req, res) => {
  const {
    content = "",
    textSpeaker = "BV074_streaming",
    sessionId = "a57a844b994feb53b7444ba880811774",
  } = req.body;

  if (content.length > 225) {
    console.log("max length is 225, current length is", content.length);
    return;
  }

  const URL = `https://api16-normal-v6.tiktokv.com/media/api/text/speech/invoke/?text_speaker=${textSpeaker}&req_text=${content}&speaker_map_type=0&aid=1233`;

  try {
    const headers = {
      "User-Agent":
        "com.zhiliaoapp.musically/2022600030 (Linux; U; Android 7.1.2; es_ES; SM-G988N; Build/NRD90M;tt-ok/3.12.13.1)",
      Cookie: `sessionid=${sessionId}`,
      "Accept-Encoding": "gzip,deflate,compress",
    };

    const response = await fetch(URL, { method: "POST", headers });
    const data = await response.json();
    const {
      status_code,
      data: { v_str: encoded_voice },
    } = data;
    if (status_code !== 0) return;
    const decodedVoice = Buffer.from(encoded_voice, "base64");

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Disposition": 'attachment; filename="output.mp3"',
    });
    res.send(decodedVoice);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
