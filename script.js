// Helper: convert multiline text to HTML with <br>
function formatText(text) {
  return text
    .split("\n")
    .map(l => l.trim())
    .filter(l => l)
    .join("<br>");
}

// Populate preview fields from form inputs
function generateCV() {
  document.getElementById("cvName").textContent =
    document.getElementById("name").value || "Your Name";
  document.getElementById("cvTitle").textContent =
    document.getElementById("title").value || "Job Title";

  document.getElementById("cvEmail").textContent =
    document.getElementById("email").value || "";
  document.getElementById("cvPhone").textContent =
    document.getElementById("phone").value || "";

  document.getElementById("cvSummary").innerHTML =
    formatText(document.getElementById("summary").value);
  document.getElementById("cvExperience").innerHTML =
    formatText(document.getElementById("experience").value);
  document.getElementById("cvEducation").innerHTML =
    formatText(document.getElementById("education").value);
  document.getElementById("cvAchievements").innerHTML =
    formatText(document.getElementById("achievements").value);

  document.getElementById("cvSkills").innerHTML =
    formatText(document.getElementById("skills").value);
  document.getElementById("cvLanguages").innerHTML =
    formatText(document.getElementById("languages").value);
  document.getElementById("cvHobbies").innerHTML =
    formatText(document.getElementById("hobbies").value);

  // Profile picture
  const fileInput = document.getElementById("profilePic");
  const img = document.getElementById("cvPic");
  if (fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
      img.style.display = "block";
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
}

// Switch between classic and modern templates
function applyTemplate() {
  const prev = document.getElementById("cvPreview");
  prev.classList.remove("classic","modern");
  prev.classList.add(document.getElementById("templateSelect").value);
}

// Update accent color globally
function updateAccentColor() {
  const c = document.getElementById("colorPicker").value;
  document.documentElement.style.setProperty("--accent", c);
}

// Export only the CV preview as a full-width PDF
function downloadPDF() {
  generateCV();
  applyTemplate();

  const element = document.getElementById("cvPreview");

  // Temporarily expand to full width
  const origWidth = element.style.width;
  element.style.width = "100%";
  element.style.maxWidth = "none";

  const opt = {
    margin:       0.3,
    filename:     "my-cv.pdf",
    image:        { type: "jpeg", quality: 0.98 },
    html2canvas:  { scale: 2, scrollY: 0 },
    jsPDF:        { unit: "in", format: "a4", orientation: "portrait" },
    pagebreak:    { mode: ["css", "legacy"] }
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .finally(() => {
      // Restore original size
      element.style.width = origWidth;
      element.style.maxWidth = "";
    });
}

// Initialize live preview and template on load
window.addEventListener("DOMContentLoaded", () => {
  applyTemplate();
  generateCV();
  document
    .querySelectorAll(".form-section input, .form-section textarea, .form-section select")
    .forEach(el => el.addEventListener("input", () => {
      generateCV();
      applyTemplate();
    }));
});
