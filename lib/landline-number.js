const pattern = /^(00213|\+213|0)(49|27|29|32|33|34|25|26|37|43|46|21|23|36|48|39|38|31|45|35|41|24)[0-9]{6}/;

const fromString = (number) => {
    if (typeof number !== 'string') {
        throw new Error('Landline phone number must be a string')
    }

    if (!number) {
        throw new Error('Landline phone number must not be empty');
    }

    let normalized = number.replace(/\s|-+/g, '');

    if (!pattern.test(normalized)) {
        throw new Error('The landline phone number is invalid');
    }

    const codeParts = normalized.match(/^(00213|\+213|0)/);
    const code = codeParts[0];

    normalized = normalized.substr(code.length, normalized.length - code.length);
    const wilayaCode = normalized.substr(0, 2);

    return Object.freeze({
        get code() {
            return code;
        },
        get number () {
            return normalized;
        },
        get wilayaCode() {
          return wilayaCode;
        },
        get [Symbol.toStringTag] () {
            return 'AlgerianLandlinePhoneNumber';
        },
        toString() {
            return `${code}${normalized}`;
        },
        withNumber(number) {
            return fromString(number);
        },
        equals(other) {
            if (Object.prototype.toString.call(other) === '[object AlgerianLandlinePhoneNumber]') {
                return code === other.code
                    && normalized === other.number
                    && wilayaCode === other.wilayaCode;
            }
            return false;
        }
    });
};
module.exports = fromString;