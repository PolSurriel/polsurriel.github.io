class Increment {

    increment;
    currentTime;
    timeEndAc;
    timeStartDec;
    timeEndDec;

    /**
     * 
     * @param {Number} increment    "Constant velocity" 
     * @param {Number} initialTime (in seconds)
     * @param {Number} timeEndAc  (in seconds)
     * @param {Number} timeStartDec (in seconds)
     * @param {Number} timeEndDec (in seconds)
     */
    constructor(increment, initialTime, timeEndAc, timeStartDec, timeEndDec){
        this.increment = increment; 
        this.currentTime = initialTime; 
        this.timeEndAc = timeEndAc; 
        this.timeStartDec = timeStartDec; 
        this.timeEndDec = timeEndDec; 

        if(timeStartDec === undefined || timeEndDec === undefined){
            this.value = function(){
                return Increment.ac(this.increment, this.currentTime, this.timeEndAc);

            }
        }

    }


    /**
     * Returns the increment relative to the current time.
     * 
     * WITHOUT INCREMENT THE TIME
     */
    value(){
        if(this.currentTime < this.timeEndAc){
            return Increment.ac(this.increment, this.currentTime, this.timeEndAc);
        
        }else if (this.currentTime >= this.timeStartDec){
            return Increment.dec(this.increment, this.currentTime, this.timeStartDec, this.timeEndDec);
        
        }else {
            return this.increment;
        }
    }

    /**
     * Returns the increment relative to the current time.
     * 
     * AND INCREMETNS THIS TIME
     */
    valueInc(){
        this.inc();
        return this.value();
    }

    /**
     * Returns the increment in UMI relative to the current time.
     * 
     * AND INCREMETNS THIS TIME
     */
    umiInc(){
        return UMI.speed(this.valueInc());
    }

    /**
     * Returns the increment in UMI relative to the current time.
     * 
     * WITHOUT INCREMENT THE TIME
     */
    umi(){
        return UMI.speed(this.value());
        
    }

    /**
     * Increments the time by UMI.speed() function;
     */
    inc(){
        this.currentTime += UMI.speed(1);
    }


    static ac(increment, currentTime, timeEndAc){
        return map(currentTime, 0, timeEndAc, 0, increment, true);
    }

    static dec(increment, currentTime, timeStartDec, timeEndDec){
        return map(currentTime, timeStartDec, timeEndDec, increment, 0, true);
    }

    static acdec(increment, currentTime, timeEndAc, timeStartDec, timeEndDec){
        
        
        if(currentTime < timeEndAc){
            return Increment.ac(increment, currentTime, timeEndAc);
        
        }else if (currentTime >= timeStartDec){
            return Increment.dec(increment, currentTime, timeStartDec, timeEndDec);
        
        }else {
            return increment;
        }
    }

}