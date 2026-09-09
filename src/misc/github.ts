
import { type Nullable } from "../util.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface File
	{
	name:string;
	path:string;
	url:string;
	}

interface Links
	{
	self:string;
	git:string;
	html:string;
	}

interface Content
	{
	name:string;
	path:string;
	sha:string;
	size:number;
	url:string;
	html_url:string;
	git_url:string;
	download_url:Nullable<string>;
	type:string;
	_links:Links;
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getContents(owner:string, repository:string, path:string = ""):Promise<Content[]>
	{
	const url = `https://api.github.com/repos/${owner}/${repository}/contents/${path}`;

	const response = await fetch(url);

	return await response.json() as Content[];
	}

function toFiles(contents:Content[]):File[]
	{
	const isFile = (content:Content):boolean => content.type === "file" && content.download_url !== null;

	const toFile = (content:Content):File =>
		{
		return {name: content.name, path: content.path, url: content.download_url!};
		};

	return contents.filter(isFile).map(toFile);
	}

function toLinks(files:File[]):HTMLAnchorElement[]
	{
	const toLink = (file:File):HTMLAnchorElement =>
		{
		const link = document.createElement("a");

		link.setAttribute("href", file.url);

		link.textContent = file.name;

		return link;
		};

	return files.map(toLink);
	}

function links(owner:string, repository:string, path:string = "", element:HTMLElement):void
	{
	getContents(owner, repository, path).then(toFiles).then(toLinks).then(links =>
		{
		links.forEach(link =>
			{
			element.appendChild(link);
			});
		});
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export
	{
	links
	};
