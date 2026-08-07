import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
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
  orderBy("year", "desc"),
);

const snapshot = await getDocs(q);

// hide loader once data arrives
loader.style.display = "none";

if (snapshot.empty) {
  list.innerHTML = "<p>No PYQs available for this subject.</p>";
} else {
  snapshot.forEach((doc) => {
    const data = doc.data();
    list.innerHTML += `
      <div class="pyq-card group relative bg-[#121215] border border-[#27272a] hover:border-[#a78bfa]/60 rounded-2xl p-6 flex flex-col items-start text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#a78bfa]/10">
        <div class="w-12 h-12 mb-4 rounded-xl bg-[#7c3aed]/15 border border-[#7c3aed]/30 flex items-center justify-center text-[#a78bfa] group-hover:scale-105 group-hover:bg-[#7c3aed]/25 transition-all">
          <span class="material-symbols-outlined text-xl">picture_as_pdf</span>
        </div>
        <h3 class="text-base font-bold text-white mb-1">${data.title || "Untitled PYQ"}</h3>
        <p class="text-xs uppercase tracking-widest font-semibold text-[#a1a1aa] mb-6">${data.year ? data.year + " · " : ""}Semester ${semester}</p>
        <a href="${data.url}" target="_blank" data-href="${data.url}"
  class="pyq-download-btn mt-auto w-full bg-[#a78bfa]/15 border border-[#a78bfa]/35 group-hover:bg-[#a78bfa] group-hover:text-[#0a0012] group-hover:border-[#a78bfa] text-[#ede9fe] px-5 py-2.5 rounded-lg font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1.5">
          <span>Download PDF</span>
          <span class="material-symbols-outlined text-sm">download</span>
        </a>
      </div>
    `;
  });
}

console.log("DOC DATA:", data);
