import Phaser from 'phaser'
import MenuScene from './scenes/MenuScene.js'
import MoleScene from './scenes/MoleScene.js'
import WheelScene from './scenes/WheelScene.js'
import CatchScene from './scenes/CatchScene.js'

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  backgroundColor: '#090a16',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight
  },
  physics: { default: 'arcade', arcade: { debug: false } },
  scene: [MenuScene, MoleScene, WheelScene, CatchScene]
}

const game = new Phaser.Game(config)

// Demo "Claim reward" hook
document.getElementById('claim').addEventListener('click', () => {
  const current = game.scene.getScenes(true)[0] || game.scene.getScene('menu')
  const { width, height } = current.scale
  const t = current.add.text(width/2, height*0.85, 'Reward claimed!', { fontSize:'20px', color:'#fff', backgroundColor:'#0008', padding:{x:12,y:8} }).setOrigin(0.5)
  current.tweens.add({ targets:t, alpha:0, duration:1200, delay:600, onComplete:()=>t.destroy() })
})
