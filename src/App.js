import * as THREE from 'three'
import * as CANNON from 'cannon'
import React, { useCallback, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { useCannon, Provider } from './useCannon'
import Dice from './Dice'
import Cheats from './Cheats'

const rand = (min, max) => Math.floor((Math.random() * max) + min);
const onCanvasCreated = ({ gl }) => {
  gl.shadowMap.enabled = true
  gl.shadowMap.type = THREE.PCFSoftShadowMap
}

const u = 60
const f = u / 2
const w = 1000 / u
const h = 1000 / u

const Plane = ({ position }) => {
  const ref = useCannon({ mass: 0 }, body => {
    body.addShape(new CANNON.Plane())
    body.position.set(...position)
  })
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial attach="material" color="#008000" />
    </mesh>
  )
}

const Wall = ({ position, shape }) => {
  const ref = useCannon({ mass: 0 }, body => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(...shape)))
    body.position.set(...position)
    body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), -Math.PI / 12);
  })
  return (
    <mesh
      ref={ref}
      geometry={new THREE.BoxGeometry(...shape)}
    >
      <meshLambertMaterial attach="material" transparent opacity={0} />
    </mesh>
  )
}

// it works only for this gravity and distance from walls
const resultMatrix = { 1: [4, 5, 5], 2: [4, 4, 4], 3: [4, 7, 5], 4: [3, 5, 4], 5: [3, 5, 6], 6: [4, 5, 4] }

const Box = ({ position, result, shiftResult }) => {
  const ref = useCannon({ mass: 100000 }, body => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(3, 3, 3)))
    body.position.set(...position)
    // random...
    shiftResult()
    const random = [rand(2, 6), rand(3, 6), rand(3, 6)]
    const axis = new CANNON.Vec3(...resultMatrix[result] || random);
    body.quaternion.setFromAxisAngle(axis, -Math.PI / 3);
  })

  return <Dice ref={ref} />
}

export default function App() {
  const [isUp, setIsUp] = useState(true)
  const setUp = useCallback(() => setIsUp(false), [])
  const setDown = useCallback(() => setIsUp(true), [])

  const [cheatList, setCheat] = useState([0])
  const shiftResult = useCallback(() => setCheat(cheatList.slice(1)), [cheatList])

  return (
    <main>
      <Canvas
        camera={{ position: [0, 0, f] }}
        onCreated={onCanvasCreated}
        onMouseUp={setUp}
        onMouseDown={setDown}
      >
        <ambientLight intensity={0.6} />
        <spotLight
          intensity={0.6}
          position={[30, 30, 50]}
          angle={0.2}
          penumbra={1}
          castShadow
        />
        <Provider>
          <Plane position={[0, 0, -(f / 2)]} />
          <Wall position={[0, h, 0]} shape={[u, 1, u]} />
          <Wall position={[0, -h, 0]} shape={[u, 1, u]} />
          <Wall position={[-w, 0, 0]} shape={[1, u, u]} />
          <Wall position={[w, 0, 0]} shape={[1, u, u]} />
          {!isUp && <Box position={[0, 0, 0]} result={cheatList[0]} shiftResult={shiftResult} />}
        </Provider>
      </Canvas>
      <Cheats cheatList={cheatList} setCheat={setCheat} />
    </main>
  )
}