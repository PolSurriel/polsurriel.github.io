
export class DebugPoints {

    private static styleInitialized = false

    public static debugPos(x:number, y:number, debugId = '0') {

        if(!DebugPoints.styleInitialized){
            DebugPoints.styleInitialized = true
            document.body.innerHTML += `
            <style>
                .debug{
                    position: fixed;
                    background-color: red;
                    width: 10px;
                    height: 10px;
                }
            </style>
            `
        }

        let debug = document.getElementById('debug'+debugId)!!

        if(debug == null){
            document.body.innerHTML += `
                <div id="debug${debugId}" class="debug">${debugId}</div>
            ` 
            debug = document.getElementById('debug'+debugId)!!
        }

        x -= 5
        y -= 5
        debug.style.left = x + 'px'
        debug.style.top = y + 'px'
    }

}