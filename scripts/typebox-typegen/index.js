// scripts/typebox-typegen/index.ts
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { createWriteStream } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, extname, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// node_modules/@sinclair/typebox/build/import/type/guard/value.mjs
function IsArray(value) {
  return Array.isArray(value);
}
function IsBigInt(value) {
  return typeof value === "bigint";
}
function IsBoolean(value) {
  return typeof value === "boolean";
}
function IsNumber(value) {
  return typeof value === "number";
}
function IsObject(value) {
  return typeof value === "object" && value !== null;
}
function IsString(value) {
  return typeof value === "string";
}
function IsUndefined(value) {
  return value === void 0;
}

// node_modules/@sinclair/typebox/build/import/type/symbols/symbols.mjs
var TransformKind = Symbol.for("TypeBox.Transform");
var ReadonlyKind = Symbol.for("TypeBox.Readonly");
var OptionalKind = Symbol.for("TypeBox.Optional");
var Hint = Symbol.for("TypeBox.Hint");
var Kind = Symbol.for("TypeBox.Kind");

// node_modules/@sinclair/typebox/build/import/type/guard/type.mjs
var KnownTypes = [
  "Any",
  "Array",
  "AsyncIterator",
  "BigInt",
  "Boolean",
  "Constructor",
  "Date",
  "Enum",
  "Function",
  "Integer",
  "Intersect",
  "Iterator",
  "Literal",
  "MappedKey",
  "MappedResult",
  "Not",
  "Null",
  "Number",
  "Object",
  "Promise",
  "Record",
  "Ref",
  "RegExp",
  "String",
  "Symbol",
  "TemplateLiteral",
  "This",
  "Tuple",
  "Undefined",
  "Union",
  "Uint8Array",
  "Unknown",
  "Void"
];
function IsPattern(value) {
  try {
    new RegExp(value);
    return true;
  } catch {
    return false;
  }
}
function IsControlCharacterFree(value) {
  if (!IsString(value))
    return false;
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code >= 7 && code <= 13 || code === 27 || code === 127) {
      return false;
    }
  }
  return true;
}
function IsAdditionalProperties(value) {
  return IsOptionalBoolean(value) || IsSchema(value);
}
function IsOptionalBigInt(value) {
  return IsUndefined(value) || IsBigInt(value);
}
function IsOptionalNumber(value) {
  return IsUndefined(value) || IsNumber(value);
}
function IsOptionalBoolean(value) {
  return IsUndefined(value) || IsBoolean(value);
}
function IsOptionalString(value) {
  return IsUndefined(value) || IsString(value);
}
function IsOptionalPattern(value) {
  return IsUndefined(value) || IsString(value) && IsControlCharacterFree(value) && IsPattern(value);
}
function IsOptionalFormat(value) {
  return IsUndefined(value) || IsString(value) && IsControlCharacterFree(value);
}
function IsOptionalSchema(value) {
  return IsUndefined(value) || IsSchema(value);
}
function IsAny(value) {
  return IsKindOf(value, "Any") && IsOptionalString(value.$id);
}
function IsArray2(value) {
  return IsKindOf(value, "Array") && value.type === "array" && IsOptionalString(value.$id) && IsSchema(value.items) && IsOptionalNumber(value.minItems) && IsOptionalNumber(value.maxItems) && IsOptionalBoolean(value.uniqueItems) && IsOptionalSchema(value.contains) && IsOptionalNumber(value.minContains) && IsOptionalNumber(value.maxContains);
}
function IsAsyncIterator(value) {
  return IsKindOf(value, "AsyncIterator") && value.type === "AsyncIterator" && IsOptionalString(value.$id) && IsSchema(value.items);
}
function IsBigInt2(value) {
  return IsKindOf(value, "BigInt") && value.type === "bigint" && IsOptionalString(value.$id) && IsOptionalBigInt(value.exclusiveMaximum) && IsOptionalBigInt(value.exclusiveMinimum) && IsOptionalBigInt(value.maximum) && IsOptionalBigInt(value.minimum) && IsOptionalBigInt(value.multipleOf);
}
function IsBoolean2(value) {
  return IsKindOf(value, "Boolean") && value.type === "boolean" && IsOptionalString(value.$id);
}
function IsConstructor(value) {
  return IsKindOf(value, "Constructor") && value.type === "Constructor" && IsOptionalString(value.$id) && IsArray(value.parameters) && value.parameters.every((schema) => IsSchema(schema)) && IsSchema(value.returns);
}
function IsDate(value) {
  return IsKindOf(value, "Date") && value.type === "Date" && IsOptionalString(value.$id) && IsOptionalNumber(value.exclusiveMaximumTimestamp) && IsOptionalNumber(value.exclusiveMinimumTimestamp) && IsOptionalNumber(value.maximumTimestamp) && IsOptionalNumber(value.minimumTimestamp) && IsOptionalNumber(value.multipleOfTimestamp);
}
function IsFunction(value) {
  return IsKindOf(value, "Function") && value.type === "Function" && IsOptionalString(value.$id) && IsArray(value.parameters) && value.parameters.every((schema) => IsSchema(schema)) && IsSchema(value.returns);
}
function IsInteger(value) {
  return IsKindOf(value, "Integer") && value.type === "integer" && IsOptionalString(value.$id) && IsOptionalNumber(value.exclusiveMaximum) && IsOptionalNumber(value.exclusiveMinimum) && IsOptionalNumber(value.maximum) && IsOptionalNumber(value.minimum) && IsOptionalNumber(value.multipleOf);
}
function IsProperties(value) {
  return IsObject(value) && Object.entries(value).every(([key, schema]) => IsControlCharacterFree(key) && IsSchema(schema));
}
function IsIntersect(value) {
  return IsKindOf(value, "Intersect") && (IsString(value.type) && value.type !== "object" ? false : true) && IsArray(value.allOf) && value.allOf.every((schema) => IsSchema(schema) && !IsTransform(schema)) && IsOptionalString(value.type) && (IsOptionalBoolean(value.unevaluatedProperties) || IsOptionalSchema(value.unevaluatedProperties)) && IsOptionalString(value.$id);
}
function IsIterator(value) {
  return IsKindOf(value, "Iterator") && value.type === "Iterator" && IsOptionalString(value.$id) && IsSchema(value.items);
}
function IsKindOf(value, kind) {
  return IsObject(value) && Kind in value && value[Kind] === kind;
}
function IsLiteral(value) {
  return IsKindOf(value, "Literal") && IsOptionalString(value.$id) && IsLiteralValue(value.const);
}
function IsLiteralValue(value) {
  return IsBoolean(value) || IsNumber(value) || IsString(value);
}
function IsMappedKey(value) {
  return IsKindOf(value, "MappedKey") && IsArray(value.keys) && value.keys.every((key) => IsNumber(key) || IsString(key));
}
function IsMappedResult(value) {
  return IsKindOf(value, "MappedResult") && IsProperties(value.properties);
}
function IsNever(value) {
  return IsKindOf(value, "Never") && IsObject(value.not) && Object.getOwnPropertyNames(value.not).length === 0;
}
function IsNot(value) {
  return IsKindOf(value, "Not") && IsSchema(value.not);
}
function IsNull(value) {
  return IsKindOf(value, "Null") && value.type === "null" && IsOptionalString(value.$id);
}
function IsNumber2(value) {
  return IsKindOf(value, "Number") && value.type === "number" && IsOptionalString(value.$id) && IsOptionalNumber(value.exclusiveMaximum) && IsOptionalNumber(value.exclusiveMinimum) && IsOptionalNumber(value.maximum) && IsOptionalNumber(value.minimum) && IsOptionalNumber(value.multipleOf);
}
function IsObject2(value) {
  return IsKindOf(value, "Object") && value.type === "object" && IsOptionalString(value.$id) && IsProperties(value.properties) && IsAdditionalProperties(value.additionalProperties) && IsOptionalNumber(value.minProperties) && IsOptionalNumber(value.maxProperties);
}
function IsPromise(value) {
  return IsKindOf(value, "Promise") && value.type === "Promise" && IsOptionalString(value.$id) && IsSchema(value.item);
}
function IsRecord(value) {
  return IsKindOf(value, "Record") && value.type === "object" && IsOptionalString(value.$id) && IsAdditionalProperties(value.additionalProperties) && IsObject(value.patternProperties) && ((schema) => {
    const keys = Object.getOwnPropertyNames(schema.patternProperties);
    return keys.length === 1 && IsPattern(keys[0]) && IsObject(schema.patternProperties) && IsSchema(schema.patternProperties[keys[0]]);
  })(value);
}
function IsRef(value) {
  return IsKindOf(value, "Ref") && IsOptionalString(value.$id) && IsString(value.$ref);
}
function IsRegExp(value) {
  return IsKindOf(value, "RegExp") && IsOptionalString(value.$id) && IsString(value.source) && IsString(value.flags) && IsOptionalNumber(value.maxLength) && IsOptionalNumber(value.minLength);
}
function IsString2(value) {
  return IsKindOf(value, "String") && value.type === "string" && IsOptionalString(value.$id) && IsOptionalNumber(value.minLength) && IsOptionalNumber(value.maxLength) && IsOptionalPattern(value.pattern) && IsOptionalFormat(value.format);
}
function IsSymbol(value) {
  return IsKindOf(value, "Symbol") && value.type === "symbol" && IsOptionalString(value.$id);
}
function IsTemplateLiteral(value) {
  return IsKindOf(value, "TemplateLiteral") && value.type === "string" && IsString(value.pattern) && value.pattern[0] === "^" && value.pattern[value.pattern.length - 1] === "$";
}
function IsThis(value) {
  return IsKindOf(value, "This") && IsOptionalString(value.$id) && IsString(value.$ref);
}
function IsTransform(value) {
  return IsObject(value) && TransformKind in value;
}
function IsTuple(value) {
  return IsKindOf(value, "Tuple") && value.type === "array" && IsOptionalString(value.$id) && IsNumber(value.minItems) && IsNumber(value.maxItems) && value.minItems === value.maxItems && // empty
  (IsUndefined(value.items) && IsUndefined(value.additionalItems) && value.minItems === 0 || IsArray(value.items) && value.items.every((schema) => IsSchema(schema)));
}
function IsUndefined2(value) {
  return IsKindOf(value, "Undefined") && value.type === "undefined" && IsOptionalString(value.$id);
}
function IsUnion(value) {
  return IsKindOf(value, "Union") && IsOptionalString(value.$id) && IsObject(value) && IsArray(value.anyOf) && value.anyOf.every((schema) => IsSchema(schema));
}
function IsUint8Array(value) {
  return IsKindOf(value, "Uint8Array") && value.type === "Uint8Array" && IsOptionalString(value.$id) && IsOptionalNumber(value.minByteLength) && IsOptionalNumber(value.maxByteLength);
}
function IsUnknown(value) {
  return IsKindOf(value, "Unknown") && IsOptionalString(value.$id);
}
function IsUnsafe(value) {
  return IsKindOf(value, "Unsafe");
}
function IsVoid(value) {
  return IsKindOf(value, "Void") && value.type === "void" && IsOptionalString(value.$id);
}
function IsKind(value) {
  return IsObject(value) && Kind in value && IsString(value[Kind]) && !KnownTypes.includes(value[Kind]);
}
function IsSchema(value) {
  return IsObject(value) && (IsAny(value) || IsArray2(value) || IsBoolean2(value) || IsBigInt2(value) || IsAsyncIterator(value) || IsConstructor(value) || IsDate(value) || IsFunction(value) || IsInteger(value) || IsIntersect(value) || IsIterator(value) || IsLiteral(value) || IsMappedKey(value) || IsMappedResult(value) || IsNever(value) || IsNot(value) || IsNull(value) || IsNumber2(value) || IsObject2(value) || IsPromise(value) || IsRecord(value) || IsRef(value) || IsRegExp(value) || IsString2(value) || IsSymbol(value) || IsTemplateLiteral(value) || IsThis(value) || IsTuple(value) || IsUndefined2(value) || IsUnion(value) || IsUint8Array(value) || IsUnknown(value) || IsUnsafe(value) || IsVoid(value) || IsKind(value));
}

// scripts/typebox-typegen/index.ts
if (process.argv[2] == null)
  throw new Error("No directory to target!");
var results = [];
var errors = [];
var tasks = [];
var transform = async (p) => {
  const path = relative(
    dirname(fileURLToPath(import.meta.url)),
    join(process.cwd(), p)
  );
  const ext = extname(path);
  const file = createWriteStream(
    path.replace(new RegExp(`${ext}$`), `.compiled${ext}`),
    {}
  );
  try {
    const tasks2 = [];
    console.log("\u2022 Transforming:", path);
    const module = await import("./" + path);
    for (const exportedKey in module) {
      const exported = module[exportedKey];
      console.log(">\u2022 Discovered exported:", exportedKey, ", from:", path);
      if (IsSchema(exported) == false) {
        console.log(">\u2022 Skipped exported:", exportedKey, ", from:", path);
        continue;
      }
      console.log(">\u2022 Transforming exported:", exportedKey, ", from:", path);
      tasks2.push(
        new Promise((res, rej) => {
          const code = TypeCompiler.Code(exported);
          file.write(code, (e) => {
            if (e instanceof Error)
              return rej(e);
            return res();
          });
        })
      );
    }
    await Promise.all(tasks2);
    results.push(path);
    console.log("\u2713 Done transforming:", path);
  } catch (e) {
    errors.push([path, e]);
    console.log("\xD7 Error transforming:", path);
    console.log(">", e);
  } finally {
    file.close();
  }
};
console.log("Typebox Typegen");
console.log("+++++++++++++++\n");
console.log("Reading files...");
var files = await readdir(process.argv[2], {
  withFileTypes: true,
  recursive: true
});
for (const file of files) {
  const path = join(file.path, file.name);
  console.log("\u2022 Discovered file:", path);
  if (file.isDirectory()) {
    console.log("\u2022 Skipped directory:", path);
    continue;
  }
  if ([".ts", ".js"].includes(extname(path)) == false) {
    console.log("\u2022 Skipped non-code file:", path);
    continue;
  }
  if (path.split(".").slice(-2, -1)[0] === "compiled") {
    console.log("\u2022 Skipped compiled file:", path);
    continue;
  }
  tasks.push(transform(path));
}
await Promise.all(tasks);
console.log("Done!");
if (results.length > 0) {
  console.log("Successfully compiled:");
  for (const result of results)
    console.log("\u2713", result);
}
if (results.length > 0) {
  console.log("\nFailed to compile:");
  for (const error of errors) {
    console.log("\xD7", error[0]);
    console.log(">", error[1]);
  }
}
