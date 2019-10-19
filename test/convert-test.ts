import {isVowel, isEqualWithoutDiacritics} from '../src/convert';
import { expect } from 'chai';

describe('convert tests', () => {
    it('isVowel enlish vowel fails', () => {
        const result = isVowel('a');
        expect(result).to.equal(false);
    });

    it('isVowel consonant is not a vowel', () => {
        const result = isVowel('Ῥ');
        expect(result).to.equal(false);
    });

    it('isVowel \\u syntax', () => {
        const result = isVowel('\u03b1');
        expect(result).to.equal(true);
    });

    it('isVowel combining diacritic', () => {
        const result = isVowel('ὰ');
        expect(result).to.equal(true);
    });

    it('isEqualWithoutDiacritics ignores smooth breathing', () => {
        const result = isEqualWithoutDiacritics('ὅτι', 'οτι');
        expect(result).to.equal(true);
    });
});