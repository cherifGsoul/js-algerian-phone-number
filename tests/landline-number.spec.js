const { expect } = require('chai');
const { makeLandlinePhoneNumber } = require('../index');

describe('Landline algerian phone number', () => {
    it('must be in string type', () => {
        expect(() => makeLandlinePhoneNumber({})).to.throw('Landline phone number must be a string');
    });

    it('must not be an empty string', () => {
        expect(() => makeLandlinePhoneNumber('')).to.throw('Landline phone number must not be empty');
    });

    it ('normalizes the entered number', () => {
        const landlineNumber = makeLandlinePhoneNumber('038 52 55 64');
        const anotherLandlineNumber = makeLandlinePhoneNumber('+213 38 52-55-64');
        expect(landlineNumber.toString()).to.equal('038525564');
        expect(anotherLandlineNumber.toString()).to.equal('+21338525564');
    });

    it('must be valid algerian landline number', () => {
        expect(() => makeLandlinePhoneNumber('khk 00 00 00')).to.throw('The landline phone number is invalid');
        expect(() => makeLandlinePhoneNumber('038525564')).to.not.throw('The landline phone number is invalid');
    });

    it('has a type using toStringTag symbol', () => {
        const landlineNumber = makeLandlinePhoneNumber('038 52 55 64');
        expect(Object.prototype.toString.call(landlineNumber)).to.equal('[object AlgerianLandlinePhoneNumber]');
    });

    it('returns a new instance when change the number', () => {
        const landlineNumber = makeLandlinePhoneNumber('038 52 55 64');
        const changed = landlineNumber.withNumber('038 52 55 66');
        expect(changed).to.not.equal(landlineNumber);
    });

    it('can be compared with others', () => {
        const landlineNumber = makeLandlinePhoneNumber('038 52 55 64');
        const other = makeLandlinePhoneNumber('038 52 55 64');
        expect(landlineNumber.equals(other)).to.be.true;
    });

    it('knows country local code', () => {
        const landline = makeLandlinePhoneNumber('038 52 55 64');
        expect(landline.code).to.equal('0');
    });

    it('knows country international code', () => {
        const landlineNumber = makeLandlinePhoneNumber('+213 38 52 55 64');
        const another = makeLandlinePhoneNumber('00213 38 52 55 64');
        expect(landlineNumber.code).to.equal('+213');
        expect(another.code).to.equal('00213');
    });

    it('knows wilaya code', () => {
        const landlineNumber = makeLandlinePhoneNumber('+213 38 52 55 64');
        const another = makeLandlinePhoneNumber('00213 38 52 55 64');
        expect(landlineNumber.wilayaCode).to.equal('38');
        expect(another.wilayaCode).to.equal('38');
    });
});