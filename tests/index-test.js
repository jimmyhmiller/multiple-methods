import expect from 'expect'


import _ from 'lodash';

describe('multi', function() {
    it('add new multi method', function() {
        var multi = require('src/').default;
        var area = multi(_.property('shape'));
        expect(typeof area).toBe('function');
    });
    it('throw if no method and no default', function() {
        var multi = require('src/').default;
        var area = multi(_.property('shape'));
        expect(() => area({shape: 'circle'})).toThrow();
    });
    it('use default no matter what value is passed', function() {
        var multi = require('src/').default;
        var area = multi(_.property('shape'));
        area.defaultMethod(() => 42);
        expect(area('stuff')).toBe(42);
        expect(area({shape:'circle'})).toBe(42);
        expect(area(undefined)).toBe(42);
        expect(area(null)).toBe(42);
    });
    it('falls back to default', function() {
        var multi = require('src/').default;
        var area = multi(_.property('shape'));
        area.method('circle', () => 43);
        area.defaultMethod(() => 42);
        expect(area('stuff')).toBe(42);
        expect(area({shape:'circle'})).toBe(43);
    });

    it('differentiates between methods', function() {
        var multi = require('src/').default;
        var area = multi(_.property('shape'));
        area.method('circle', () => 43);
        area.method('square', () => 44);
        area.defaultMethod(() => 42);
        expect(area('stuff')).toBe(42);
        expect(area({shape:'circle'})).toBe(43);
        expect(area({shape:'square'})).toBe(44);
    });

    it('pass along the right variable', function() {
        var multi = require('src/').default;
        var area = multi(_.property('shape'));
        area.method('circle', (s) => Math.PI * Math.pow(s.radius,2));
        area.method('square', (s) => Math.pow(s.side, 2));
        area.defaultMethod(() => 42);
        expect(area('stuff')).toBe(42);
        expect(area({shape:'circle', radius: 1})).toBe(Math.PI);
        expect(area({shape:'square', side: 3})).toBe(9);
    });
});