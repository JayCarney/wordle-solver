import { include, includeAtPosition, maxCharCount, minCharCount, notInclude, notIncludeAtPosition } from "./filters"

describe('include', () => {
  test('returns true when letter present', () => {
    expect(include('s', 'test')).toBeTruthy()
  })
  test('returns false when letter not present', () => {
    expect(include('x', 'test')).toBeFalsy()
  })
  test('works when curried', () => {
    expect(include('s')('test')).toBeTruthy()
  })
})

describe('notInclude', () => {
  test('returns false when letter present', () => {
    expect(notInclude('s', 'test')).toBeFalsy()
  })
  test('returns true when letter not present', () => {
    expect(notInclude('x', 'test')).toBeTruthy()
  })
  test('works when curried', () => {
    expect(notInclude('x')('test')).toBeTruthy()
  })
})

describe('includeAtPosition', () => {
  test('returns true when letter present', () => {
    expect(includeAtPosition('s', 2, 'test')).toBeTruthy()
  })
  test('returns false when letter not present', () => {
    expect(includeAtPosition('s', 0, 'test')).toBeFalsy()
  })
})


describe('notIncludeAtPosition', () => {
  test('returns false when letter present at position', () => {
    expect(notIncludeAtPosition('s', 2, 'test')).toBeFalsy()
  })
  test('returns true when letter not present at position', () => {
    expect(notIncludeAtPosition('s', 0, 'test')).toBeTruthy()
  })
})

describe('maxCharCount', () => {
  test('allows words with less than limit', () => {
    expect(maxCharCount('a', 1, 'bbc')).toBeTruthy()
  })
  test('allows words equal to limit', () => {
    expect(maxCharCount('a', 1, 'abc')).toBeTruthy()
  })
  test('does not allow words with equal to or less than limit', () => {
    expect(maxCharCount('a', 1, 'aac')).toBeFalsy()
  })
})

describe('minCharCount', () => {
  test('allows words with exactly as many as limit', () => {
    expect(minCharCount('a', 1, 'abc')).toBeTruthy()
  })
  test('allows words with more than limit', () => {
    expect(minCharCount('a', 1, 'aac')).toBeTruthy()
  })
  test('does not allow words with less than limit', () => {
    expect(minCharCount('a', 1, 'bcd')).toBeFalsy()
  })
})