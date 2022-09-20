import {MiddlewareRestProvider} from "../middleware-rest-provider";
import {CohortDefinition} from "../../../models/cohort-definition";
import {PatInfo} from "../../../models/pat-info";
import {AnnotatableText, ClinicalDocument, Fact, StructuredData} from "../../../models/clinical-data";
import {Project} from "../../../models/project";
import { Determination } from "src/app/models/Determination";
import { Observable, of } from 'rxjs';
import { EXAMPLE_CRITERIA_RRMM_XS } from "src/app/samples/sample-criteria";
import { EXAMPLE_PROJECTS } from "src/app/samples/sample-project";
import { EXAMPLE_DETERMINATIONS } from "src/app/samples/sample-determination";

export class MockMiddlewareRestProvider extends MiddlewareRestProvider {

  getUserName(): string {
    return "Mock User";
  }

  get_projects(): Observable<Array<Project>> {
    return of(EXAMPLE_PROJECTS);
  }

  getCohortCriteria(project_uid: string): Observable<CohortDefinition> {
    return of(EXAMPLE_CRITERIA_RRMM_XS);
  }

  writeCohortCriteria(project_uid: string, definition?: CohortDefinition): boolean {
    return false; // TODO
  }

  getRetrievedCohort(project_uid: string): Array<PatInfo> {
    let cohort = []
    let i = 0
    while (i < 1000) {
      let pat = new PatInfo()
      pat.pat_id = i.toString()
      pat.pat_id = "Test Patient " + i.toString()
      cohort.push(pat)
      i += 1
    }
    return cohort;
  }

  writeRetrievedCohort(project_uid: string, cohort?: Array<PatInfo>): boolean {
    return false; // TODO
  }

  get_determinations(
    project_uid: string, 
    patient_uid: string
  ): Observable<Array<Determination>> {
    return of(EXAMPLE_DETERMINATIONS);
  }

  get_facts(
    job_uid: string, 
    patient_uid: string,
    criteria_uid: string
  ): Observable<Array<any>> {
    let facts = [] as Array<any>;
    let n_facts = Math.floor(Math.random() * 50);
    let fact_types = [
      'lab_result',
      'clinical_note',
      'other_document'
    ];
    for (let i = 0; i < n_facts; i++) {
      let ft = fact_types[Math.floor(Math.random() * fact_types.length)];
      facts.push({
        id: 'RND-' + Math.random(),
        type: ft,
        date_time: new Date(),

        summary: "At diagnosis, <span class='highlight'>marrow area</span> infiltrated by <span class='highlight'>myeloma</span> correlated negatively with hemoglobin, erythrocytes, and marrow erythroid cells. After successful chemotherapy ...",

        code: "203.01",
        code_system: 'ICD-9-CM',

        score_bm25: 0.1
      })      
    }
    return of(facts);
  }

  /////////////////////////////////////////////////////////
  // Deprecated functions
  /////////////////////////////////////////////////////////

  getStructuredEvidence(project_uid: string, patient_uid: string, criterion?: string): Array<StructuredData> {
    let i = 0
    let data = []
    while (i < 100) {
      data.push({
        code_system: 'ICD-9-CM',
        code: i.toString(),
        desc: "Full "+patient_uid+" of " +  i.toString(),
        dtm: new Date(1900, 0, 1)
      })
      i += 1
    }
    return data;
  }


  getUnstructuredEvidence(project_uid: string, patient_uid: string, criterion?: string): Array<ClinicalDocument> {
    let i = 0
    let documents = []
    while (i < 10) {
      documents.push({
        id: i.toString(),
        type: "Discharge Summary",
        dtm: new Date(1900,0, 1),
        summary: {
          text: "Random test text 1\n\nRandom test text 2",
          algorithmSpans: [[7, 11], [17, 18]],
          userSpans: [[12, 16]],
          editable: false
        },
        text: undefined
      })
      i += 1
    }
    return documents;
  }
}
