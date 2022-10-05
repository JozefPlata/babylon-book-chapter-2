import {Engine, Scene} from "@babylonjs/core";
import {StartScene} from "~/babylon/StartScene";

export class App {
    private readonly _canvas: HTMLCanvasElement;
    private readonly _engine: Engine;
    private _scene: Scene;

    constructor() {
        this._canvas = <HTMLCanvasElement> document.getElementById('babylonApp');
        this._engine = new Engine(this._canvas);
        this._scene = new StartScene(this._engine);

        this._engine.runRenderLoop(() => {
            this._scene.render();
        })
    }
}
