import {ArcRotateCamera, Engine, Scene, Vector3} from "@babylonjs/core";

export class StartScene extends Scene{
    public environment;
    public star;
    public planets;

    constructor(engine: Engine) {
        super(engine);
        const camAlpha = 0;
        const camBeta = -Math.PI / 4;
        const camDist = 350;
        const camTarget = Vector3.Zero();

        const camera = new ArcRotateCamera('camera1', camAlpha, camBeta, camDist, camTarget, this);

        this.environment = this._setupEnvironment(this);
        this.star = this._createStar(this);
        this.planets = this._populatePlanetarySystem(this);

        camera.attachControl(true);
    }

    private _createStar(scene: Scene) {
        return null;
    }

    private _setupEnvironment(scene: Scene) {
        return null;
    }

    private _populatePlanetarySystem(scene: Scene) {
        return null;
    }
}
