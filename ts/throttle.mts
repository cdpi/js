
function throttle(delay:number, callback:(e:Event) => void):(e:any) => void
	{
	//@ts-ignore
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
