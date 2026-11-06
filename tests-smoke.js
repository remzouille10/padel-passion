// Smoke tests for classic set validation (run in browser console after app.js loads)
console.assert(validateSet("6","0","")===null,"6-0 valid");
console.assert(validateSet("7","5","")===null,"7-5 valid");
console.assert(validateSet("7","6","7-5")===null,"7-6 with tiebreak valid");
console.assert(!!validateSet("6","5",""),"6-5 invalid");
console.assert(!!validateSet("6","6",""),"6-6 invalid");
console.assert(!!validateSet("8","6",""),"8-6 invalid");
console.assert(!!validateSet("7","6","6-5"),"invalid tiebreak invalid");

console.assert(validateSet("7","6","")===null,"7-6 valid without remembering tiebreak score");
console.assert(validateSet("7","6","7-5")===null,"7-6 with optional tiebreak valid");
console.assert(!!validateSet("7","6","6-5"),"if entered, malformed/too-short tiebreak rejected");
