import {
    ArcRotateCamera,
    Color3,
    Engine,
    MeshBuilder,
    PointLight, Scalar,
    Scene,
    StandardMaterial,
    Texture,
    Vector3
} from "@babylonjs/core";
import {StarfieldProceduralTexture} from "@babylonjs/procedural-textures";

export class StartScene extends Scene {
    public environment;
    public star;
    public planets;

    constructor(engine: Engine) {
        super(engine);
        const camAlpha = 0;
        const camBeta = Math.PI / 2;
        const camDist = 350;
        const camTarget = Vector3.Zero();

        const camera = new ArcRotateCamera('camera1', camAlpha, camBeta, camDist, camTarget, this);

        this.environment = this._setupEnvironment(this);
        this.star = this._createStar(this);
        this.planets = this._populatePlanetarySystem(this);

        camera.attachControl(true);
    }

    private _createStar(scene: Scene) {
        const starDiam = 16;
        const star = MeshBuilder.CreateSphere('star', { diameter: starDiam, segments: 128 }, scene);
        const mat = new StandardMaterial('starMat', scene);
        star.material = mat;
        mat.emissiveColor = new Color3(0.37, 0.333, 0.11);
        mat.diffuseTexture = new Texture('assets/textures/starDistortion.png', scene);
        mat.diffuseTexture.level = 3.8;

        return star;
    }

    private _setupEnvironment(scene: Scene) {
        const starfieldPT = new StarfieldProceduralTexture('starfieldPT', 512, scene);
        starfieldPT.coordinatesMode = Texture.FIXED_EQUIRECTANGULAR_MIRRORED_MODE;
        starfieldPT.darkmatter = 1.5;
        starfieldPT.distfading = 0.75;
        const options = {
            skyboxSize: 512,
            createGround: false,
            skyboxTexture: starfieldPT,
            environmentTexture: starfieldPT
        }
        const light = new PointLight('starLight', Vector3.Zero(), scene);
        light.intensity = 2;
        light.diffuse = new Color3(0.98, 0.9, 1);
        light.specular = new Color3(1, 0.9, 0.5);

        return scene.createDefaultEnvironment(options);
    }

    private _populatePlanetarySystem(scene: Scene) {
        const planets = [];
        const hg = {
            name: "hg",
            posRadians: Scalar.RandomRange(0, 2 * Math.PI),
            posRadius: 14,
            scale: 2,
            color: new Color3(0.45, 0.33, 0.18),
            rocky: true
        };
        const aphro = {
            name: "aphro",
            posRadians: Scalar.RandomRange(0, 2 * Math.PI),
            posRadius: 35,
            scale: 3.5,
            color: new Color3(0.91, 0.89, 0.72),
            rocky: true
        };
        const tellus = {
            name: "tellus",
            posRadians: Scalar.RandomRange(0, 2 * Math.PI),
            posRadius: 65,
            scale: 3.75,
            color: new Color3(0.17, 0.63, 0.05),
            rocky: true
        };
        const ares = {
            name: "ares",
            posRadians: Scalar.RandomRange(0, 2 * Math.PI),
            posRadius: 100,
            scale: 3,
            color: new Color3(0.55, 0, 0),
            rocky: true
        };
        const zeus = {
            name: "zeus",
            posRadians: Scalar.RandomRange(0, 2 * Math.PI),
            posRadius: 160,
            scale: 6,
            color: new Color3(1, 0.68, 0),
            rocky: false
        };
        planets.push(this._createPlanet(hg, scene));
        planets.push(this._createPlanet(aphro, scene));
        planets.push(this._createPlanet(tellus, scene));
        planets.push(this._createPlanet(ares, scene));
        planets.push(this._createPlanet(zeus, scene));

        return planets;
    }

    private _createPlanet(options: { posRadians: number; posRadius: number; color: Color3; name: string; scale: number; rocky: boolean }, scene: Scene) {
        const planet = MeshBuilder.CreateSphere(options.name, { diameter: 1 }, scene);
        const material = new StandardMaterial(`${planet.name}_mat`, scene);
        material.diffuseColor = material.specularColor = options.color;
        material.specularPower = 0;
        if (options.rocky) material.bumpTexture = new Texture('assets/textures/starDistortion.png', scene);
        material.diffuseTexture = new Texture('assets/textures/starDistortion.png', scene);
        planet.material = material;
        planet.scaling.setAll(options.scale);
        planet.position.x = options.posRadius * Math.sin(options.posRadians);
        planet.position.z = options.posRadius * Math.cos(options.posRadians);

        return planet;
    }
}
