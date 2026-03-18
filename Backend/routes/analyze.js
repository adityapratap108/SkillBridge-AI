const express = require('express');
const analyzeRoute = express.Router();
const upload = require('../middleware/upload');
const { extractTextFromResume } = require('../services/resumeParser');
const { analyzeWithClaude } = require('../services/ai');

analyzeRoute.post('/' , upload.single('resume') , async (req, res) => {

    console.log("req.file →", req.file ? req.file.originalname : "NO FILE");
    console.log("req.body →", req.body);
 try{
  const jobRole = req.body.message?.trim();
  if (!jobRole) {
    return res.status(400).json({ error: "Please provide job role" });
  }
  let resumeText = "";
  if (req.file) {
    resumeText = await extractTextFromResume(req.file.buffer , req.file.originalname);
  }
  const analysis = await analyzeWithClaude(jobRole, resumeText);
  const reply = formatAsHTML(analysis);
  res.json({ reply });
 }
 catch(error){
  console.log(error)
  res.status(500).json({error: error.message});
 }
 function formatAsHTML(data){
  const {
    jobRole = "",
    requiredSkills =[],
    candidateSkills = [],
    skillGaps = [],
    learningRoadmap = [],
    summary = ""
  } = data ;
  let html = ""
  html += `<strong>🎯Analysis for ${jobRole}</strong><br><br>`;
  html += `<em>${summary}</em><br><br>`;
  if(requiredSkills.length){
    html += `<strong>✅ Required Skills:</strong><br>`
    html += requiredSkills.map(s => `• ${s}`).join("<br>") + "<br><br>";
  }
  if (candidateSkills.length) {
        html += `<strong>🧑‍💻 Your Current Skills:</strong><br>`;
        html += candidateSkills.map(s => `• ${s}`).join("<br>") + "<br><br>";
  }
  if (skillGaps.length) {
        html += `<strong>⚠️ Skill Gaps:</strong><br>`;
        skillGaps.forEach(({ skill, priority, reason }) => {
            const dot = priority === "High" ? "🔴" : priority === "Medium" ? "🟡" : "🟢";
            html += `${dot} <strong>${skill}</strong> (${priority}) — ${reason}<br>`;
        });
        html += "<br>";
  }
   if (learningRoadmap.length) {
        html += `<strong>🗺️ Learning Roadmap:</strong><br>`;
        learningRoadmap.forEach(({ phase, title, duration, skills, resources }) => {
            html += `<br><strong>Phase ${phase}: ${title}</strong> (${duration})<br>`;
            html += `Skills: ${skills.join(", ")}<br>`;
            if (resources?.length) {
                resources.forEach(({ name, type, url }) => {
                    const link = url
                        ? `<a href="${url}" target="_blank">${name}</a>`
                        : name;
                    html += `&nbsp;&nbsp;📌 ${link} — ${type}<br>`;
                });
            }
        });
  }
  return html;
}
})
module.exports = analyzeRoute;