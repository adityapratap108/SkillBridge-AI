let uploadedResume = null;
async function sendToBackend(message) {
console.log("uploaded resume =>" ,  uploadedResume)
    try {
        let res;
    if(uploadedResume){
        const formData = new FormData();
        formData.append("message" , message);
        formData.append("resume" , uploadedResume);
        res = await fetch(`https://skillbridge-ai-hvp3.onrender.com/analyze`, {
            method: "POST",
            body: formData,
        })
    }
    else{
        res = await fetch(`https://skillbridge-ai-hvp3.onrender.com/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });
    }
        const data = await res.json();
        if (data.reply) {
            addMessage("ai", data.reply);
        }
        else {
            addMessage("ai" , `⚠️ ${data.error || "Unexpected response."}`)
        }
    } catch (err) {
        console.log("api error :" , err)
        addMessage("ai", err);

    }

}
