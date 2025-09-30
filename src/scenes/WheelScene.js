import Phaser from 'phaser'

export default class WheelScene extends Phaser.Scene {
  constructor(){ super('wheel'); this.spinning = false }

  create(){
    const { width, height } = this.scale
    this.cameras.main.setBackgroundColor('#0a0718')
    this.add.text(width/2, 40, '🎡 Spin the Wheel', { fontSize:'24px', color:'#fff' }).setOrigin(0.5)
    this.add.text(width/2, height-30, 'Tap wheel to spin • ESC = Menu', { fontSize:'14px', color:'#a9b7d8' }).setOrigin(0.5)

    const radius = Math.min(width, height)*0.28
    const prizes = ['+10','+20','+30','+50','Try again','x2','+15','Jackpot']
    const seg = (Math.PI*2) / prizes.length

    const g = this.add.graphics({ x: width/2, y: height/2 })
    for(let i=0;i<prizes.length;i++){
      g.fillStyle(i%2 ? 0x8a5dff : 0x56d0ff, 1)
      g.slice(0,0,radius, i*seg, (i+1)*seg, false).fillPath()
    }
    g.lineStyle(6, 0xffffff).strokeCircle(0,0,radius)
    const wheelTex = g.generateTexture('wheel', radius*2+10, radius*2+10).key
    g.destroy()

    this.wheel = this.add.image(width/2, height/2, wheelTex).setInteractive({ useHandCursor:true })
    this.wheel.on('pointerdown', ()=> this.spin(prizes))

    prizes.forEach((p,i)=>{
      const angle = i*seg + seg/2 - Math.PI/2
      const x = width/2 + Math.cos(angle)*(radius*0.65)
      const y = height/2 + Math.sin(angle)*(radius*0.65)
      this.add.text(x,y,p,{fontSize:'18px', color:'#0a0718'}).setOrigin(0.5)
    })

    this.add.triangle(width/2, height/2 - radius - 18, 0,18, 18,18, 9,0, 0xffd86a).setStrokeStyle(2,0xffffff)
    this.input.keyboard.on('keydown-ESC', ()=> this.scene.start('menu'))
  }

  spin(prizes){
    if(this.spinning) return
    this.spinning = true
    const seg = 360/prizes.length
    the targetIndex = Phaser.Math.Between(0, prizes.length-1)
    const targetAngle = 360*4 + (targetIndex*seg) + seg/2
    this.tweens.add({
      targets: this.wheel, angle: targetAngle, duration: 3200, ease: 'Cubic.easeOut',
      onComplete: () => {
        this.spinning = false
        const prize = prizes[targetIndex]
        this.showToast(`You got: ${prize}`)
      }
    })
  }

  showToast(msg){
    const { width, height } = this.scale
    const t = this.add.text(width/2, height*0.85, msg, { fontSize:'22px', color:'#fff', backgroundColor:'#0008', padding:{x:12, y:8} }).setOrigin(0.5)
    this.tweens.add({ targets:t, alpha:0, duration:1400, delay:900, onComplete:()=>t.destroy() })
  }
}
