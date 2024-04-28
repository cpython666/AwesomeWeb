const parser = require('@babel/parser');

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code, {
  sourceType: "module", // 或 "script" 根据代码类型选择
  plugins: [
    // 如果需要使用的话，可以添加额外的语言特性支持
    "jsx", // 支持JSX
    "typescript" // 支持TypeScript
  ]
});
console.log(ast)