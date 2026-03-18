const Groq = require("groq-sdk");

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `
You are SkillBridge AI, an expert career coach and technical skills analyst.

When given a job role and optionally a resume, you must return ONLY this JSON structure and nothing else:
{
  "jobRole": "",
  "requiredSkills": [],
  "candidateSkills": [],
  "skillGaps": [
    { "skill": "", "priority": "High | Medium | Low", "reason": "" }
  ],
  "learningRoadmap": [
    {
      "phase": 1,
      "title": "",
      "duration": "",
      "skills": [],
      "resources": [
        { "name": "", "type": "Course | Book | Practice | Docs", "url": "" }
      ]
    }
  ],
  "summary": ""
}
Important rules:
- skillGaps must ONLY contain skills the candidate is missing — never include skills already in candidateSkills
- learningRoadmap must ONLY include skills from skillGaps — never include skills the candidate already knows
- candidateSkills must list every skill found in the resume
- If no resume is provided set candidateSkills to []
- Keep your language encouraging, practical and concise.
`.trim();

async function analyzeWithClaude(jobRole, resumeText = "") {

    const hasResume = resumeText.length > 0;

    const userMessage = hasResume
        ? `Job Role I am targeting: ${jobRole}\n\nMy Resume:\n${resumeText}`
        : `Job Role I am targeting: ${jobRole}\n\nNo resume provided.`;

    const response = await client.chat.completions.create({
        model:    "llama-3.3-70b-versatile",   // free and very capable model
        messages: [
            { role: "system",  content: SYSTEM_PROMPT },
            { role: "user",    content: userMessage   }
        ],
        temperature: 0.7,
        max_tokens:  2048,
    });

    const rawText = response.choices[0].message.content;

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
        throw new Error("Groq did not return valid JSON");
    }

    return JSON.parse(jsonMatch[0]);
}

module.exports = { analyzeWithClaude };