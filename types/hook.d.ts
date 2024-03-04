interface Controllable<T> {
  value?: T
  defaultValue?: T
  onChange?: (v: T) => void
}
