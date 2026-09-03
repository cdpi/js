#!/usr/bin/env node

import { getWebColors } from "../dist/misc/wikipedia.js";

const colors = await getWebColors();

console.log(JSON.stringify(colors, null, 4));
