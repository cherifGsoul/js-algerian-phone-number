const { expect } = require('chai');
const { makeMobilePhoneNumber } = require('../index');

describe('Mobile phone number', () => {
    it('must be in string type', () => {
        expect(() => makeMobilePhoneNumber({})).to.throw('Mobile phone number must be a string');
    });

    it('must not be an empty string', () => {
        expect(() => makeMobilePhoneNumber('')).to.throw('Mobile phone number must not be empty');
    });

    it ('normalizes the entered number', () => {
        const mobileNumber = makeMobilePhoneNumber('0776 00 00 00');
        const anotherMobileNumber = makeMobilePhoneNumber('+213 776-00-00-00');
        expect(mobileNumber.toString()).to.equal('0776000000');
        expect(anotherMobileNumber.toString()).to.equal('+213776000000');
    });

    it('must be valid algerian mobile number', () => {
        expect(() => makeMobilePhoneNumber('khk 00 00 00')).to.throw('The mobile phone number is invalid');
        expect(() => makeMobilePhoneNumber('0776 00 00 00')).to.not.throw('The mobile phone number is invalid');
    });

    it('has a type using toStringTag symbol', () => {
        const mobileNumber = makeMobilePhoneNumber('0776 00 00 00');
        expect(Object.prototype.toString.call(mobileNumber)).to.equal('[object AlgerianMobilePhoneNumber]');
    });

    it('returns a new instance when change the number', () => {
        const mobileNumber = makeMobilePhoneNumber('0776 00 00 00');
        const changed = mobileNumber.withNumber('0776 00 09 09');
        expect(changed).to.not.equal(mobileNumber);
    });

    it('can be compared with others', () => {
        const mobileNumber = makeMobilePhoneNumber('0776 00 00 00');
        const other = makeMobilePhoneNumber('0776 00 00 00');
        expect(mobileNumber.equals(other)).to.be.true;
    });

    it('knows if it is mobilis', () => {
        const mobileNumber = makeMobilePhoneNumber('0676 00 00 00');
        expect(mobileNumber.isMobilis()).to.be.true;
    });

    it('knows if it is djezzy', () => {
        const mobileNumber = makeMobilePhoneNumber('0776 00 00 00');
        expect(mobileNumber.isDjezzy()).to.be.true;
    });

    it('knows if it is ooredoo', () => {
        const mobileNumber = makeMobilePhoneNumber('0576 00 00 00');
        expect(mobileNumber.isOoredoo()).to.be.true;
    });

    it('knows country local code', () => {
        const mobileNumber = makeMobilePhoneNumber('0576 00 00 00');
        expect(mobileNumber.code).to.equal('0');
    });

    it('knows country international code', () => {
        const mobileNumber = makeMobilePhoneNumber('+213 576 00 00 00');
        const another = makeMobilePhoneNumber('00213 576 00 00 00');
        expect(mobileNumber.code).to.equal('+213');
        expect(another.code).to.equal('00213');
    });

});