const EOF = void 0;
const ENDFILETOKEN = "ENDFILETOKEN";

function HTMLLexicalParser(syntaxer) {
  let state = dataState;
  let characterReference = "";
  let tagToken = null;
  let commentToken = null;
  let attribute = null;

  this.receiveInput = function(char) {
    if (state == null) {
      throw new Error("there is an error");
    } else {
      state = state(char);
    }
  };

  this.reset = function() {
    state = dataState;
  };

  function dataState(c) {
    if (c == "&") {
      characterReference = "";
      characterReference += c;
      return characterReferenceState;
    }
    if (c == "<") {
      return openTagState;
    }
    if (c == "\u0000") {
      error();
      emitToken(c);
      return dataState;
    }
    if (c == EOF) {
      emitToken(ENDFILETOKEN);
      return dataState;
    }
    emitToken(c);
    return dataState;

    // 将实体字符的解析简化一下,放弃更细致的实体字符的解析
    function characterReferenceState(c) {
      if (c == ";") {
        characterReference += c;
        emitToken(characterReference);
        characterReference = "";
        return dataState;
      } else {
        characterReference += c;
        return characterReferenceState;
      }

      //   if (/[0-9A-Za-Z]/.test(c)) {
      //     return namedCharacterReferenceState(c);
      //   } else if (c == "#") {
      //     characterReference += c;
      //     return numericCharacterReferenceState;
      //   } else {
      //   }
    }
    // function namedCharacterReferenceState(c) {}
    // function numericCharacterReferenceState(c) {
    //   if (/[xX]/.test(c)) {
    //     return hexadecimalCharacterReferenceStartState;
    //   } else {
    //     return decimalCharacterReferenceStartState;
    //   }
    // }

    // function hexadecimalCharacterReferenceStartState(c) {
    //   if (/[a-fA-F]/.test(c)) {
    //     return hexadecimalCharacterReferenceStartState;
    //   } else {
    //     error();
    //     return dataState;
    //   }
    // }

    // function decimalCharacterReferenceStartState(c) {
    //   if (/[0-9]/.test(c)) {
    //     return decimalCharacterReferenceStartState;
    //   } else {
    //     error();
    //     return dataState;
    //   }
    // }

    function openTagState(c) {
      if (c == "/") {
        return endTagOpenState;
      }
      if (/[a-zA-Z]/.test(c)) {
        tagToken = new StartTagToken();
        tagToken.name = "";
        tagToken.attributes = {};
        return tagNameState(c);
      }
      // 逻辑处理很复杂QAQ，简化掉
      // if (c == "!") {
      //   return markupDeclarationOpenState;
      // }
      // if (c == "?") {
      //   return bogusCommentState;
      // }
      emitToken("<" + c);
      return error(c);
    }

    // function markupDeclarationOpenState(c) {
    //   // 逻辑好复杂啊
    // }
    function tagNameState(c) {
      if (c == "/") {
        return selfClosingStartTagState;
      }
      if (c == ">") {
        emitToken(tagToken);
        return dataState;
      }
      if (/[a-zA-Z]/.test(c)) {
        tagToken.name += c.toLowerCase();
        return tagNameState;
      }
      if (/[\u0009\u000A\u000C\u0020]/.test(c)) {
        return beforeAttributeNameState;
      }
    }
    // function bogusCommentState(c) {}
    // function commentStartState(c) {}
    function endTagOpenState(c) {
      if (/[a-zA-Z]/.test(c)) {
        tagToken = new EndTagToken();
        tagToken.name = c.toLowerCase();
        return tagNameState;
      }
      if (c == ">") {
        return dataState;
      }
      if (c == EOF) {
        emitToken(ENDFILETOKEN);
        return dataState;
      }
      // 发生错误返回 dataState
      return dataState;
    }
    function selfClosingStartTagState(c) {
      if (c == ">") {
        tagToken.selfClosing = true;
        emitToken(tagToken);
      } else {
        error();
      }
      return dataState;
    }
    function beforeAttributeNameState(c) {
      if (/[\u0009\u000A\u000C\u0020]/.test(c)) {
        return beforeAttributeNameState;
      }
      if (/[\/\>]/.test(c) || c == EOF) {
        return afterAttributeNameState(c);
      }
      if (c == "=") {
        error(c);
      }
      attribute = new Attribute();
      attribute.name = "";
      attribute.value = "";
      return attributeNameState(c);
    }
    function afterAttributeNameState(c) {
      if (/[\u0009\u000A\u000C\u0020]/.test(c)) {
        return afterAttributeNameState;
      }
      if (c == "/") {
        return selfClosingStartTagState;
      }
      if (c == ">") {
        emitToken(tagToken);
        return dataState;
      }
      if (c == "=") {
        return beforeAttributeNameState;
      }
      if (c == EOF) {
        emitToken(ENDFILETOKEN);
        return dataState;
      }
      attribute = new Attribute();
      attribute.name = "";
      attribute.value = "";
      return attributeNameState(c);
    }
    function attributeNameState(c) {
      if (/[\u0009\u000A\u000C\u0020]/.test(c) || c == "/" || c == ">" || c == EOF) {
        return afterAttributeNameState(c);
      }
      if (c == "=") {
        return beforeAttributeValueState;
      }
      if (/[A-Z]/.test(c)) {
        attribute.name += c;
      }
      if (c == "\u0000") {
        attribute.name += "\ufffd";
      } else {
        attribute.name += c;
      }
      return attributeNameState;
    }
    function beforeAttributeValueState(c) {
      if (/[\u0009\u000A\u000C\u0020]/.test(c)) {
        return beforeAttributeValueState;
      }
      if (c == '"') {
        return attributeValueDoubleQuotedState;
      }
      if (c == "'") {
        return attributeValueSingleQuotedState;
      }
      if (c == ">") {
        emitToken(tagToken);
        return dataState;
      }
      return attributeValueUnquotedState(c);
    }
    function attributeValueDoubleQuotedState(c) {
      if (c == '"') {
        tagToken.attributes[attribute.name] = attribute.value;
        return afterAttributeValueQuotedState;
      }
      // if (c == "&") {
      //     // 需要将字符集放到属性里面，先取消这个复杂的处理
      //   return characterReferenceState;
      // }
      if (c == "\u0000") {
      }
      if (c == EOF) {
        emitToken(ENDFILETOKEN);
        return dataState;
      } else {
        attribute.value += c;
        return attributeValueDoubleQuotedState;
      }
    }
    function attributeValueSingleQuotedState(c) {
      if (c == "'") {
        tagToken.attributes[attribute.name] = attribute.value;
        return afterAttributeValueQuotedState;
      }
      // if (c == "&") {
      //     // 需要将字符集放到属性里面，先取消这个复杂的处理
      //   return characterReferenceState;
      // }
      if (c == "\u0000") {
      }
      if (c == EOF) {
        emitToken(ENDFILETOKEN);
        return dataState;
      } else {
        attribute.value += c;
        return attributeValueDoubleQuotedState;
      }
    }
    function attributeValueUnquotedState(c) {
      if (/[\u0009\u000A\u000C\u0020]/.test(c)) {
        tagToken.attributes[attribute.name] = attribute.value;
        return beforeAttributeNameState;
      }
      // if (c == "&") {
      //   return characterReference;
      // }
      if (c == ">") {
        emitToken(tagToken);
        return dataState;
      }
      if (c == EOF) {
        emitToken(ENDFILETOKEN);
      }
      if (/[\'\"\<\=\`]/.test(c)) {
      }
      attribute.value += c;
      return attributeValueUnquotedState;
    }
    function afterAttributeValueQuotedState(c) {
      if (/[\u0009\u000A\u000C\u0020]/.test(c)) {
        return beforeAttributeNameState;
      }
      if (c == "/") {
        return selfClosingStartTagState;
      }
      if (c == ">") {
        emitToken(tagToken);
        return dataState;
      }
      if (c == EOF) {
        emitToken(ENDFILETOKEN);
      }
      return beforeAttributeNameState(c);
    }

    function error(c) {
      console.error("字符串解析错误，存在不能解析的字符 " + c);
    }
  }
  function emitToken(token) {
    syntaxer.receiveToken(token);
  }
}

class StartTagToken {}
class EndTagToken {}
class Attribute {}

module.exports = { StartTagToken, EndTagToken, Attribute, HTMLLexicalParser, ENDFILETOKEN };
