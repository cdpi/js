
import { Stats, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

type FilesAndDirectories =
	{
	files:Array<string>;
	directories:Array<string>;
	};

type WalkFilesRecursivelyCallback = (path:string) => void;

type ReadTextFilesRecursivelyCallback = (path:string, content:string) => void;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getFilesAndDirectories(directory:string = ".", sort:boolean = false):FilesAndDirectories
	{
	const files:Array<string> = new Array<string>();
	const directories:Array<string> = new Array<string>();

	const paths:Array<string> = readdirSync(directory);

	paths.forEach((path:string) =>
		{
		const currentPath:string = join(directory, path);
		const stat:Stats = statSync(currentPath);

		if (stat.isFile())
			{
			files.push(currentPath);
			}
		else if (stat.isDirectory())
			{
			directories.push(currentPath);
			}
		});

	if (sort)
		{
		files.sort();
		directories.sort();
		}

	return { files, directories };
	}

function walkFilesRecursively(directory:string, sort:boolean, callback:WalkFilesRecursivelyCallback):void
	{
	const filesAndDirectories = getFilesAndDirectories(directory, sort);

	filesAndDirectories.files.forEach((file:string) =>
		{
		callback(file);
		});

	filesAndDirectories.directories.forEach((directory:string) =>
		{
		walkFilesRecursively(directory, sort, callback);
		});
	}

function readTextFilesRecursively(directory:string, sort:boolean, callback:ReadTextFilesRecursivelyCallback):void
	{
	walkFilesRecursively(directory, sort, (path:string) =>
		{
		callback(path, readFileSync(path, "utf-8"));
		});
	}

function readAsBase64(path:string):string
	{
	//const fileToBase64 = (path:string):string => readFileSync(path).toBase64();
	//const fileToBase64 = (path:string):string => readFileSync(path).toString("base64");

	return readFileSync(path).toString("base64");
	}

/*
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

async function *readLines(path:string)
	{
	const stream = createReadStream(path);

	const reader = createInterface({input: stream, crlfDelay: Infinity});

	for await (const line of reader)
		{
		yield line;
		}
	}
*/

function concat(directory:string, separator:string = "\n\n"):string
	{
	let contents:Array<string> = [];

	readTextFilesRecursively(directory, true, (path:string, content:string) =>
		{
		contents.push(content);
		});

	return contents.join(separator);
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	type FilesAndDirectories,
	type WalkFilesRecursivelyCallback,
	type ReadTextFilesRecursivelyCallback,

	getFilesAndDirectories,
	walkFilesRecursively,
	readTextFilesRecursively,
	readAsBase64,
	concat
	};
