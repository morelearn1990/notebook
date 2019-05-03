const { DOMSyntaxer } = require("./DOMSyntaxer");
const { HTMLLexicalParser } = require("./DOMlexer");

const syntaxer = new DOMSyntaxer();
const lexer = new HTMLLexicalParser(syntaxer);

const testHTML = `<html maaa=a >
    <head>
        <title>cool</title>
    </head>
    <body>
        <img src="a" />
        <a>asdf</a>
    </body>
</html>`;

for (let c of testHTML) {
  lexer.receiveInput(c);
}

console.log(JSON.stringify(syntaxer.domTree, null, 2));
