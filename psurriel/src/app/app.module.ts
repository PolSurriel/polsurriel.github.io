import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './components/background/background.component';
import { BlobComponent } from './components/blob/blob.component';
import { BurguerButtonComponent } from './components/burguer-button/burguer-button.component';
import { CijestoneComponent } from './components/cijestone/cijestone.component';
import { ClothProjectItemComponent } from './components/cloth-project-item/cloth-project-item.component';
import { ClothVideoComponent } from './components/cloth-video/cloth-video.component';
import { ContactComponent } from './components/contact/contact.component';
import { DigitalhelheimComponent } from './components/digitalhelheim/digitalhelheim.component';
import { DropdownMenuComponent } from './components/excel/dropdown-menu/dropdown-menu.component';
import { TableEditorComponent } from './components/excel/table-editor/table-editor.component';
import { GithubButtonComponent } from './components/github-button/github-button.component';
import { HangmanComponent } from './components/hangman/hangman.component';
import { HeaderComponent } from './components/header/header.component';
import { MainSlideComponent } from './components/main-slide/main-slide.component';
import { MegamanComponent } from './components/megaman/megaman.component';
import { MyexcelComponent } from './components/myexcel/myexcel.component';
import { PelletsComponent } from './components/pellets/pellets.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProjectSlideComponent } from './components/project-slide/project-slide.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { ReferenceComponent } from './components/reference/reference.component';
import { ReferencesSectionComponent } from './components/references-section/references-section.component';
import { RobotArmComponent } from './components/robot-arm/robot-arm.component';
import { RotationsProjectComponent } from './components/rotations-project/rotations-project.component';
import { ShipButtonComponent } from './components/ship-button/ship-button.component';
import { FormulasComponent } from './components/formulas/formulas.component';
import { SurrealboostComponent } from './components/surrealboost/surrealboost.component';
import { FracExpressionComponent } from './components/angularFormulas/frac-expression/frac-expression.component';
import { MathExpressionComponent } from './components/angularFormulas/math-expression/math-expression.component';
import { ParenthesisExpressionComponent } from './components/angularFormulas/parenthesis-expression/parenthesis-expression.component';
import { PowerExpressionComponent } from './components/angularFormulas/power-expression/power-expression.component';
import { SqrtExpressionComponent } from './components/angularFormulas/sqrt-expression/sqrt-expression.component';

import { KatexComponent, KatexModule } from 'ng-katex';

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
    ShipButtonComponent,
    ContactComponent,
    PostsComponent,
    PostItemComponent,
    ClothProjectItemComponent,
    GithubButtonComponent,
    RotationsProjectComponent,
    SurrealboostComponent,
    MyexcelComponent,
    FormulasComponent,
    CijestoneComponent,
    HangmanComponent,
    PelletsComponent,
    DigitalhelheimComponent,
    MegamanComponent,
    DropdownMenuComponent,
    TableEditorComponent,
    FracExpressionComponent,
    MathExpressionComponent,
    ParenthesisExpressionComponent,
    PowerExpressionComponent,
    SqrtExpressionComponent
    
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    KatexModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
