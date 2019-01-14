export const calculatePoints = (percentage, evaluation) => Math.round(percentage * evaluation / 10);
export const calculateMaturaPoints = (percentage, evaluation, maturaLevel) => Math.round(percentage * evaluation * 10 * (maturaLevel === 'A' ? 1.6 : 1) / 160);
export const calculatePercentages = (...args) => [...args].reduce((a, b) => parseFloat(a, 10) + parseFloat(b, 10), 0);
export const calculateTotalGradePoints = (percentagesTotal, evaluationSchoolGrades) => Math.round((percentagesTotal / 4).toFixed(2) / 5 * evaluationSchoolGrades * 10);
export const calculateTotalMaturaPoints = (...args) => [...args].reduce((a, b) => a + b, 0);
