
const canvas = document.getElementById('canvas');
const engine = new BABYLON.Engine(canvas, true);
let divFps = document.getElementById("fps");

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color3.Black();

    const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI/2, Math.PI / 2.5, 3, new BABYLON.Vector3(0,0,0), scene);
    camera.attachControl(canvas, true);

    const ligth = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), scene);
    
    //BABYLON.GLTFFileLoader.IncrementalLoading = true;
    BABYLON.SceneLoader.Append('obj/', 'duck.gltf', scene, function (scene) {
        const hdri = BABYLON.CubeTexture.CreateFromPrefilteredData('./img/environment.env', scene);
         scene.enviromentTexture = hdri;
    });

    //const hdri = BABYLON.CubeTexture.CreateFromPrefilteredData('./img/environment.env', scene);
    const hdri = new BABYLON.CubeTexture('./img/environment.env', scene);
    //scene.createDefaultSkybox(hdri, true);
    scene.environmentTexture = hdri;
    //scene.environmentTexture = new BABYLON.CubeTexture("./img/environment.env", scene);

    

    return scene;
}

const scene = createScene();

engine.runRenderLoop(function () {
    divFps.innerHTML = engine.getFps().toFixed() + " fps";
    scene.render();
});