
//type ArrayInitializer = (value:T, index:number) => U;

function initialize(initialValue:any):(value:any, index:number) => any
	{
	return (_value, _index) => initialValue;
	}

function increment(start:number = 0):(value:number, index:number) => number
	{
	return (_value, index) => start + index;
	}

function decrement(start:number):(value:number, index:number) => number
	{
	return (_value, index) => start - index;
	}

function sequence(count:number, generator:(value:any, index:number) => any = increment(0)):Array<any>
	{
	return Array.from({length: count}, generator);
	}

function sum(arrays:Array<Array<number>>):Array<number>
	{
	return arrays.reduce((accumulator, array) => accumulator.map((value, index) => value + array[index]), sequence(arrays[0].length, initialize(0)));
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	initialize,
	increment,
	decrement,
	sequence,
	sum
	};
