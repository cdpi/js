#!/usr/bin/env node

import { getColor } from "../dist/misc/cesarbazaar.js";

const color = await getColor("BL007");

console.log(color);
