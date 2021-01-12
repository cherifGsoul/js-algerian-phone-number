const pattern = /^(00213|\+213|0)(5|6|7)[0-9]{8}/;

const fromString = (number) => {
    if (typeof number !== 'string') {
        throw new Error('Mobile phone number must be a string');
    }

    if (!number) {
        throw new Error('Mobile phone number must not be empty');
    }

    let normalized = number.replace(/\s|-+/g, '');

    if (!pattern.test(normalized)) {
        throw new Error('The mobile phone number is invalid');
    }

    const codeParts = normalized.match(/^(00213|\+213|0)/);
    const code = codeParts[0];

    normalized = normalized.substr(code.length, normalized.length - code.length);

    const operator = normalized.substr(0, 1);
    const digits =  normalized.substr(1, normalized.length);

    return Object.freeze({
        get [Symbol.toStringTag] () {
            return 'AlgerianMobilePhoneNumber';
        },
        get code() {
          return code;
        },
        get operator() {
            return operator;
        },
        get number () {
            return digits;
        },
        toString() {
            return `${code}${operator}${digits}`;
        },
        valueOf() {
            return `${code}${operator}${digits}`;
        },
        equals(other) {
            if (Object.prototype.toString.call(other) === '[object AlgerianMobilePhoneNumber]') {
                return  digits      === other.number
                        && operator === other.operator
                        && code     === other.code;
            }
            return  false;
        },
        withNumber(number) {
            return fromString(number);
        },
        isMobilis() {
            return operator === '6';
        },
        isDjezzy() {
            return operator === '7';
        },
        isOoredoo() {
            return operator === '5';
        }
    });
}

module.exports = fromString;