export const validate = {
  required: (value, field) => !!value || `${field} is required`,
  minlength: (value) =>
    value.length >= 8 || "Password is least is 8 characters",
  email: (value) =>
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    ) || "Email must be valid",
  telephone: (value) => /^0\d{9}$/.test(value) || "Telephone must be valid",

};


// function getTextDescription(string , arr){
//   for (const item of arr) {
//     if (item.value == string) {
//       return item.label;
//     }
//   }
// }
//
// export function getDescription() {
//   return { getTextDescription}
// }

