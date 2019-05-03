const { HTMLLexicalParser } = require("./DOMlexer");

const testHTML = `<html maaa=cc >
    <head>
        <title>cool</title>
    </head>
    <body>
        <img src="ac" />
    </body>
</html>`;

const dummySyntaxer = {
  receiveToken: token => {
    if (typeof token === "string") {
      console.log(`String(${token.replace(/\n/, "\\n").replace(/ /, "<whitespace>")})`);
    } else {
      console.log(token);
    }
  }
};

const lexer = new HTMLLexicalParser(dummySyntaxer);

for (let c of testHTML) {
  lexer.receiveInput(c);
}
