import Block from "../Block";
import Compiler from "./Compiler";

class Server {

    constructor(public serverUrl: string,) { };

    async uploadWidgets(block:Block): Promise<void> {
        await fetch(this.serverUrl + ":8080/update", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              newCode: Compiler.compileBlock(block),
            }),
          });
    }

    async renderChanges(): Promise<void> {
        await fetch(this.serverUrl + ":8080/render/");
    }

    downloadCompiledCode(type: 'web' | 'apk' | 'aab' | 'linux'): void {
        location.href = this.serverUrl + ":8080/build/" + type;
    }
    
}