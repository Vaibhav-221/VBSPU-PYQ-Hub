export const semesterSubjects: Record<number, string[]> = {
  1: ["FEC", "FME", "Chemistry", "Soft Skill", "Mathmatics-I"],
  2: [
    "Engineering Mathematics II",
    "Environment and Ecology",
    "PPS",
    "FEE",
    "Physics",
  ],
  3: [
    "COA",
    "DSTL",
    "Data Structure",
    "Cyber Security",
    "Universal Human Values",
    "Digital Electronics",
  ],
  4: [
    "Database Management Systems",
    "Design & Analysis of Algorithms",
    "Software Engineering",
    "Computer Networks",
    "Probability & Statistics",
  ],
  5: [
    "Artificial Intelligence",
    "Web Technologies",
    "Theory of Computation",
    "Compiler Design",
    "Elective I",
  ],
  6: [
    "Machine Learning",
    "Cloud Computing",
    "Data Mining",
    "Information Security",
    "Elective II",
  ],
  7: [
    "Major Project Phase I",
    "Industrial Training / Internship",
    "Elective III",
  ],
  8: [
    "Major Project Phase II",
    "Internship / Seminar",
    "Elective IV",
  ],
};

export const semesters = Array.from({ length: 8 }, (_, index) => {
  const semester = index + 1;
  return {
    number: semester,
    year: `${Math.ceil(semester / 2)}${["st", "nd", "rd", "th"][Math.min(Math.ceil(semester / 2) - 1, 3)]} Year`,
  };
});

export function subjectSlug(subject: string) {
  return subject
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findSubject(semester: number, slug: string) {
  return semesterSubjects[semester]?.find(
    (subject) => subjectSlug(subject) === slug,
  );
}
