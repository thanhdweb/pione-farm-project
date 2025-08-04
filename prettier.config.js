/** @type {import("prettier").Config} */
module.exports = {
  semi: true, // thêm dấu ; cuối dòng
  singleQuote: true, // dùng ' thay vì "
  trailingComma: "all", // có dấu , cuối object/array
  printWidth: 100, // tối đa 100 ký tự mỗi dòng
  tabWidth: 2, // 2 khoảng trắng mỗi tab
  arrowParens: "always", // luôn có ngoặc trong arrow function
  endOfLine: "auto", // tránh lỗi xuống dòng khác nhau trên Windows/Linux
};
