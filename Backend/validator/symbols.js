const symbols = (string) => {
    const symbolArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", ":", ";", "'", '"', "<", ",", ">", ".", "?", "/", "`", "~", "[", "]", "|", "\\"]
    for (const alpha of string) {
        for (const sym of symbolArray) {
            if (sym === alpha) {
                return false
            }
        }
    }
    return true
}
const num = (string) => {
    for (const alpha of string) {
        if (!isNaN(alpha)) {
            return false
        }
    }
    return true
}
const miet = (string) => {
    let college = "miet.ac.in"
    let a = string.split('@')
    for (const i in string) {
        if (!(a[1][i] === college[i])) {
            return false
        }
    }
    return true
}

const bookName = (string) => {
    let a = string.split('-')
    if (!symbols(a[0]) || !num(a[0])) {
        return false
    }
    return true
}
const name = (string) => {
    let a = string.split(' ')
    for (const element of a) {
        if (!symbols(element) || !num(element)) {
            return false
        }
    }
    return true
}
const subject = (string) => {
    let a = string.split('_')
    for (const element of a) {
        if (!symbols(element) || !num(element)) {
            return false
        }
    }
    return true
}

const truck = (string) => {
    let mid = 6
    if (string.length < 10) {
        mid = 5
    }
    for (const key in string) {
        if (key < 2) {
            if (!symbols(string[key])) {
                return false
            }
        }
        else {
            if (key < 4) {
                if (num(string[key])) {
                    return false
                }
            }
            else {
                if (key < 6) {
                    if (!symbols(string[key])) {
                        return false
                    }
                }
                else {
                    if (num(string[key])) {
                        return false
                    }
                }
            }
        }
        // console.log(key)
    }
    return true
}

module.exports = { symbols, miet, num, name, bookName, subject, truck }