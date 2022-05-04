class Wiggle1D{
    value = 0;
    max;
    scalar = 0;

    constructor(max, scalar) {
        this.max = max;
        this.scalar = scalar;
    }

    update(){
        this.value += (Math.random() * (this.max *2) - this.max)*this.scalar;
        

        if(this.value > 0 && this.value > this.max){
            this.value = this.max;
        }else if (this.value < 0 && this.value < -this.max){
            this.value = -this.max;
        }

        
    }

}