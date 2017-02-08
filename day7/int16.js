String.prototype.bin = function () {
    return parseInt(this, 2);
};
Number.prototype.bin = function () {
    var sign = (this < 0 ? "-" : "");
    var result = Math.abs(this).toString(2);
    while(result.length < 16) {
        result = "0" + result;
    }
    return sign + result;
}
function ToInteger(x) {
    x = Number(x);
    return x < 0 ? Math.ceil(x) : Math.floor(x);
}
function modulo(a, b) {
    return a - Math.floor(a/b)*b;
}
function ToUint16(x) {
    return modulo(ToInteger(x), Math.pow(2, 16));
}
function ToInt16(x) {
    var uint32 = ToUint32(x);
    if (uint32 >= Math.pow(2, 15)) {
        return uint32 - Math.pow(2, 16)
    } else {
        return uint32;
    }
}
function ToUint16(x) {
    return x >>> 0;
}
function ToInt16(x) {
    return x >> 0;
}