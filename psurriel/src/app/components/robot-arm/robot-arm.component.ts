import { Component, DebugElement, HostListener, OnInit } from '@angular/core';
import { RangeValueAccessor } from '@angular/forms';
import { repeat } from 'rxjs';
import { DebugPoints } from 'src/debugTools/DebugPoints';
import { GithubButtonComponent } from '../github-button/github-button.component';

@Component({
  selector: 'app-robot-arm',
  templateUrl: './robot-arm.component.html',
  styleUrls: ['./robot-arm.component.scss']
})
export class RobotArmComponent implements OnInit {

  base : HTMLElement | undefined
  arm0 : HTMLElement | undefined
  arm1 : HTMLElement | undefined
  arm2 : HTMLElement | undefined

  arm0Rotation = 40
  arm1Rotation = 40
  arm2Rotation = 40

  arm0Length = 120
  arm1Length = 110
  arm2Length = 120

  basePosition = {x:0,y:0}
  arm0EndPosition = {x:0,y:0}
  arm1EndPosition = {x:0,y:0}
  arm2EndPosition = {x:0,y:0}

  mousePosition = {
    x:0,
    y:0
  }

  constructor() { }


  ngOnInit() {
    this.base = document.getElementById('base')!!
    this.arm0 = document.getElementById('arm0')!!
    this.arm1 = document.getElementById('arm1')!!
    this.arm2 = document.getElementById('arm2')!!
  
    setInterval(()=>{this.loopUpdate()}, 100)
  }

 

  private degreeToRadians(degrees:number) : number
  {
    var pi = Math.PI;
    return degrees * (pi/180);
  }

  private rotatePointAroundOther(cx:number,cy:number,angleRadians:number, px:number,py:number) : any
  {
    let s = Math.sin(angleRadians);
    let c = Math.cos(angleRadians);

    // translate point back to origin:
    px -= cx;
    py -= cy;

    // rotate point
    let xnew = px * c - py * s;
    let ynew = px * s + py * c;

    // translate point back:
    xnew += cx;
    ynew += cy;
    return {
      x:xnew,
      y:ynew
    };
  }

  private updateJointPositions(){

    let baseRect = this.base!!.getBoundingClientRect();
    let xb = baseRect.left + 67
    let yb = baseRect.top + 26

    this.basePosition = {x:xb, y:yb}

    let x0 = xb, x1 = xb, x2 = xb
    let y0 = yb - this.arm0Length
    let y1 = y0 - this.arm1Length
    let y2 = y1 - this.arm2Length

    // First Arm rotation
    this.arm0EndPosition = this.rotatePointAroundOther(
      xb,yb,
      this.degreeToRadians(this.arm0Rotation!!),
      x0,y0
    )

    // Second arm rotation
    this.arm1EndPosition = this.rotatePointAroundOther(
      xb,yb,
      this.degreeToRadians(this.arm0Rotation!!),
      x1,y1
    )

    this.arm1EndPosition = this.rotatePointAroundOther(
      this.arm0EndPosition.x,this.arm0EndPosition.y,
      this.degreeToRadians(this.arm1Rotation!!),
      this.arm1EndPosition.x,this.arm1EndPosition.y
    )

    // Third arm rotation
    this.arm2EndPosition = this.rotatePointAroundOther(
      xb,yb,
      this.degreeToRadians(this.arm0Rotation!!),
      x2,y2
    )

    this.arm2EndPosition = this.rotatePointAroundOther(
      this.arm0EndPosition.x,this.arm0EndPosition.y,
      this.degreeToRadians(this.arm1Rotation!!),
      this.arm2EndPosition.x,this.arm2EndPosition.y
    )

    this.arm2EndPosition = this.rotatePointAroundOther(
      this.arm1EndPosition.x,this.arm1EndPosition.y,
      this.degreeToRadians(this.arm2Rotation!!),
      this.arm2EndPosition.x,this.arm2EndPosition.y
    )

  }

  private dist(pointA:any, pointB:any) : number{
    let x = pointB.x - pointA.x;
    let y = pointB.y - pointA.y;

    return Math.sqrt(x * x + y * y);
  }

  private normalized(vector:any) : any{
    let magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

    return {
      x:vector.x / magnitude,
      y: vector.y /magnitude 
    }
  }

  private direction(pointA:any, pointB:any) : any{
    let x = pointB.x - pointA.x;
    let y = pointB.y - pointA.y;

    return {
      x:x,
      y:y
    };
  }

  private vecsum(pointA:any, pointB:any) : any{
    let x = pointB.x + pointA.x;
    let y = pointB.y + pointA.y;

    return {
      x:x,
      y:y
    };
  }

  private vecscale(pointA:any, scalar:number) : any{
    let x = pointA.x * scalar;
    let y = pointA.y * scalar;

    return {
      x:x,
      y:y
    };
  }


  private FABRIKIteration(targetPos:any){
    
    // FORWARDPASS
    this.arm2EndPosition = targetPos
    let arm2ToArm1 = this.direction(this.arm2EndPosition, this.arm1EndPosition)
    
    this.arm1EndPosition = this.vecsum(
      this.arm2EndPosition,
      this.vecscale(
        this.normalized(arm2ToArm1), 
        this.arm2Length
      )
    )
    
    let arm1ToArm0 = this.direction(this.arm1EndPosition, this.arm0EndPosition)
    
    this.arm0EndPosition = this.vecsum(
      this.arm1EndPosition,
      this.vecscale(
        this.normalized(arm1ToArm0), 
        this.arm1Length
      )
    )

    // BACKWARDSPASS
    let baseToArm0 = this.direction(this.basePosition, this.arm0EndPosition)
    this.arm0EndPosition = this.vecsum(
      this.basePosition,
      this.vecscale(
        this.normalized(baseToArm0),
        this.arm0Length
      )
    )

    
    let arm0ToArm1 = this.direction(this.arm0EndPosition, this.arm1EndPosition)
    this.arm1EndPosition = this.vecsum(
      this.arm0EndPosition,
      this.vecscale(
        this.normalized(arm0ToArm1),
        this.arm1Length
      )
    )

    let arm1ToArm2 = this.direction(this.arm1EndPosition, this.arm2EndPosition)
    this.arm2EndPosition = this.vecsum(
      this.arm1EndPosition,
      this.vecscale(
        this.normalized(arm1ToArm2),
        this.arm2Length
      )
    )

  }

  private vecToDegree(vec : any){
    return Math.atan2(vec.y, vec.x)*180/Math.PI
  }

  private updateRotations(){
    this.arm0Rotation = this.vecToDegree( 
      this.normalized(
        this.direction(this.basePosition, this.arm0EndPosition)
      ) 
    )+90


    this.arm1Rotation = this.vecToDegree( 
      this.normalized(
        this.direction(this.arm0EndPosition, this.arm1EndPosition)
      ) 
    )+90 - this.arm0Rotation

    this.arm2Rotation = this.vecToDegree( 
      this.normalized(
        this.direction(this.arm1EndPosition, this.arm2EndPosition)
      ) 
    ) + 90 - this.arm0Rotation - this.arm1Rotation
  }

  private loopUpdate() {

    let targetPos = this.mousePosition
    let totalLen = this.arm0Length+this.arm1Length+this.arm2Length

    if(this.dist(targetPos, this.basePosition) >= totalLen){
      totalLen = this.vecsum(
        this.basePosition,
        this.vecscale(
          this.normalized(
            this.direction(
              this.basePosition, 
              this.mousePosition
              )
            ),
            totalLen
        )
      )

    }


    if(this.dist(targetPos, this.arm2EndPosition) < 20){
        return
    }

    this.updateJointPositions()
    
    let iterationsCount = 10
    for(let i = 0; i < iterationsCount; i++){
      this.FABRIKIteration(targetPos)
    }

    this.updateRotations()
    this.applyArmRotations()
    
  }

  private applyArmRotations(){
    this.arm0!!.style.transform = `rotate(${+this.arm0Rotation}deg)`
    this.arm1!!.style.transform = `rotate(${+this.arm1Rotation}deg)`
    this.arm2!!.style.transform = `rotate(${+this.arm2Rotation}deg)`

  }

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e:MouseEvent) {
    this.mousePosition.x = e.clientX
    this.mousePosition.y = e.clientY
  }

}
