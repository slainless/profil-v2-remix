type AtomValue<T> = T extends import("jotai").PrimitiveAtom<infer I> ? I : never
