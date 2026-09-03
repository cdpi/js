type FilesAndDirectories = {
    files: Array<string>;
    directories: Array<string>;
};
type WalkFilesRecursivelyCallback = (path: string) => void;
type ReadTextFilesRecursivelyCallback = (path: string, content: string) => void;
declare function getFilesAndDirectories(directory?: string, sort?: boolean): FilesAndDirectories;
declare function walkFilesRecursively(directory: string, sort: boolean, callback: WalkFilesRecursivelyCallback): void;
declare function readTextFilesRecursively(directory: string, sort: boolean, callback: ReadTextFilesRecursivelyCallback): void;
declare function readAsBase64(path: string): string;
declare function concat(directory: string, separator?: string): string;
export { type FilesAndDirectories, type WalkFilesRecursivelyCallback, type ReadTextFilesRecursivelyCallback, getFilesAndDirectories, walkFilesRecursively, readTextFilesRecursively, readAsBase64, concat };
