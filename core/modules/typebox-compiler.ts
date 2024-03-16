import type { TSchema } from "@sinclair/typebox"
import { TypeCompiler, type TypeCheck } from "@sinclair/typebox/compiler"
import { Value } from "@sinclair/typebox/value"

/* eslint-disable @typescript-eslint/no-explicit-any */
export { Policy } from "@sinclair/typebox/compiler"
export type {
  CheckFunction,
  TypeCheck,
  TypeCompilerCodegenOptions,
  TypeCompilerLanguageOption,
  TypeCompilerTypeGuardError,
  TypeCompilerUnknownTypeError,
  ValueError,
  ValueErrorIterator,
  ValueErrorType,
} from "@sinclair/typebox/compiler"

const withRef = (ref: TSchema[] | undefined | null, v: unknown) =>
  (ref == null ? [v] : [ref, v]) as [TSchema[], unknown]
namespace TypeCompilerPonyfill {
  export const Code = TypeCompiler.Code

  export const Compile: typeof TypeCompiler.Compile = (...args) => {
    if (
      typeof navigator == "object" &&
      navigator.userAgent === "Cloudflare-Workers"
    ) {
      const [schema, ref] = args
      return {
        Check: (v: unknown) => Value.Check(schema, ...withRef(ref, v)),
        Code: () =>
          ref == null
            ? TypeCompiler.Code(schema)
            : TypeCompiler.Code(schema, ref),
        Decode: (v: unknown) => Value.Decode(schema, ...withRef(ref, v)),
        Encode: (v: unknown) => Value.Encode(schema, ...withRef(ref, v)),
        Errors: (v: unknown) => Value.Errors(schema, ...withRef(ref, v)),
        schema,
        references: ref,
        get code() {
          return ref == null
            ? TypeCompiler.Code(schema)
            : TypeCompiler.Code(schema, ref)
        },
        checkFunc: undefined,
        hasTransform: undefined,
      } as any satisfies TypeCheck<any>
    }

    return TypeCompiler.Compile(...args)
  }
}

export { TypeCompilerPonyfill as TypeCompiler }
