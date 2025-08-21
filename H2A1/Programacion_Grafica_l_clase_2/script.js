
const escena = new THREE.Scene();
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderizador.domElement);


const ancho = window.innerWidth;
const alto = window.innerHeight;
const camara = new THREE.OrthographicCamera(ancho / -2, ancho / 2, alto / 2, alto / -2, 0.1, 1000);
camara.position.z = 10;

function crearEstrella(radioExterior, radioInterior, puntas) {
    const shape = new THREE.Shape();
    const paso = Math.PI / puntas;
    for (let i = 0; i < puntas * 2; i++) {
        const r = (i % 2 === 0) ? radioExterior : radioInterior;
        const x = Math.cos(i * paso) * r;
        const y = Math.sin(i * paso) * r;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
}

const geometríaEstrella = crearEstrella(80, 40, 5);
const materialEstrella = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const estrella = new THREE.Mesh(geometríaEstrella, materialEstrella);
escena.add(estrella);

const shapeTriangulo = new THREE.Shape();
shapeTriangulo.moveTo(0, 50);
shapeTriangulo.lineTo(-50, -50);
shapeTriangulo.lineTo(50, -50);
shapeTriangulo.closePath();

const geometríaTriangulo = new THREE.ShapeGeometry(shapeTriangulo);
const materialTriangulo = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const triangulo = new THREE.Mesh(geometríaTriangulo, materialTriangulo);
triangulo.position.x = 200;
escena.add(triangulo);

function animacion() {
    requestAnimationFrame(animacion);

    estrella.rotation.z += 0.01;
    triangulo.rotation.z += 0.02;

    renderizador.render(escena, camara);
}

animacion();

window.addEventListener('resize', () => {
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    camara.left = ancho / -2;
    camara.right = ancho / 2;
    camara.top = alto / 2;
    camara.bottom = alto / -2;
    camara.updateProjectionMatrix();
    renderizador.setSize(ancho, alto);
});