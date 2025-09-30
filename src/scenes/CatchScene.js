import Phaser from 'phaser'

export default class CatchScene extends Phaser.Scene {
  constructor(){ super('catch'); this.score=0; this.timeLeft=30 }

  create(){
    const { width, height } = this.scale
    this.cameras.main.setBackgroundColor('#0a0718')
    this.scoreText = this.add.text(20,20,'Score: 0',{fontSize:'22px', color:'#8EFF98'})
    this.timerText = this.add.text(width-20,20,'30s',{fontSize:'22px', color:'#ffd86a'}).setOrigin(1,0)

    this.physics.world.setBounds(0,0,width,height)

    this.basket = this.add.rectangle(width/2, height-40, 90, 18, 0xffd86a).setStrokeStyle(2,0xffffff)
    this.physics.add.existing(this.basket, true)

    this.coins = this.physics.add.group()
    this.physics.add.overlap(this.basket, this.coins, (_, coin)=>{
      this.score++; this.scoreText.setText('Score: ' + this.score); coin.destroy()
    })

    this.time.addEvent({ delay: 700, loop:true, callback: ()=>{
      const x = Phaser.Math.Between(20, width-20)
      const coin = this.add.circle(x, -20, 10, 0x8a5dff)
      this.physics.add.existing(coin)
      coin.body.setVelocity(0, Phaser.Math.Between(140, 220))
      coin.body.setCircle(10)
      this.coins.add(coin)
    }})

    this.input.on('pointermove', p=>{
      this.basket.x = Phaser.Math.Clamp(p.x, 45, width-45)
      this.basket.body.updateFromGameObject()
    })

    this.time.addEvent({ delay:1000, loop:true, callback: ()=>{
      this.timeLeft--; this.timerText.setText(this.timeLeft + 's')
      if(this.timeLeft<=0) this.endGame()
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
