import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive object={earth.scene} scale={1.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <div
      style={{
        width: "50%", // Ajuste a largura para ocupar metade da tela
        height: "70%",
        position: "absolute", // Adicione position relative
        zIndex: 1, // Defina um valor para o z-index
      }}
    >
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100, // Reduza esse valor para trazer a Terra mais próxima
          position: [0, 1, 4], // Ajuste a posição da câmera aqui
        }}
        style={{ position: "absolute" }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            autoRotateSpeed={2.0}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Earth />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;
