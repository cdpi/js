
//@ts-check

/**
 * @param {number} delay
 * @param {(e:Event) => void} callback
 * 
 * @returns {(e:Event) => void}
 */
function throttle(delay, callback)
	{
	let self = this;

	let lastTimeStamp = 0;

	return e =>
		{
		if ((e.timeStamp - lastTimeStamp) > delay)
			{
			lastTimeStamp = e.timeStamp;

			callback.call(self, e);
			}
		};
	}

export
	{
	throttle
	};
