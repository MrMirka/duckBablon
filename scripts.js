
let triger, pointLigth, pointLigth1, pointLigth2, pointLigth3, pointLigth4;

const canvas = document.getElementById('canvas');
const engine = new BABYLON.Engine(canvas, true);


let divFps = document.getElementById("fps");

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color3.Black();

    const camera = new BABYLON.ArcRotateCamera('camera', Math.PI/1.4, Math.PI * .3, 4, new BABYLON.Vector3(0,0,0), scene);
   // camera.attachControl(canvas, true);
    

    //const ligth = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0), scene);

    pointLigth = new BABYLON.PointLight('pointLigth', new BABYLON.Vector3(0,0,0), scene);
    pointLigth.intensity = 30;
    pointLigth.diffuse = new BABYLON.Color3(1, 0, 0);

    pointLigth1 = new BABYLON.PointLight('pointLigth1', new BABYLON.Vector3(0,1,0), scene);
    pointLigth1.intensity = 55;
    pointLigth1.diffuse = new BABYLON.Color3(0, 1, 0);

    pointLigth2 = new BABYLON.PointLight('pointLigth2', new BABYLON.Vector3(0,1.4,0), scene);
    pointLigth2.intensity = 30;

    pointLigth3 = new BABYLON.PointLight('pointLigth3', new BABYLON.Vector3(0,2,0), scene);
    pointLigth3.intensity = 10;

    pointLigth4 = new BABYLON.PointLight('pointLigth4', new BABYLON.Vector3(0,2,0), scene);
    pointLigth4.intensity = 50;
    pointLigth4.diffuse = new BABYLON.Color3(0, 0, 1);
    
    
    BABYLON.SceneLoader.Append('obj/', 'duck_duck.gltf', scene, function (scene) {
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
    scene.environmentIntensity = 0.5;
   

    

    return scene;
}

const scene = createScene();

engine.runRenderLoop(function () {
    triger = Date.now() * 0.0005;

    pointLigth.position.x = Math.sin(triger) * 5;
    pointLigth.position.z = Math.cos(triger) * 5;

    pointLigth1.position.x = Math.sin(triger *2) * 15;
    pointLigth1.position.z = Math.cos(triger *2) * 15;

    pointLigth2.position.x = -Math.sin(triger *3) * 4;
    pointLigth2.position.z = -Math.cos(triger *3) * 4;

    pointLigth3.position.x = -Math.sin(triger *.3) * 5;
    pointLigth3.position.z = -Math.cos(triger *.3) * 5;

    pointLigth4.position.x = -Math.sin(triger * 2) * 14;
    pointLigth4.position.z = -Math.cos(triger * 2) * 14;

    divFps.innerHTML = engine.getFps().toFixed() + " fps " + engine.webGLVersion;
    scene.render();
});