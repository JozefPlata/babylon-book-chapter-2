import {ArcRotateCamera, Engine, MeshBuilder, Scene, Vector3} from "@babylonjs/core";

export class App {
    constructor() {
        const canvas = <HTMLCanvasElement> document.getElementById('babylonApp');
        const engine = new Engine(canvas);
        const scene = new Scene(engine);
        const camera = new ArcRotateCamera('camera', Math.PI / 4, Math.PI / 4, 5, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        MeshBuilder.CreateGround('ground', { width: 3, height: 3 }, scene);

        engine.runRenderLoop(() => {
            scene.render();
        })
    }
}