export type IAction<T, P> = {
    readonly type: T;
    readonly payload: P;
};
