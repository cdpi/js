//type ArrayInitializer = (value:T, index:number) => U;
function initialize(initialValue) {
    return (_value, _index) => initialValue;
}
function increment(start = 0) {
    return (_value, index) => start + index;
}
function decrement(start) {
    return (_value, index) => start - index;
}
function sequence(count, generator = increment(0)) {
    return Array.from({ length: count }, generator);
}
function sum(arrays) {
    return arrays.reduce((accumulator, array) => accumulator.map((value, index) => value + array[index]), sequence(arrays[0].length, initialize(0)));
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { initialize, increment, decrement, sequence, sum };
