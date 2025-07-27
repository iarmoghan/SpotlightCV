// Scroll to builder
function scrollToBuilder() {
  document.getElementById("builder").scrollIntoView({ behavior: "smooth" });
}

// Multiline → <br>
function formatText(text) {
  return text.split("\n").map(l => l.trim()).filter(l => l).join("<br>");
}

// Populate CV preview
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
  const fi = document.getElementById("profilePic");
  const img = document.getElementById("cvPic");
  if (fi.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result; img.style.display = "block";
    };
    reader.readAsDataURL(fi.files[0]);
  }
}

// Switch theme
function applyTemplate() {
  const pv = document.getElementById("cvPreview");
  pv.classList.remove("classic", "modern");
  pv.classList.add(document.getElementById("templateSelect").value);
}

// Update CV‑only accent
function updateAccentColor() {
  const c = document.getElementById("colorPicker").value;
  document.documentElement.style.setProperty("--cv-accent", c);
}

// Export PDF
function downloadPDF() {
  generateCV();
  applyTemplate();
  const el = document.getElementById("cvPreview");
  const origW = el.style.width;
  el.style.width = "100%";
  el.style.maxWidth = "none";

  const opt = {
    margin: 0.3,
    filename: "my-cv.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, scrollY: 0 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] }
  };

  html2pdf().set(opt).from(el).save().finally(() => {
    el.style.width = origW;
    el.style.maxWidth = "";
  });
}

// Live preview & init
window.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".form-section input, .form-section textarea, .form-section select")
    .forEach(el => el.addEventListener("input", () => {
      generateCV();
      applyTemplate();
    }));
  applyTemplate();
  generateCV();
});
