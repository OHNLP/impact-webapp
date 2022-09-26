import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from "@angular/router";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {ProjectSummaryComponent} from './views/project/project-summary/project-summary.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTabsModule} from "@angular/material/tabs";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {CohortBrowserComponent} from './views/cohort/cohort-browser/cohort-browser.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {ProjectListComponent} from './views/project/project-list/project-list.component';
import {CohortDefinitionComponent} from './views/cohort/cohort-definition/cohort-definition.component';
import {MatTreeModule} from '@angular/material/tree';
import {
  CohortDefinitionItemEditorModalComponent
} from './views/cohort/cohort-definition/cohort-definition-item-editor-modal/cohort-definition-item-editor-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";

import { PlummerComponent } from './views/plummer/plummer.component';
import { PatientPanelComponent } from './views/plummer/patient-panel/patient-panel.component';
import { LabelBoxComponent } from './views/plummer/patient-panel/label-box/label-box.component';
import { CriteriaPanelComponent } from './views/plummer/criteria-panel/criteria-panel.component';
import { FactPanelComponent } from './views/plummer/fact-panel/fact-panel.component';
import { DocPanelComponent } from './views/plummer/doc-panel/doc-panel.component';
import { CriteriaTreeTableComponent } from './views/plummer/criteria-panel/criteria-tree-table/criteria-tree-table.component';
import { CriteriaTreeNodeComponent } from './views/plummer/criteria-panel/criteria-tree-node/criteria-tree-node.component';
import { HttpClientModule } from '@angular/common/http';
import { FactItemComponent } from './views/plummer/fact-panel/fact-item/fact-item.component';
import { ProjectMakerComponent } from './views/project/project-maker/project-maker.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectSummaryComponent,
    CohortBrowserComponent,
    ProjectListComponent,
    CohortDefinitionComponent,
    CohortDefinitionItemEditorModalComponent,
    PlummerComponent,
    PatientPanelComponent,
    LabelBoxComponent,
    CriteriaPanelComponent,
    FactPanelComponent,
    DocPanelComponent,
    CriteriaTreeTableComponent,
    CriteriaTreeNodeComponent,
    FactItemComponent,
    ProjectMakerComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonToggleModule,
    FormsModule,
    MatTreeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
