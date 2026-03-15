async function sendToBackend(message) {

    try {

        const res = await fetch("http://localhost:5000/analyze", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await res.json();

        addMessage("ai", data.reply);

    } catch (err) {

        addMessage("ai", "⚠️ Server error");

    }

}
