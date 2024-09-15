declare type AnyObj = Record<string, any>;

declare type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
