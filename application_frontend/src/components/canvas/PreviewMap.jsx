import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Map = () => {
  const office = useGLTF("./mersus_office/scene.gltf");

  return (
    <primitive object={office.scene} scale={1.0} position-y={-1} rotation-y={0} />
  );
};

const MapCanvas = () => {
  return (
    <div>
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100, // Reduza esse valor para trazer a Terra mais próxima
          position: [0, 5, 20], // Ajuste a posição da câmera aqui
        }}
        style={{ position: "absolute" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight color="white" intensity={1} position={[5, 10, 2]} castShadow />
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate={false}
            autoRotateSpeed={2.0}
            enableZoom={true}
          />
          <Map />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MapCanvas;
