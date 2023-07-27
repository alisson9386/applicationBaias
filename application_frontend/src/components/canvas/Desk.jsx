import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Desk = () => {
    const desk = useGLTF("./office_computer/scene.gltf");
  
    return (
      <primitive object={desk.scene} scale={0.07} position-y={-2} rotation-y={5} />
    );
};

const DeskCanvas = () => {
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
            position: [0, 5, 20], // Ajuste a posição da câmera aqui
          }}
          style={{ position: "absolute" }}
        >
        <ambientLight intensity={0.5} />
        <directionalLight color="white" intensity={1} position={[5, 10, 2]} castShadow />
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              enableRotate={true}
              autoRotate={true}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2.5}
            minPolarAngle={Math.PI / 2.5}
            />
            <Desk />
  
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
    );
  };
  
  export default DeskCanvas;