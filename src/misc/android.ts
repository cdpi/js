
import { readFileSync } from "node:fs";
import { parse as parseSync } from "csv-parse/sync";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const FILENAME_APPFILTER = "appfilter.xml";
const FILENAME_DRAWABLE = "drawable.xml";

type ParseCallback = (name:string, pkg:string, activity:string, drawableName:string) => void;

function toDrawableName(text:string):string
	{
	return `ic_${text.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
	}

function parse(path:string, callback:ParseCallback):void
	{
	const csv = readFileSync(path, "utf-8");

	const records = parseSync(csv, {columns: false}) as Array<Array<string>>;

	records.forEach((record:Array<string>) =>
		{
		const name = record[0].trim();
		const pkg = record[1].trim();
		const activity = record[2].trim();

		if (name && pkg && activity)
			{
			callback(name, pkg, activity, toDrawableName(name));
			}
		});
	}

function csvToAppFilter(path:string):string
	{
	const xml:Array<string> = new Array<string>();

	xml.push(`<?xml version="1.0" encoding="utf-8"?>`);
	xml.push(`<resources>`);

	parse(path, (name:string, pkg:string, activity:string, drawableName:string) =>
		{
		xml.push(`\t<item component="ComponentInfo{${pkg}/${activity}}" drawable="${drawableName}" />`);
		});

	xml.push(`</resources>`);

	return xml.join("\n");
	}

function csvToDrawable(path:string):string
	{
	const xml:Array<string> = new Array<string>();

	xml.push(`<?xml version="1.0" encoding="utf-8"?>`);
	xml.push(`<resources>`);

	parse(path, (name:string, pkg:string, activity:string, drawableName:string) =>
		{
		xml.push(`\t<item drawable="${drawableName}" />`);
		});

	xml.push(`</resources>`);

	return xml.join("\n");
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	FILENAME_APPFILTER,
	FILENAME_DRAWABLE,

	type ParseCallback,

	parse,
	csvToAppFilter,
	csvToDrawable
	};
