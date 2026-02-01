
function apiKeyAuth(req, res, next) {
  try {
    const validApiKey = process.env.API_KEY || "dev-api-key-12345";

    const apiKey = 
      req.headers["x-api-key"] || 
      req.headers["api-key"] ||
      req.headers["authorization"]?.replace("Bearer ", "");

    if (!apiKey) {
      return res.status(401).json({ 
        error: "Unauthorized",
        message: "API key is required" 
      });
    }

    if (apiKey !== validApiKey) {
      return res.status(403).json({ 
        error: "Forbidden",
        message: "Invalid API key" 
      });
    }

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({ 
      error: "Internal Server Error",
      message: "Authentication check failed" 
    });
  }
}

module.exports = { apiKeyAuth };
