
/*
import { toHex } from "../util/string.js";
import { RedGreenBlue } from "../image/color.js";
import { pack888 } from "../util/byte.js";

function colorToHex(color:number):string
	{
	return "#" + toHex(color, true, 6);
	}

function rgbToHex(color:RedGreenBlue):string
	{
	return colorToHex(pack888([color.red, color.green, color.blue]));
	}
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { type Nullable } from "./util.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ALL:string = "link[rel~='stylesheet'][title]";

const ACTIVE:string = "link[rel~='stylesheet']:not(disabled)[title]";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getAll():Array<string>
	{
	const all:Array<string> = new Array<string>();

	document.querySelectorAll<HTMLLinkElement>(ALL).forEach((link:HTMLLinkElement) =>
		{
		all.push(link.title);
		});

	return all;
	}

function getActiveStyleSheet():Nullable<string>
	{
	const link:HTMLLinkElement|null = document.querySelector<HTMLLinkElement>(ACTIVE);

	return link ? link.title : null;
	}

function setActiveStyleSheet(title:string):void
	{
	document.querySelectorAll<HTMLLinkElement>(ALL)
		.forEach((link:HTMLLinkElement) => link.disabled = link.title !== title);
	}

abstract class ThemeObserver
	{
	protected readonly darkMode:MediaQueryList;

	public constructor()
		{
		this.darkMode = window.matchMedia("(prefers-color-scheme: dark)");

		this.init();
		}

	protected abstract onSystemThemeChange(isDarkMode:boolean):void;

	private init():void
		{
		this.darkMode.addEventListener("change", (event:MediaQueryListEvent) => this.onSystemThemeChange(event.matches));
		}
	}

class ThemeManager extends ThemeObserver
	{
	public constructor()
		{
		super();
		}

	public get activeTheme():Nullable<string>
		{
		return getActiveStyleSheet();
		}

	public set activeTheme(theme:string)
		{
		setActiveStyleSheet(theme);
		}

	public get themes():Array<string>
		{
		return getAll();
		}

	protected onSystemThemeChange(isDarkMode:boolean):void
		{
		}
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	getAll,
	getActiveStyleSheet,
	setActiveStyleSheet,

	ThemeObserver,
	ThemeManager
	};
