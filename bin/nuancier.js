#!/usr/bin/env node

import { getColors } from "../dist/misc/cesarbazaar.js";

const colors = await getColors();

console.log(JSON.stringify(colors, null, 4));
