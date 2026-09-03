declare class Piper {
    private readonly piperCli;
    private readonly aplayCli;
    constructor(piper: string, voice: string, rate: string | number);
    say(message: string): void;
}
export { Piper };
