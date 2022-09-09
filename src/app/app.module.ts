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
import {
  PatientNavSnackbarComponent
} from "./views/results/patient-view/patient-nav-snackbar/patient-nav-snackbar.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { PatientReviewDefinitionSelectionWrapperComponent } from './views/results/patient/patient-review-definition-selection-wrapper/patient-review-definition-selection-wrapper.component';
import { StructuredDataSummaryComponent } from './views/results/patient/structured-data-summary/structured-data-summary.component';
import { PlummerComponent } from './plummer/plummer.component';
import { PatientPanelComponent } from './plummer/patient-panel/patient-panel.component';
import { LabelBoxComponent } from './plummer/patient-panel/label-box/label-box.component';
import { CriteriaPanelComponent } from './plummer/criteria-panel/criteria-panel.component';
import { FactPanelComponent } from './plummer/fact-panel/fact-panel.component';
import { DocPanelComponent } from './plummer/doc-panel/doc-panel.component';
import { CriteriaTreeTableComponent } from './plummer/criteria-panel/criteria-tree-table/criteria-tree-table.component';
import { FactListComponent } from './plummer/fact-panel/fact-list/fact-list.component';
import { CriteriaTreeNodeComponent } from './plummer/criteria-panel/criteria-tree-node/criteria-tree-node.component';

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
    CohortDefinitionItemEditorModalComponent,
    PatientNavSnackbarComponent,
    PatientReviewDefinitionSelectionWrapperComponent,
    StructuredDataSummaryComponent,
    PlummerComponent,
    PatientPanelComponent,
    LabelBoxComponent,
    CriteriaPanelComponent,
    FactPanelComponent,
    DocPanelComponent,
    CriteriaTreeTableComponent,
    FactListComponent,
    CriteriaTreeNodeComponent
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
