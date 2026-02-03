import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_REAL_API_KEY",
  authDomain: "pyqs-website.firebaseapp.com",
  projectId: "pyqs-website",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
const semester = params.get("semester");
const subject = params.get("subject");

const list = document.getElementById("pyq-list");
const title = document.getElementById("page-title");

if (!semester || !subject) {
  list.innerHTML = "<p>Invalid selection.</p>";
  throw new Error("Missing semester or subject");
}

title.innerText = `Semester ${semester} – ${subject.replace("-", " ").toUpperCase()}`;

const q = query(
  collection(db, "pyqs"),
  where("semester", "==", semester),
  where("subject", "==", subject),
  orderBy("year", "desc")
);

const snapshot = await getDocs(q);

// hide loader once data arrives
loader.style.display = "none";

if (snapshot.empty) {
  list.innerHTML = "<p>No PYQs available for this subject.</p>";
} else {
  snapshot.forEach(doc => {
    const data = doc.data();
    list.innerHTML += `
      <div class="pyq-card">
        <h3>${data.title || "Untitled PYQ"}</h3>
        <a href="${data.url}" target="_blank">Download PDF</a>
      </div>
    `;
  });
}

console.log("DOC DATA:", data);

