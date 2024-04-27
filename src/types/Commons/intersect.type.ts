export type TObserveHandler = (
    isIntersecting: boolean,
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
) => void