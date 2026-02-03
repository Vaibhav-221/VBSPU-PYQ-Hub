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
    "Discrete Mathematics",
    "Object Oriented Programming (Java)",
    "Computer Organization & Architecture",
    "Operating Systems",
    "Universal Human Values"
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
  
    subjects.forEach(subject => {
      const card = document.createElement("div");
      card.className = "subject-card";
  
      card.innerHTML = `
        <h3>${subject}</h3>
        <button>View PYQs</button>
      `;
  
      card.querySelector("button").addEventListener("click", () => {
        const subjectKey = subject.toLowerCase().replace(/\s+/g, "-");
        window.location.href =
          `papers.html?semester=${semester}&subject=${subjectKey}`;
      });
  
      subjectList.appendChild(card);
    });
  });
  

