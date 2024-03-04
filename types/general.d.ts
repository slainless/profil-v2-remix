type MemberOf<T> = T extends Array<infer R> ? R : never
