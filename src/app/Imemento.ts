export interface Memento<T> {
    getState(): T;

    getDate(): string;
}
