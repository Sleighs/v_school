var arr = [1, 2, 3, 4, 5]

console.log(arr.reduce((a, b) => a - b))
console.log('arr reduced', arr)

console.log(arr.map(item => item + 1))
console.log('arr mapped', arr)

console.log(arr.filter(item => item > 2))
console.log('arr filtered', arr)

console.log(arr.sort((a, b) => b - a))
console.log('arr sorted', arr)