
//@ts-check

//import { sum } from "./array.mjs";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const _CSS_PIXEL_REGEXP = /([0-9]+(\.[0-9]+)?)px/;

/**
 * @param {string} value
 * 
 * @returns {number}
 */
function px(value)
	{
	let found = value.match(_CSS_PIXEL_REGEXP);

	return (found === null) ? 0.0 : parseFloat(found[1]);
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const _BORDER_BOX = "border-box";
const _CONTENT_BOX = "content-box";
const _PADDING_BOX = "padding-box";

/**
 * @param {CSSStyleDeclaration} style
 * 
 * @returns {boolean}
 */
function isBackgroundClipBorderBox(style)
	{
	return (style.backgroundClip === _BORDER_BOX);
	}

/**
 * @param {CSSStyleDeclaration} style
 * 
 * @returns {boolean}
 */
function isBackgroundClipContentBox(style)
	{
	return (style.backgroundClip === _CONTENT_BOX);
	}

/**
 * @param {CSSStyleDeclaration} style
 * 
 * @returns {boolean}
 */
function isBackgroundClipPaddingBox(style)
	{
	return (style.backgroundClip === _PADDING_BOX);
	}

/**
 * @param {CSSStyleDeclaration} style
 * 
 * @returns {boolean}
 */
function isBoxSizingBorderBox(style)
	{
	return (style.boxSizing === _BORDER_BOX);
	}

/**
 * @param {CSSStyleDeclaration} style
 * 
 * @returns {boolean}
 */
function isBoxSizingContentBox(style)
	{
	return (style.boxSizing === _CONTENT_BOX);
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
const borders = style =>
	{
	return [px(style.borderTopWidth), px(style.borderRightWidth), px(style.borderBottomWidth), px(style.borderLeftWidth)];
	};

const margins = style =>
	{
	return [px(style.marginTop), px(style.marginRight), px(style.marginBottom), px(style.marginLeft)];
	};

const paddings = style =>
	{
	return [px(style.paddingTop), px(style.paddingRight), px(style.paddingBottom), px(style.paddingLeft)];
	};
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param {Element} element
 * 
 * @returns {unknown}
 */
function getBackgroundRect(element)
	{
	let style = window.getComputedStyle(element);

	let rect = element.getBoundingClientRect();

	let x = rect.left + window.scrollX;
	let y = rect.top + window.scrollY;

	if (isBoxSizingContentBox(style))
		{
		}

	if (isBackgroundClipContentBox(style))
		{
		}

	return [x, y];

	//window.scrollY + document.querySelector('#elementId').getBoundingClientRect().top // Y
	//return sum([borders(style), margins(style), paddings(style)]);
	};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	px,
	isBackgroundClipBorderBox,
	isBackgroundClipContentBox,
	isBackgroundClipPaddingBox,
	isBoxSizingBorderBox,
	isBoxSizingContentBox,
	//borders,
	//margins,
	//paddings,
	getBackgroundRect
	};
