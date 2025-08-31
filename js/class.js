const rect1 = {                     //define a variable
    width :2,
    height:3,
    color:"red"
}

function area(rect){                        //define a fxn 
    return rect.width * rect . height 
}

// console.log("the area is : ", area(rect1))   // call the fxn with the rec1 variable


class Rectangle {
    constructor (width,height,color){
        this.width = width;
        this.height = height;
        this.color = color;
    } 


area () {
    const area = this.width * this.height;
    // console.log(this)
    return area;
}

paint() {
    console.log(`The color is ${this.color}`);
}

}

const rect = new Rectangle (2,4,"red")
console.log("area:", rect.area())
rect.paint()
