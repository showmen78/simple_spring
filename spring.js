
let gravity =3;
let move = false;

//This is the spring class that represent the unit portion of a spring.
class Spring{
    constructor(start,end,screen){
        this.start = start;
        this.end = end;
        this.screen = screen;
      
        //the begining position  of the rope

        this.anchor = new Shape('#00d100');
        this.anchor.z_index= "11";
        this.bob = new Shape('#000080');
        this.bob.z_index = "11";

        this.rope = new Shape('white');
      
       

        this.rest_len = this.magnitude(this.position_vector());
        this.speed = {x:0,y:0};
       

        this.draw();
        this.body = null;




   
 


       
       
    }

    update(){
        let displacement = this.magnitude(this.position_vector())- this.rest_len;
  
        // at initial condition force = gravity,so bob remains static.
        let force = -.5*displacement-gravity;//M=1 so F= a;
        this.speed.x += force*this.unit_vector(this.position_vector()).x;

        //add gravity to the y component
        this.speed.y += force*this.unit_vector(this.position_vector()).y+gravity;

        this.end.x += this.speed.x;
        this.end.y += this.speed.y;



        this.draw();


        this.speed.x *= .99;
        this.speed.y *= .99;
        

        this.takeInput();


        
  
}

    draw(){

       //draws the anchor and the bob.
        this.anchor.drawCircle(20,this.start.x,this.start.y,this.screen);
        this.body=this.bob.drawCircle(100,this.end.x,this.end.y,this.screen);
        this.rope.drawLine(this.start.x,this.start.y,this.end.x,this.end.y,this.screen);

        
    }

    position_vector(){
        //returns the position vector of the bob.
        //downward direction is positive.
        return {x:this.end.x-this.start.x,y:this.end.y-this.start.y};
    }
    magnitude(a){
        //returns magnitude of a vector.
        return Math.sqrt(a.x*a.x+a.y*a.y);
    }
    unit_vector(a){
        //returns the unit vector of a vector 'a'
        return {x:(a.x/this.magnitude(a)),y:(a.y/this.magnitude(a))};
    }


    takeInput(){
       

    this.body.addEventListener('mousedown',(e)=>{
        move = true;
    })

    this.body.addEventListener('mouseup',(e)=>{
        move = false
    })

    this.body.addEventListener('mousemove',(e)=>{
        if(move){
            this.end.x = e.x;
            this.end.y = e.y;
            this.speed ={x:0,y:0};
           
           
           // spring.radius= spring.magnitude(spring.point_vector())
           // spring.update();
        }
    })
    


        

    }

    




}