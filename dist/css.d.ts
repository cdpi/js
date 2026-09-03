import { type Nullable } from "./util.js";
declare function getAll(): Array<string>;
declare function getActiveStyleSheet(): Nullable<string>;
declare function setActiveStyleSheet(title: string): void;
declare abstract class ThemeObserver {
    protected readonly darkMode: MediaQueryList;
    constructor();
    protected abstract onSystemThemeChange(isDarkMode: boolean): void;
    private init;
}
declare class ThemeManager extends ThemeObserver {
    constructor();
    get activeTheme(): Nullable<string>;
    set activeTheme(theme: string);
    get themes(): Array<string>;
    protected onSystemThemeChange(isDarkMode: boolean): void;
}
export { getAll, getActiveStyleSheet, setActiveStyleSheet, ThemeObserver, ThemeManager };
