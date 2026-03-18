const uploadBtn = document.getElementById("uploadBtn");
const resumeUpload = document.getElementById("resumeUpload");

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

if (mode === "with") {
    uploadBtn.style.display = "block";
}

uploadBtn.addEventListener("click", () => {
    resumeUpload.click();
});


resumeUpload.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const allowed = ["pdf", "doc", "docx"];

    const ext = file.name.split(".").pop().toLowerCase();

    if (!allowed.includes(ext)) {

        alert("Upload PDF/DOC/DOCX only");
        return;

    }
    uploadedResume = this.files[0];

    addMessage("ai", `📄 Resume uploaded: ${uploadedResume.name}`);

});
