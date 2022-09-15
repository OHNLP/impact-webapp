import {MiddlewareRestProvider} from "../middleware-rest-provider";
import {CohortDefinition} from "../../../models/cohort-definition";
import {example_cohort_definition} from "../../../views/project/cohort-definition/example-data";
import {PatInfo} from "../../../models/pat-info";
import {AnnotatableText, ClinicalDocument, Fact, StructuredData} from "../../../models/clinical-data";
import {Project} from "../../../models/project";
import { Determination } from "src/app/models/determination";

export class MockMiddlewareRestProvider extends MiddlewareRestProvider {

  getUserName(): string {
    return "Mock User";
  }

  getProjectList(): Array<Project> {
    let i = 0;
    let projects = []
    while (i < 100) {
      projects.push({
        name:  "Test project " + i.toString(),
        uid: i.toString()
      })
      i += 1
    }
    return projects;
  }

  getCohortCriteria(project_uid: string): CohortDefinition {
    return example_cohort_definition;
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

  getDeterminations(
    project_uid: string, 
    patient_uid: string
  ): Array<Determination> {
    return [];
  }

  getFacts(
    project_uid: string, 
    patient_uid: string,
    criteria_uid: string
  ): Array<Fact> {
    let facts = [] as Array<Fact>;
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
    return facts;
  }
}
