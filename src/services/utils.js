export const utils = {
    getUniqueHeaders,
    getRandomColor,
    getRandomInteger
}

function getUniqueHeaders(items, key) {
    let uniqueItems = []
    items.forEach(item => {
        if (!uniqueItems.includes(item[key])) uniqueItems.push(item[key])
    });
    return uniqueItems
}

function getRandomColor(opacity = 100) {
    let strHtml = '#';
    strHtml += calculatePercentToHex(opacity)
    let chars = '0123456789abcdef';
    for (let i = 0; i < 3; i++) {
        strHtml += chars.charAt(getRandomInteger(chars.length));
    }
    return strHtml;
}

function getRandomInteger(max, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function calculatePercentToHex(percentage) {
    const val = Math.round(percentage / 100 * 255)
    const hexString = val.toString(16);
    return hexString
}