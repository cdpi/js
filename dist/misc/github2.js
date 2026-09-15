//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getContents(owner, repository, path = "") {
    const url = `https://api.github.com/repos/${owner}/${repository}/contents/${path}`;
    const response = await fetch(url);
    return await response.json();
}
function toFiles(contents) {
    const isFile = (content) => content.type === "file" && content.download_url !== null;
    const toFile = (content) => {
        return { name: content.name, path: content.path, url: content.download_url };
    };
    return contents.filter(isFile).map(toFile);
}
function toLinks(files) {
    const toLink = (file) => {
        const link = document.createElement("a");
        link.setAttribute("href", file.url);
        link.textContent = file.name;
        return link;
    };
    return files.map(toLink);
}
function links(owner, repository, path = "", element) {
    getContents(owner, repository, path).then(toFiles).then(toLinks).then(links => {
        links.forEach(link => {
            element.appendChild(link);
        });
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { links };
