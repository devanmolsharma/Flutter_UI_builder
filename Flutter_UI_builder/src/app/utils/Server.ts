import Block from "../Block";

class Server {

    constructor(public serverUrl: string,) { };

    async uploadWidgets(block:Block): Promise<void> {
        throw "NOT IMPLEMENTED"
    }

    async showChanges(): Promise<void> {
        await fetch(this.serverUrl + ":8080/render/");
    }

    downloadCompiledCode(type: 'web' | 'apk' | 'aab' | 'linux'): void {
        location.href = this.serverUrl + ":8080/build/" + type;
    }

}