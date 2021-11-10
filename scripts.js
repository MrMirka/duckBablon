
let triger, pointLigth;

const canvas = document.getElementById('canvas');
const engine = new BABYLON.Engine(canvas, true);


let divFps = document.getElementById("fps");

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color3.Black();

    const camera = new BABYLON.ArcRotateCamera('camera', Math.PI/1.4, Math.PI * .3, 4, new BABYLON.Vector3(0,0,0), scene);
    camera.attachControl(canvas, true);
    

    //const ligth = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), scene);

    pointLigth = new BABYLON.PointLight('pointLigth', new BABYLON.Vector3(0,0,0), scene);
    pointLigth.intensity = 300;
    
    
    BABYLON.SceneLoader.Append('obj/', 'ball.gltf', scene, function (scene) {
        const hdri = BABYLON.CubeTexture.CreateFromPrefilteredData('./img/environment.env', scene);
         scene.enviromentTexture = hdri;
    });
    

    /*
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 64, 2, scene);
    var pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
    sphere.material = pbr;

    pbr.baseColor = new BABYLON.Color3(1.0, 0.766, 0.336);
    pbr.metallic = 1;
    pbr.roughness = 0.15;
    */
    

    //const hdri = new BABYLON.CubeTexture('./img/environment.env', scene);
    var hdri = new BABYLON.HDRCubeTexture("./img/global_env_2.hdr", scene, 128, false, true, false, true);
    //pbr.environmentTexture = hdri;
    scene.environmentTexture = hdri;
    //scene.environmentIntensity = 0.5;
   

    

    return scene;
}

const scene = createScene();

engine.runRenderLoop(function () {
    triger = Date.now() * 0.0005;

    pointLigth.position.x = Math.sin(triger) * 5;
    pointLigth.position.z = Math.cos(triger) * 5;

    divFps.innerHTML = engine.getFps().toFixed() + " fps " + engine.webGLVersion;
    scene.render();
});