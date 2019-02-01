// Pomoćne funkcije

// Dodaje postotke i ukupne bodove od matura
export const calculatePercentagesAndTotalMaturaPoints = (...args) => [...args].reduce((a, b) => parseFloat(a, 10) + parseFloat(b, 10), 0);

// Računa bodove od prosjeka srednje škole
export const calculateTotalGradePoints = (percentagesTotal, evaluationSchoolGrades) => Math.round((percentagesTotal / 4).toFixed(2) / 5 * evaluationSchoolGrades * 10);

// Računa broj bodova od obveznih predmeta državne mature
export const calculateMaturaPoints = (percentage, evaluation, maturaLevel) => Math.round(percentage * evaluation * 10 * (maturaLevel === 'A' ? 1.6 : 1) / 160);

// Računa broj bodova od dodatnih predmeta državne mature
export const calculatePoints = (percentage, evaluation) => Math.round(percentage * evaluation / 10);
