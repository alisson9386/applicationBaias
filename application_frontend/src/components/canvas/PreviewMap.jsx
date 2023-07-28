import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Vector3 } from "three";

import CanvasLoader from "../Loader";

const Point = ({ position, onClick }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshBasicMaterial color="red" />
      <mesh onClick={onClick} />
    </mesh>
  );
};

const Map = () => {
  const office = useGLTF("./mersus_office/scene.gltf");
  const [cameraPosition, setCameraPosition] = useState([0, 10, 20]);
  const targetRef = useRef();

  const handlePointClick = (event) => {
    console.log(event)
    const pointPosition = event.point;
    setCameraPosition([pointPosition.x, pointPosition.y, pointPosition.z + 10]);
  };

  useFrame(() => {
    if (targetRef.current) {
      // Move the camera towards the target position
      const currentPosition = targetRef.current.position;
      const targetPosition = new Vector3(...cameraPosition);
      const direction = targetPosition.clone().sub(currentPosition);
      const distance = direction.length();
      const speed = 0.5; // Adjust this value to control the camera movement speed
      if (distance > 0.1) {
        direction.normalize().multiplyScalar(distance * speed);
        targetRef.current.position.add(direction);
      }
    }
  });

  return (
    <><><primitive object={office.scene} scale={4.5} position-y={-1} rotation-y={15} />
    <Point position={[-11, 4, 5]} onClick={handlePointClick} >1</Point>
    <Point position={[-8, 3.2, 5]} onClick={handlePointClick} >2</Point>
    <Point position={[1, 2.5, -5]} onClick={handlePointClick} >3</Point>
    <Point position={[5, 2.5, -4]} onClick={handlePointClick} >4</Point>
    <Point position={[-3.5, 2.8, -7]} onClick={handlePointClick} >5</Point>
    <Point position={[-2, 3.9, -7]} onClick={handlePointClick} >6</Point>
    <Point position={[2.7, 3.5, -5]} onClick={handlePointClick} >7</Point>
    <Point position={[6.5, 4, -9]} onClick={handlePointClick} >8</Point>
    <Point position={[9, 3.9, -9]} onClick={handlePointClick} >9</Point>
    
    <Point position={[5, 2.5, -4]} onClick={handlePointClick} >10</Point>
    <Point position={[5, 2.5, -4]} onClick={handlePointClick} >11</Point>
    <Point position={[5, 2.5, -4]} onClick={handlePointClick} >12</Point>
    </>
    <pointLight position={[0, 10, 0]} />
    <group ref={targetRef} /></>
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
          far: 100,
          position: [0, 5, 20],
        }}
        style={{ position: "absolute" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight color="white" intensity={1} position={[5, 10, 2]} castShadow />
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enablePan={false} // Impede o pan
            enableZoom={false} // Impede o zoom
            enableRotate={false} // Impede a rotação
            enableDamping // Adiciona um efeito de amortecimento
            dampingFactor={0.1}
            maxPolarAngle={Math.PI / 2.5}
            minPolarAngle={Math.PI / 2.5}
          />
          <Map />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MapCanvas;
