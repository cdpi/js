import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getFilesAndDirectories(directory = ".", sort = false) {
    const files = new Array();
    const directories = new Array();
    const paths = readdirSync(directory);
    paths.forEach((path) => {
        const currentPath = join(directory, path);
        const stat = statSync(currentPath);
        if (stat.isFile()) {
            files.push(currentPath);
        }
        else if (stat.isDirectory()) {
            directories.push(currentPath);
        }
    });
    if (sort) {
        files.sort();
        directories.sort();
    }
    return { files, directories };
}
function walkFilesRecursively(directory, sort, callback) {
    const filesAndDirectories = getFilesAndDirectories(directory, sort);
    filesAndDirectories.files.forEach((file) => {
        callback(file);
    });
    filesAndDirectories.directories.forEach((directory) => {
        walkFilesRecursively(directory, sort, callback);
    });
}
function readTextFilesRecursively(directory, sort, callback) {
    walkFilesRecursively(directory, sort, (path) => {
        callback(path, readFileSync(path, "utf-8"));
    });
}
function readAsBase64(path) {
    //const fileToBase64 = (path:string):string => readFileSync(path).toBase64();
    //const fileToBase64 = (path:string):string => readFileSync(path).toString("base64");
    return readFileSync(path).toString("base64");
}
/*
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

async function *readLines(path:string)
    {
    const stream = createReadStream(path);

    const reader = createInterface({input: stream, crlfDelay: Infinity});

    for await (const line of reader)
        {
        yield line;
        }
    }
*/
function concat(directory, separator = "\n\n") {
    let contents = [];
    readTextFilesRecursively(directory, true, (path, content) => {
        contents.push(content);
    });
    return contents.join(separator);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { getFilesAndDirectories, walkFilesRecursively, readTextFilesRecursively, readAsBase64, concat };
