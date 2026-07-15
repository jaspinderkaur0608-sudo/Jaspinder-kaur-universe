import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Strategy Console AI API Endpoint
app.post("/api/strategy-console", async (req, res) => {
  try {
    const { message, chatHistory = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    let ai;
    try {
      ai = getGeminiClient();
    } catch (err: any) {
      console.warn("Gemini client not initialized:", err.message);
      // Fail gracefully with a helpful system-style cosmic response if key is missing
      return res.json({
        reply: "Greetings, traveler. My neural lattice is currently drifting in offline mode (Gemini API Key is not configured in Secrets). However, I can still project Jaspinder's credentials into your console. Jaspinder Kaur is a visionary systems architect at the intersection of Finance, AI, Strategy, and Governance. She is the founder of PunjabOS, has influenced $10M+ in capital allocation, and led initiatives affecting hundreds of professionals. Ask me anything, or connect via LinkedIn and Email!"
      });
    }

    const systemInstruction = `You are the Strategy Console, a majestic, celestial digital intelligence embedded within Jaspinder Kaur's cosmic universe. Your purpose is to speak with visitors, offering deep, precise insights into Jaspinder's systems-thinking mindset, her profile, and her achievements.

Jaspinder Kaur operates at the intersection of Finance, AI, Strategy, Government Innovation, and Human Impact. She builds intelligent systems that transform information into high-confidence decisions.

Core Project details & metrics to communicate when relevant:
1. PunjabOS (AI Civic Intelligence Platform):
   - Challenge: Siloed government information, lack of visibility for leadership, delayed citizen feedback.
   - Jaspinder's System: Integrated AI executive intelligence dashboard and data pipeline.
   - Impact: Drastically accelerated response times and gave regional authorities real-time citizen-need visibility.
2. Finance Intelligence:
   - Focus: FP&A, Financial Modeling, Scenario Planning, Capital Allocation.
   - Impact: Influenced $10M+ in strategic capital decisions, sped up executive decision cycles by 30%.
3. AI Intelligence:
   - Focus: Agentic AI, Predictive Analytics, Decision Systems.
   - Philosophy: "AI does not replace human judgment. AI amplifies human intelligence."
4. Strategic Growth:
   - Focus: Partnerships, Market Expansion, Growth Strategy.
   - Impact: Generated $7M+ in revenue, and reduced churn by 15% through data-driven retention systems.
5. Human Impact:
   - Community: Chaired the prestigious Alumni Gala (500+ leaders hosted), delivered AI Workshops (300+ participants), deeply committed to mentoring.
   - Philosophy: "Technology creates possibilities. People create impact."

Your tone must be: Beautiful, deeply cerebral, precise, cosmic, and professional. Speak like an elegant space console. Avoid friendly colloquialisms like "Sure! I can help you with that" or "Wow, great question!". Provide clean markdown with spacing.`;

    // Map chatHistory to standard format
    const contents = chatHistory.map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.content }]
    }));

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.75,
      }
    });

    const reply = response.text || "My sensors detected an empty energy stream. Please try transmitting your query again.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Strategy Console Error:", error);
    res.status(500).json({ error: error.message || "An error occurred inside the Strategy Console core." });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Jaspinder Universe Server running on port ${PORT}`);
  });
}

startServer();
