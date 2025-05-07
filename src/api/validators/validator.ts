export interface Validator<T> {
  validate(dto: T): T;
}
