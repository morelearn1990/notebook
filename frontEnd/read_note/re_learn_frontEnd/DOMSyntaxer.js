const { StartTagToken, EndTagToken, ENDFILETOKEN } = require("./DOMlexer");

class Node {
  constructor(name) {
    this.name = name;
  }
  [Symbol.toStringTag]() {
    return `Element<${this.name}>`;
  }
}
class DocumentNode extends Node {
  constructor() {
    super("document");
    this.children = [];
  }
}
class Element extends Node {
  constructor(token) {
    super(token.name);
    this.attributes = token.attributes;
    this.children = [];
  }
}
class Text extends Node {
  constructor(token) {
    super("text");
    this.value = token || "";
  }
}

class DOMSyntaxer {
  constructor() {
    this.stack = [new DocumentNode()];
  }
  get stackLast() {
    return this.stack[this.stack.length - 1];
  }
  get domTree() {
    return this.stack[0];
  }
  receiveToken(token) {
    console.log("token", token);
    let stackLast = this.stackLast;
    console.log("stackLast", stackLast);
    // 字符串，当时两个空白符的时候需要进行合并，这儿暂时不做处理
    if (typeof token === "string") {
      if (stackLast instanceof Text) {
        stackLast.value += token;
      } else {
        let text = new Text(token);
        this.stack.push(text);
        stackLast.children.push(text);
      }
    } else {
      if (stackLast instanceof Text) {
        this.stack.pop();
        stackLast = this.stackLast;
      }
    }
    // 标签开始处理，当标签开始时就直接放到栈里面去
    if (token instanceof StartTagToken) {
      let element = new Element(token);
      stackLast.children.push(element);
      if (!token.selfClosing) {
        this.stack.push(element);
      }
    }
    // 标签闭合处理，当上一个是当前标签的开始标签的时候就进行处理，否则就忽略
    if (token instanceof EndTagToken) {
      if (stackLast && token.name === stackLast.name) {
        this.stack.pop();
      }
    }
  }
}

module.exports = { DOMSyntaxer };
