export const generateKey = (id, prefix) => {
    return `${id}_${prefix}_${new Date().getTime()}`;
}

export const dp = price => {
    return {
        l: Math.trunc(price * 1),
        r: ((price - Math.trunc(price * 1)) * 100)
            .toFixed(0)
            .padEnd(2, '0')
    }
}

