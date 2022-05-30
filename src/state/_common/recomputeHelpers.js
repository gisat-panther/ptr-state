import stringify from 'fast-stringify';

// Use fast-stringify instead of default JSON.stringify to get cache key
const serialize = args => stringify(args);

export const recomputeSelectorOptions = {serialize};
