
import assert from "node:assert/strict";
import { test, describe } from "node:test";

import { check as isValidSwissIBAN } from "../../misc/iban.js";

//node --import tsx --test mon-fichier.test.ts

describe('Validation IBAN Suisse', () =>
	{
	test('devrait valider un IBAN suisse correct (format standard)', () =>
		{
		// Un IBAN de test syntaxiquement correct (CH + clé + IID + compte)
		const validIBAN = 'CH36 0000 0000 0000 0000 0';
		assert.equal(isValidSwissIBAN(validIBAN), true);
		});

	test('devrait valider un IBAN suisse sans espaces', () =>
		{
		const validIBANNoSpaces = 'CH3600000000000000000';
		assert.equal(isValidSwissIBAN(validIBANNoSpaces), true);
		});

	/*
	test('devrait valider un IBAN du Liechtenstein (LI est lié au système suisse)', () =>
		{
		const validLiechtenstein = 'LI21 0000 0000 0000 0000 0'; 
		assert.equal(isValidSwissIBAN(validLiechtenstein), true);
		});
	*/

	test('devrait rejeter un IBAN trop court ou trop long', () =>
		{
		assert.equal(isValidSwissIBAN('CH93 0000 0'), false);
		assert.equal(isValidSwissIBAN('CH93 0000 0000 0000 0000 0000'), false);
		});

	test('devrait rejeter un IBAN d\'un autre pays (ex: France)', () =>
		{
		const frenchIBAN = 'FR76 3000 6000 0112 3456 7890 123';
		assert.equal(isValidSwissIBAN(frenchIBAN), false);
		});

	test('devrait rejeter un IBAN avec une clé de contrôle invalide', () =>
		{
		// Remplacement de "CH93" par "CH00" pour fausser le calcul mathématique
		const invalidChecksum = 'CH00 0000 0000 0000 0000 0';
		assert.equal(isValidSwissIBAN(invalidChecksum), false);
		});

	test('devrait rejeter les caractères spéciaux interdits', () =>
		{
		assert.equal(isValidSwissIBAN('CH93 0000 0000 0000 0000 -'), false);
		});
	});
