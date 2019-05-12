import React from 'react'
import * as THREE from 'three'

import dice1 from './img/dice-1.png'
import dice2 from './img/dice-2.png'
import dice3 from './img/dice-3.png'
import dice4 from './img/dice-4.png'
import dice5 from './img/dice-5.png'
import dice6 from './img/dice-6.png'

const imgs = [dice1, dice2, dice3, dice4, dice5, dice6]

const loader = new THREE.TextureLoader()
const loaders = imgs.map(img => loader.load(img))
const materials = loaders.map(ldr => new THREE.MeshBasicMaterial({map: ldr }))

const Dice = React.forwardRef((_, ref) => {
    return (
      <mesh
        ref={ref}
        castShadow receiveShadow
        geometry={new THREE.BoxGeometry(5, 5, 5)}
        material={materials}
      />
    )
  })

  export default Dice