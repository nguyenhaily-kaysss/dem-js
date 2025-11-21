export default async function handler(req, res) {
  try {
    const backendURL = "https://your-render-backend.onrender.com/api/test"; 
    // Thay bằng API Express của bạn trên Render.com

    const renderRes = await fetch(backendURL, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined
    });

    const text = await renderRes.text(); // dùng text() vì có thể backend trả không phải JSON

    // Trả nguyên trạng về client
    res.status(renderRes.status).send(text);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", message: err.message });
  }
}
