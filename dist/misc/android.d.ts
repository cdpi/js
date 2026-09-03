declare const FILENAME_APPFILTER = "appfilter.xml";
declare const FILENAME_DRAWABLE = "drawable.xml";
type ParseCallback = (name: string, pkg: string, activity: string, drawableName: string) => void;
declare function parse(path: string, callback: ParseCallback): void;
declare function csvToAppFilter(path: string): string;
declare function csvToDrawable(path: string): string;
export { FILENAME_APPFILTER, FILENAME_DRAWABLE, type ParseCallback, parse, csvToAppFilter, csvToDrawable };
