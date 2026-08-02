document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const semester = params.get("semester");

  if (!semester) {
    document.body.innerHTML = "<h3>Semester not found</h3>";
    return;
  }

  document.getElementById("sem-title").innerText =
    `Subjects for Semester ${semester}`;

  const subjectsBySemester = {
    1: ["FEC", "FME", "Chemistry", "Soft Skill", "Mathmatics-I"],

    2: [
      "Engineering Mathematics II",
      "Environment and Ecology",
      "PPS",
      "FEE",
      "Physics"
    ],

    3: [
      "COA",
      "DSTL",
      "Data Structure",
      "Cyber Security",
      "Universal Human Values",
      "Digital Electronics"
    ],

    4: [
      "Database Management Systems",
      "Design & Analysis of Algorithms",
      "Software Engineering",
      "Computer Networks",
      "Probability & Statistics"
    ],

    5: [
      "Artificial Intelligence",
      "Web Technologies",
      "Theory of Computation",
      "Compiler Design",
      "Elective I"
    ],

    6: [
      "Machine Learning",
      "Cloud Computing",
      "Data Mining",
      "Information Security",
      "Elective II"
    ],

    7: [
      "Major Project Phase I",
      "Industrial Training / Internship",
      "Elective III"
    ],

    8: [
      "Major Project Phase II",
      "Internship / Seminar",
      "Elective IV"
    ]
  };

  const subjectList = document.getElementById("subject-list");
  const subjects = subjectsBySemester[semester];

  if (!subjects || subjects.length === 0) {
    subjectList.innerHTML =
      `<p class="col-span-full text-center text-sm text-[#a1a1aa]">No subjects found for Semester ${semester}.</p>`;
    return;
  }

  subjects.forEach(subject => {
    const card = document.createElement("div");
    card.className =
      "subject-card group relative bg-[#121215] border border-[#27272a] hover:border-[#a78bfa]/60 rounded-2xl p-6 flex flex-col items-start text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#a78bfa]/10";

    card.innerHTML = `
      <div class="w-12 h-12 mb-4 rounded-xl bg-[#7c3aed]/15 border border-[#7c3aed]/30 flex items-center justify-center text-[#a78bfa] group-hover:scale-105 group-hover:bg-[#7c3aed]/25 transition-all">
        <span class="material-symbols-outlined text-xl">menu_book</span>
      </div>
      <h3 class="text-base font-bold text-white mb-1">${subject}</h3>
      <p class="text-xs uppercase tracking-widest font-semibold text-[#a1a1aa] mb-6">Semester ${semester}</p>
      <button class="mt-auto w-full bg-[#18181b] border border-[#27272a] group-hover:bg-[#a78bfa] group-hover:text-[#0a0012] group-hover:border-[#a78bfa] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1.5">
        <span>View PYQs</span>
        <span class="material-symbols-outlined text-sm">arrow_forward</span>
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      const subjectKey = subject.toLowerCase().replace(/\s+/g, "-");
      window.location.href =
        `papers.html?semester=${semester}&subject=${subjectKey}`;
    });

    subjectList.appendChild(card);
  });
});