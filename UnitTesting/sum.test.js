const sum = require('./sum');


test('properly add two number', () => {
    expect(sum(1, 2)).toBe(3);
});