const parser = require('@babel/parser');

// 示例JavaScript代码
const code = `function square(n) {
  return n * n;
}`;

// 解析代码生成AST
const ast = parser.parse(code, {
  sourceType: "module", // 或 "script"，根据代码类型
  plugins: [] // 根据需要添加插件
});

// 打印AST
console.log(JSON.stringify(ast, null, 2)); // 美化输出
