import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './components/background/background.component';
import { BlobComponent } from './components/blob/blob.component';
import { BurguerButtonComponent } from './components/burguer-button/burguer-button.component';
import { ClothVideoComponent } from './components/cloth-video/cloth-video.component';
import { HeaderComponent } from './components/header/header.component';
import { MainSlideComponent } from './components/main-slide/main-slide.component';
import { ProjectSlideComponent } from './components/project-slide/project-slide.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { ReferenceComponent } from './components/reference/reference.component';
import { ReferencesSectionComponent } from './components/references-section/references-section.component';
import { RobotArmComponent } from './components/robot-arm/robot-arm.component';
import { ShipButtonComponent } from './components/ship-button/ship-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BurguerButtonComponent,
    MainSlideComponent,
    ProjectsSectionComponent,
    ReferencesSectionComponent,
    ClothVideoComponent,
    ProjectSlideComponent,
    RobotArmComponent,
    BackgroundComponent,
    BlobComponent,
    ReferenceComponent,
    ShipButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
