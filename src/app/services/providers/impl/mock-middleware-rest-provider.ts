import { faker } from '@faker-js/faker';
import {MiddlewareRestProvider} from "../middleware-rest-provider";
import {CohortDefinition} from "../../../models/cohort-definition";
import {CohortInclusion, PatInfo} from "../../../models/pat-info";
import {AnnotatableText, ClinicalDocument, Fact, StructuredData} from "../../../models/clinical-data";
import {Project} from "../../../models/project";
import { Determination } from "src/app/models/determination";
import { Observable, of } from 'rxjs';
import { EXAMPLE_CRITERIA_GERD } from "src/app/samples/sample-criteria";
import { EXAMPLE_PROJECTS } from "src/app/samples/sample-project";
import { EXAMPLE_DETERMINATIONS } from "src/app/samples/sample-determination";
import { JobInfo } from "src/app/models/job-info";
import { EXAMPLE_PATIENTS } from 'src/app/samples/sample-patient';
import { EXAMPLE_JOBS } from 'src/app/samples/sample-job';
import { v4 as uuid } from 'uuid';

export class MockMiddlewareRestProvider extends MiddlewareRestProvider {
  public get_jobs(project_uid: string): Observable<JobInfo[]> {
    return of(EXAMPLE_JOBS);
  }
  public get_document(): Observable<ClinicalDocument> {
    throw new Error("Method not implemented.");
  }

  getUserName(): string {
    return "Mock User";
  }

  get_projects(): Observable<Array<Project>> {
    return of(EXAMPLE_PROJECTS);
  }

  getCohortCriteria(project_uid: string): Observable<CohortDefinition> {
    return of(EXAMPLE_CRITERIA_GERD);
  }

  writeCohortCriteria(project_uid: string, definition?: CohortDefinition): boolean {
    return false; // TODO
  }

  getRetrievedCohort(project_uid: string): Observable<Array<PatInfo>> {
    let ps = JSON.parse(JSON.stringify(EXAMPLE_PATIENTS));

    // add more for demo
    let sample_labels = [
      'Check Later', 'Phase II', 'Phase III', 'Phase IV',
      'Type 1 Diabetes', 'Type 2 Diabetes',
      'ANC>10000', '>10 Lines', 'ECOG PS3', 'ECOG PS4'
    ];
    for (let i = 0; i < 1000; i++) {
      let labels = sample_labels.sort(() => 0.5 - Math.random()).slice(0, 2);
      ps.push({
        pat_uid: uuid(),
        name: faker.name.fullName(),
        inclusion: CohortInclusion.UNJUDGED,

        labels: labels,
        stat: {
          n_records: parseInt(faker.random.numeric(3)),
          n_criteria_yes: parseInt(faker.random.numeric()),
          n_criteria_no: parseInt(faker.random.numeric()),
          n_criteria_na: parseInt(faker.random.numeric()),
          n_criteria_unknown: parseInt(faker.random.numeric()),
        }
      });
      
    }
    return of(ps);
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
    uid: string, 
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
      let text = faker.lorem.lines(2);
      let ps = text.split(' ');
      let kw = ps[Math.floor(ps.length/2)];
      text = text.replace(
        kw,
        '<span class="highlight">' + kw + '</span>'
      );
      let full_text = faker.lorem.lines(50) + '\n' +
        text + '\n' + 
        faker.lorem.lines(50);
      facts.push({
        id: 'RND-' + Math.random(),
        type: ft,
        date_time: faker.date.between('2010-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z'),

        summary: text,
        full_text: full_text,

        code: "203.01",
        code_system: 'ICD-9-CM',

        score: Math.random().toFixed(2)
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
        date_created: new Date(1900,0, 1),
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
