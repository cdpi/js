#!/usr/bin/env node

import process from "node:process";
import { writeFileSync } from "node:fs";

import { FILENAME_APPFILTER, FILENAME_DRAWABLE, csvToAppFilter, csvToDrawable } from "../dist/misc/android.js";

//writeFileSync(`res/xml/${FILENAME_APPFILTER}`, csvToAppFilter("android-applications.csv"));
//writeFileSync(`res/xml/${FILENAME_DRAWABLE}`, csvToDrawable("android-applications.csv"));

//writeFileSync(FILENAME_APPFILTER, csvToAppFilter("android-applications.csv"));
//writeFileSync(FILENAME_DRAWABLE, csvToDrawable("android-applications.csv"));

//console.log(process.argv);

// ./bin/android-icons.js ../Données\ pour\ tests/android/applications.csv

const [,,csv] = process.argv;

//console.log(csv);

if (csv)
	{
	console.log(csvToAppFilter(csv));
	}
