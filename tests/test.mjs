
// Pas terrible mes fonctions de tests :/

function isUndefined(value)
	{
	return (value === undefined);
	}

function classExists(name)
	{
	try
		{
		return !isUndefined(name);
		}
	catch (error)
		{
		return false;
		}
	}

export function assertClassExists(className)
	{
	//console.assert(number % 2 === 0, "%o", { number, errorMsg });
	console.assert(classExists(className));
	}

/*
export function assertNotUndefined()
	{
	console.log("TTTT");
	}
*/
