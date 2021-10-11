# 如何基于 TypeScript 和 swagger 后端文档进行接口智能提示和校验

## 一、TypeScript 介绍以及不错的野文章

[TypeScript](https://www.typescriptlang.org/) 是一种建立在 JavaScript 之上的强类型编程语言，可在任何规模的项目上为您提供的优质的开发工具和美妙的开发体验。

以下是社区里面优秀的文章：

[《语义化表达 —— 构建类型优先的交互体系》](https://www.yuque.com/xufei-coder/code/fhoks9)

[《一份不可多得的 TS 学习指南（1.8W 字）》](https://juejin.cn/post/6872111128135073806#heading-23)

本文的内容的 demo 代码，我将在完善后放到 [swagger2ts](https://github.com/morelearn1990/demo/tree/main/swagger2ts)

## 二、通过 TypeScript 函数重载扩展请求库实现接口智能提示和校验

通过 TypeScript 对不同的请求接口进行声明。

```typescript
// requsetTs.ts
import requestImplementation from "./request";

function get(
    url: "/api/1",
    config: {
        params: { a?: string; b: number };
    }
): Promise<{
    list: Array<{ id: number; name: string }>;
    current: number;
    total: number;
}>;
function get(
    url: "/api/3",
    config: {
        params: { aaa: string };
    }
): Promise<{
    list: Array<{ id: number; name: string }>;
    current: number;
    total: number;
}>;
function get(url: string, config: any) {
    return requestImplementation(url, "get", config);
}

function post(
    url: "/api/1",
    config: {
        data: { a: string; b: number };
    }
): Promise<{
    id: string;
    a: string;
    b: number;
}>;
function post(
    url: "/api/2",
    config: {
        data: { a: number; b: string };
    }
): Promise<{ id: string; a: number; b: string }>;
function post(url: string, config: any) {
    return requestImplementation(url, "post", config);
}

export { get, post };
```

在写代码时，通过 vscode 编辑器对 TypeScript 的优秀支持，我们可以在编写代码时直接通过提示看到对应接口需要的参数和配置。如下图所示：

![1.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d96832e3690a4b53906459665ff7c421~tplv-k3u1fbpfcp-watermark.image?)

请求得到的数据，也可以直接得到提示

![2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e47f8fca87264f2ba7baf5b7e04aa54d~tplv-k3u1fbpfcp-watermark.image?)

当参数有错时，则会被 typescript 校验错误，同时在 `git commit` 阶段做好校验，则可以避免错误代码提交到远程仓库。

## 三、通过代码将 swagger 文档转换为 TypeScript 类型文件

通过观察发现 swagger json 文档文件为制式化的内容，于是可以通过代码转换成我们需要的类型文件。比如如下格式的转换：

```json
{
    "paths": {
        "/order/{id}/issue": {
            "parameters": [
                {
                    "in": "path",
                    "name": "id",
                    "required": true,
                    "type": "string",
                    "format": "compassdigital.id",
                    "description": "The order ID"
                }
            ],
            "get": {
                "operationId": "create_order_issue",
                "summary": "Create an issue with an order",
                "tags": ["order"],
                "security": [{ "bearerAuth": [] }],
                "parameters": [
                    {
                        "in": "query",
                        "name": "lang",
                        "description": "The language of the user ex en, fr",
                        "required": false,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Order issue response",
                        "schema": { "$ref": "#/definitions/Issue" }
                    },
                    "400": {
                        "description": "Unknown error",
                        "schema": { "$ref": "#/definitions/Error" }
                    }
                }
            }
        }
    },
    "definitions": {
        "Error": {
            "type": "object",
            "properties": { "error": { "type": "string" }, "code": { "type": "number" } }
        },
        "Issue": {
            "type": "object",
            "properties": {
                "id": { "type": "string", "format": "compassdigital.id", "description": "issue" },
                "type": { "type": "string" },
                "items": {
                    "description": "Array of Items with issues",
                    "type": "array",
                    "items": { "$ref": "#/definitions/ItemsWithIssue" }
                },
                "reason": { "type": "string", "description": "Reason for dispute", "x-deprecated": true },
                "meta": { "type": "object", "additionalProperties": true }
            }
        },
        "ItemsWithIssue": { "type": "string", "format": "compassdigital.id", "description": "issue" }
    }
}
```

转换为如下接口类型：

```ts
function get(
    url: "/order/{id}/issue",
    config: {
        params: { id: string };
        query: { lang?: string };
    }
): Promise<{
    id: string;
    type: string;
    items: Array<string>;
    reason: string;
    meta: object;
}>;
```

swagger2ts 的实现方法可以参考 [swagger-typescript](https://www.npmjs.com/package/swagger-typescript)

## 四、实现 git commit 或运行 CI/CD 流水线校验类型和代码质量

类型校验可以根据项目配置使用推荐的类型校验工具进行校验，比如 eslint,vuedx（针对 vue3）等，再配合`lint-staged`、`husky`进行 `git commit` 时的校验，在运行 `CI/CD` 工具时，可以通过运行 `npm script` 脚本进行校验或构建。项目的配置方法可以参考[从零开始配置 TypeScript 项目](https://juejin.cn/post/6856410900577026061?utm_source=gold_browser_extension)

## 参考文档

1.[《TypeScript 文档》](https://www.typescriptlang.org/)

2.[《语义化表达 —— 构建类型优先的交互体系》](https://www.yuque.com/xufei-coder/code/fhoks9)

3.[《一份不可多得的 TS 学习指南（1.8W 字）》](https://juejin.cn/post/6872111128135073806#heading-23)

4.[《从零开始配置 TypeScript 项目》](https://juejin.cn/post/6856410900577026061?utm_source=gold_browser_extension)
