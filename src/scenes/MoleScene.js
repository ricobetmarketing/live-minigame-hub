import Phaser from 'phaser'

export default class MoleScene extends Phaser.Scene {
  constructor(){ super('mole'); this.score = 0; this.timeLeft = 30 }

  create(){
    const { width, height } = this.scale
    this.cameras.main.setBackgroundColor('#0a0718')
    this.scoreText = this.add.text(width/2, 30, 'Score: 0', { fontSize:'24px', color:'#8EFF98' }).setOrigin(0.5)
    this.timerText = this.add.text(width-20, 30, '30s', { fontSize:'22px', color:'#ffd86a' }).setOrigin(1,0.5)
    this.add.text(20, 30, '🎯 Whack-a-Mole', { fontSize:'22px', color:'#fff' }).setOrigin(0,0.5)

    this.holes = []
    const cols = 3, rows = 3
    const gridW = Math.min(width*0.8, height*0.8)
    const startX = (width - gridW)/2, startY = (height - gridW)/2
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const x = startX + (c+0.5)*(gridW/cols)
        const y = startY + (r+0.5)*(gridW/rows)
        this.add.circle(x, y, gridW/9, 0x22263f)
        const mole = this.add.circle(x, y, gridW/12, 0x8a5dff).setScale(0)
        mole.setInteractive({ useHandCursor: true })
        mole.on('pointerdown', ()=>{
          if(mole.active){
            this.score++; this.scoreText.setText('Score: ' + this.score)
            this.tweens.add({ targets:mole, scale:0, duration:120, ease:'back.in' })
            mole.active = false
          }
        })
        this.holes.push(mole)
      }
    }

    this.time.addEvent({ delay:700, loop:true, callback:()=>{
      const mole = Phaser.Utils.Array.GetRandom(this.holes)
      if(mole.scale < 0.01){
        mole.active = true
        this.tweens.add({
          targets:mole, scale:1, duration:180, ease:'back.out',
          yoyo:true, hold:450, onComplete:()=>{ mole.active=false }
        })
      }
    }})

    this.time.addEvent({ delay:1000, loop:true, callback:()=>{
      this.timeLeft--; this.timerText.setText(this.timeLeft + 's')
      if(this.timeLeft <= 0) this.endGame()
    }})

    this.input.keyboard.on('keydown-ESC', ()=> this.scene.start('menu'))
  }

  endGame(){
    this.scene.pause()
    const { width, height } = this.scale
    const box = this.add.rectangle(width/2, height/2, width*0.8, 160, 0x000000, 0.7)
    const txt = this.add.text(width/2, height/2, `Time!\nScore: ${this.score}\nClick to return`, {
      fontSize:'24px', color:'#fff', align:'center'
    }).setOrigin(0.5)
    ;[box, txt].forEach(el => el.setInteractive({ useHandCursor:true }).on('pointerdown', ()=> this.scene.start('menu')))
  }
}
