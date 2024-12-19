
//@ts-check

import { lstatSync, readdirSync, readFileSync } from "node:fs";
import * as path from "node:path";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} path
 * 
 * @returns {boolean}
 */
function isFile(path)
	{
	return lstatSync(path).isFile();
	}

/**
 * @param {string} directory
 * 
 * @returns {Array<string>}
 */
function getFiles(directory)
	{
	return readdirSync(directory)
		.map(filename => path.join(directory, filename))
		.filter(isFile);
	}

/**
 * @param {string} path
 * 
 * @returns {any}
 */
function readAsJSON(path)
	{
	return JSON.parse(readFileSync(path, "utf-8"));
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	isFile,
	getFiles,
	readAsJSON
	};
