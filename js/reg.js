export function numberFormat(str) {
    return str ? str.toString().replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g, ',$1') : 0
}

// flag 0 返回单位  1 返回数字 没有返回 数字加单位
export function storageFormat(val, flag) {
    let A = (a, b) => {
        switch (flag) {
            case 0:
                return b
            case 1:
                return a
            default:
                return a + b
        }
    }
    if (/^[0-9]+(\.[0-9]+)?$/.test(val)) {
        let arr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
        let ix = 0
        let len = arr.length
        while (val >= 1024) {
            if (ix === len - 1) {
                break
            }
            val = val / 1024
            ix++
        }
        val = val.toFixed(2).toString().replace('.00', '')
        val = numberFormat(val)
        return A(val, arr[ix])
    }
    return A(0, 'KB')
}