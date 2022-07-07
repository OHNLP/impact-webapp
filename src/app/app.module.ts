import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DocumentSummaryComponent} from './views/results/patient/document-summary/document-summary.component';
import {DocumentDetailsComponent} from './views/results/patient/document-details/document-details.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from "@angular/router";
import {PatientViewComponent} from './views/results/patient-view/patient-view.component';
import {PatientSummaryComponent} from './views/results/patient/patient-summary/patient-summary.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {ProjectSummaryComponent} from './views/project/project-summary/project-summary.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTabsModule} from "@angular/material/tabs";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {CohortBrowserComponent} from './views/project/cohort-browser/cohort-browser.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {ProjectListComponent} from './views/global/project-list/project-list.component';
import {CohortDefinitionComponent} from './views/project/cohort-definition/cohort-definition.component';
import {MatTreeModule} from '@angular/material/tree';
import {
  CohortDefinitionItemEditorModalComponent
} from './views/project/cohort-definition/cohort-definition-item-editor-modal/cohort-definition-item-editor-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    DocumentSummaryComponent,
    DocumentDetailsComponent,
    PatientViewComponent,
    PatientSummaryComponent,
    ProjectSummaryComponent,
    CohortBrowserComponent,
    ProjectListComponent,
    CohortDefinitionComponent,
    CohortDefinitionItemEditorModalComponent
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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
