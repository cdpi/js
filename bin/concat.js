#!/usr/bin/env node

import { concat } from "../dist/io.js";

// Il faut lancer depuis racine du projet (./bin/concat.js)
const markdown = concat("../Données pour tests/concat");

console.log(markdown);
