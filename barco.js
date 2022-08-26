class Barco{
    constructor(x,y,width,height,barcopos,barcoanime){
        this.body=Bodies.rectangle(x,y,width,height)
        this.animation=barcoanime
        this.speed=0.05
        this.isBroken=false
        this.width=width
        this.height=height
        this.image=loadImage("assets/boat.png")
        this.barcoposition=barcopos
        World.add(world,this.body)
    }
    animate(){
        this.speed+=0.05
    }
    remove(index){
        this.animation=quebradoanime
        this.speed=0.05
        this.width=300
        this.height=300
        this.isBroken=true
        setTimeout(()=>{
            Matter.World.remove(world,barcos[index].body)
            delete barcos[index]
        },2000)
    }
        display(){
        var angle=this.body.angle
        var pos=this.body.position
        var index=floor(this.speed%this.animation.length)
        push()
        translate(pos.x,pos.y)
        rotate(angle)
        imageMode(CENTER)
        image (this.animation[index],0,this.barcoposition,this.width,this.height)
        pop ()
    }
}