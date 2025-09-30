import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  constructor(){ super('menu') }
  create(){
    const { width, height } = this.scale
    this.cameras.main.setBackgroundColor('#0a0718')
    this.add.text(width/2, height*0.18, 'Mini Game Hub', { fontSize:'34px', fontStyle:'bold', color:'#fff' }).setOrigin(0.5)

    const items = [
      { key:'mole',  label:'🎯 Whack-a-Mole' },
      { key:'wheel', label:'🎡 Spin the Wheel' },
      { key:'catch', label:'🧺 Catch the Coins' },
    ]
    items.forEach((it,i)=>{
      const y = height*0.38 + i*70
      const btn = this.add.text(width/2, y, it.label, {
        fontSize:'24px', color:'#0a0718', backgroundColor:'#8a5dff', padding:{x:16,y:10}
      }).setOrigin(0.5).setInteractive({ useHandCursor:true })
      btn.on('pointerdown', ()=> this.scene.start(it.key))
    })
    this.add.text(width/2, height*0.9, 'Press ESC to return to menu', { fontSize:'14px', color:'#a9b7d8' }).setOrigin(0.5)
  }
}
