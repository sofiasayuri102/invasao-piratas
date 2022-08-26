class Baladecanhao{
    constructor(x,y){
        var options={
            isStatic:true
        }
        this.r=30
        this.body=Bodies.circle(x,y,this.r,options)
    this.image=loadImage("assets/cannonball.png")
    this.animation=[this.image]
    this.speed=0.05
    this.isSink=false
    World.add(world,this.body)
    }
    atirar(){
        var newangle=canhao.angle-28
        newangle=newangle*(3.14/180)
        var velocidade=p5.Vector.fromAngle(newangle)
        velocidade.mult(0.5)
        Matter.Body.setStatic(this.body,false)
        Matter.Body.setVelocity(this.body,{
            x:velocidade.x*(180/3.14),
            y:velocidade.y*(180/3.14)
        })
    }
    animate(){
        this.speed+=0.05
    }
    remove(index){
        this.isSink=true
        Matter.Body.setVelocity(this.body,{x:0,y:0})
        this.animation=respingoanime
        this.speed=0.05
        this.r=150
                setTimeout(()=>{
            Matter.World.remove(world,this.body)
            delete balas[index]
        },1000)
    }
display(){
    var angle=this.body.angle
    var pos=this.body.position
    var index=floor(this.speed%this.animation.length)
    push ()
    translate(pos.x,pos.y)
    rotate(angle)
    imageMode(CENTER)
    image(this.animation[index],0,0,this.r,this.r)
    pop()
}
}