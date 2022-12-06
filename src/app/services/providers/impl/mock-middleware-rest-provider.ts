import { faker } from '@faker-js/faker';
import {MiddlewareRestProvider} from "../middleware-rest-provider";
import {CohortDefinition} from "../../../models/cohort-definition";
import {CohortInclusion, CohortMatch, PatInfo} from "../../../models/pat-info";
import {AnnotatableText, ClinicalDocument, Fact, StructuredData} from "../../../models/clinical-data";
import {Project} from "../../../models/project";
import { Determination, JUDGEMENT_TYPE } from "src/app/models/determination";
import { Observable, of } from 'rxjs';
import { EXAMPLE_CRITERIA_GERD } from "src/app/samples/sample-criteria";
import { EXAMPLE_PROJECTS } from "src/app/samples/sample-project";
import { EXAMPLE_DETERMINATIONS } from "src/app/samples/sample-determination";
import { JobInfo, JobInfoStatus } from "src/app/models/job-info";
import { EXAMPLE_PATIENTS } from 'src/app/samples/sample-patient';
import { EXAMPLE_JOBS } from 'src/app/samples/sample-job';
import { v4 as uuid } from 'uuid';
import { EXAMPLE_DOC_FHIR_NLP_CONDITION } from 'src/app/samples/sample-doc';
import { DataSource } from 'src/app/models/data-source';
import { EXAMPLE_DATA_SOURCES } from 'src/app/samples/sample-ds';
import { EXAMPLE_USERS } from 'src/app/samples/sample-user';

export class MockMiddlewareRestProvider extends MiddlewareRestProvider {
  

  /////////////////////////////////////////////////////////
  // Phenotype Rep search related functions
  /////////////////////////////////////////////////////////
  private _make_fake_title(w: string): string {
    var n_left = Math.floor(Math.random() * 3 + 1);
    var n_right = Math.floor(Math.random() * 3 + 1);
    var title = faker.lorem.sentence(n_left) + " " + w + " " +
                faker.lorem.sentence(n_right);

    return title;
  }

  public get_pheno_reps_by_keyword(keyword: string): Observable<CohortDefinition[]> {
    var rs = [] as CohortDefinition[];
    var n = Math.floor(Math.random() * 6 + 1);
    for (let i = 0; i < n; i++) {
      let idx = i;
      if (idx > 2) { 
        // because we only have 3 sample
        idx = 2; 
      }
      let rep = this.cps(
        EXAMPLE_CRITERIA_GERD.children![0].children![1].children![idx]
      )
      if (i > 2) {
        rep.title = this._make_fake_title(keyword);
      }
      rs.push(rep);
    }
    return of(rs);
  }

  /////////////////////////////////////////////////////////
  // UMLS CUI search related functions
  /////////////////////////////////////////////////////////
  public get_umls_codes_by_keyword(keyword: string): Observable<any[]> {
    var rs = [];
    var n = Math.floor(Math.random() * 10 + 3);
    for (let i = 0; i < n; i++) {
      let code = faker.random.numeric(8);
      rs.push(code);
    }
    return of(rs);
  }

  /////////////////////////////////////////////////////////
  // Data source related functions
  /////////////////////////////////////////////////////////
  public get_all_data_sources(): Observable<DataSource[]> {
    return of(EXAMPLE_DATA_SOURCES);
  }

  public get_project_data_sources(project_uid: string): Observable<DataSource[]> {
    return of(this.db.ds);
  }

  public update_project_data_sources(project_uid: string, dss: DataSource[]): Observable<boolean> {
    this.db.ds = dss as never[];
    return of(true);
  }

  public get_job_data_sources(job_uid: string): Observable<DataSource[]> {
    return of(this.db.ds);
  }
  
  // copy an data obj
  public cps(obj: any): any { return JSON.parse(JSON.stringify(obj)); }

  // fake database
  db = {
    projects: this.cps(EXAMPLE_PROJECTS),
    jobs: this.cps(EXAMPLE_JOBS),
    patients: [],
    determinations: new Map<string, []>(),
    adjudications: new Map<string, []>(),
    decision: new Map<string, CohortInclusion>(),
    criteria: this.cps(EXAMPLE_CRITERIA_GERD),
    ds: []
  }

  public randomEnumValue(enumeration:any): any {
    const values = Object.keys(enumeration);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return enumeration[enumKey];
  }

  /////////////////////////////////////////////////////////
  // User related functions
  /////////////////////////////////////////////////////////

  public get_username(): string {
    return "Mock User";
  }

  /////////////////////////////////////////////////////////
  // Project related functions
  /////////////////////////////////////////////////////////

  public create_project(name: string): Observable<Project> {
    let np = {
      uid: uuid(),
      name: name,
      short_title: name + ": " + name,
      
      // other information
      description: name,
      date_updated: new Date(),
      stat: {
        n_cohort: parseInt(faker.random.numeric(4)),
        n_records: parseInt(faker.random.numeric(5)),
        n_included: parseInt(faker.random.numeric(2)),
        n_excluded: parseInt(faker.random.numeric(3)),
        n_unjudged: parseInt(faker.random.numeric(3)),
      }
    }
    // add to database
    this.db.projects.push(np);
    return of(np);
  }

  public get_projects(): Observable<Array<Project>> {
    return of(this.db.projects);
  }

  /////////////////////////////////////////////////////////
  // Job related functions
  /////////////////////////////////////////////////////////

  public cancel_job(job_uid: string): Observable<boolean> {
    return of(true);
  }

  public get_jobs(project_uid: string): Observable<JobInfo[]> {
    return of(this.db.jobs);
  }

  public submit_job(project_uid: string): Observable<JobInfo> {
    let job = {
      job_uid: uuid(),
      project_uid: project_uid,
      start_date: new Date(),
      status: JobInfoStatus.QUEUED
    };
    this.db.jobs.push(job);
    return of(job);
  }

  /////////////////////////////////////////////////////////
  // Criteria related functions
  /////////////////////////////////////////////////////////

  get_criteria(project_uid: string): Observable<CohortDefinition> {
    return of(this.db.criteria);
  }

  update_criteria(
    project_uid: string, 
    criteria: CohortDefinition
  ): Observable<boolean> {
    this.db.criteria = criteria;
    return of(true);
  }

  /////////////////////////////////////////////////////////
  // Patient related functions
  /////////////////////////////////////////////////////////

  public get_patient_detail(patient_uid: string): Observable<Object> {
    return of({
      "resourceType":"Person",
      "id":"PERSON:" + patient_uid,
      "gender": "female",
      "birthDate":"1941-12-08"
    })
  }

  get_patients(project_uid: string): Observable<Array<PatInfo>> {
    if (this.db.patients.length == 0) {
      let ps = JSON.parse(JSON.stringify(EXAMPLE_PATIENTS));

      // add more for demo
      let sample_labels = [
        'Check Later', 'Phase II', 'Phase III', 'Phase IV',
        'Type 1 Diabetes', 'Type 2 Diabetes',
        'ANC>10000', '>10 Lines', 'ECOG PS3', 'ECOG PS4'
      ];

      for (let i = 0; i < 50000; i++) {
        let labels = sample_labels.sort(() => 0.5 - Math.random()).slice(0, 2);
        let n_criteria_yes = Math.floor(Math.random() * 2.1) + 2; // range [2, 4]
        let n_criteria_no = Math.floor(Math.random() * 5);  // range (0, 5)
        let n_criteria_na = 13 - n_criteria_yes - n_criteria_no;
        let match = this.calc_match(n_criteria_yes, n_criteria_no);
        ps.push({
          pat_uid: uuid().split('-')[0],
          name: faker.name.fullName(),
          inclusion: this.get_random_decision(n_criteria_no) as CohortInclusion,
          match: match,

          labels: labels,
          stat: {
            n_records: parseInt(faker.random.numeric(2)),
            n_criteria_yes: n_criteria_yes,
            n_criteria_no: n_criteria_no,
            n_criteria_na: n_criteria_na,
            // why unknown?
            n_criteria_unknown: parseInt(faker.random.numeric()),
          },
          fhir: {}
        });
        
      }
      this.db.patients = ps;
    }
    return of(this.db.patients);
  }

  calc_match(n_y:number, n_n:number): CohortMatch {
    if (n_n > 0) {
      return CohortMatch.UNMATCHED;
    }
    if (n_y == 4) {
      return CohortMatch.MATCHED;
    }
    return CohortMatch.UNKNOWN;
  }

  /////////////////////////////////////////////////////////
  // Decision related functions
  /////////////////////////////////////////////////////////

  public update_patient_decision(
    job_uid: string, 
    patient_uid: string, 
    judgement: CohortInclusion
  ): Observable<boolean> {
    this.db.decision.set(patient_uid, judgement);
    return of(true);
  }

  public get_patient_decisions(
    job_uid: string, 
    patient_uids: string[]
  ): Observable<Map<string, CohortInclusion>> {
    if (this.db.decision.size == 0) {
      let decision = new Map<string, CohortInclusion>();
      // let decision = new Map<string, CohortInclusion>;
      for (let i = 0; i < patient_uids.length; i++) {
        let patient_uid = patient_uids[i];
        let pat_decision = this.get_random_decision(-1);
        decision.set(patient_uid, pat_decision as CohortInclusion);
      }
      this.db.decision = decision
    }
    return of(this.db.decision as Map<string, CohortInclusion>);
  }

  /////////////////////////////////////////////////////////
  // Determination related functions
  /////////////////////////////////////////////////////////

  update_determination(
    job_uid: string,
    criteria_uid: string,
    patient_uid: string,
    dtmn: Determination): Observable<Determination> {
    return of(dtmn); // TODO
  }

  get_determinations(
    job_uid: string, 
    patient_uid: string,
    criteria?: CohortDefinition
  ): Observable<Array<Determination>> {

    if (this.db.determinations.hasOwnProperty(patient_uid)) {
      // ok, just return at last
    } else {
      // too bad, no such patient yet, let's create
      var nodes = [];
      nodes = this._get_nodes(criteria);
      console.log('* flatten criteria', nodes);

      let dtmns:any = [];
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        let jg = this.randomEnumValue(JUDGEMENT_TYPE);
        // more

        dtmns.push({
          job_uid: job_uid,
          patient_uid: patient_uid,
          criteria_uid: n.nodeUID,

          // just use this example user
          user_uid: EXAMPLE_USERS[0].uid,
          judgement: jg,

          // comment: faker.lorem.lines(1),
          comment: '',
          date_updated: faker.date.between('2010-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z'),
        });
      }
      // ok, save this dtmns for later use
      this.db.determinations.set(patient_uid, dtmns);
    }
    return of(this.db.determinations.get(patient_uid) as Array<Determination>);

  }

  private _get_nodes(node:any) {
    var ns: any[] = [];
    if (node.hasOwnProperty('children')) {
      for (let i = 0; i < node.children.length; i++) {
        const c = node.children[i];
        ns.push(c);
        var _ns = this._get_nodes(c);
        Array.prototype.push.apply(ns, _ns);
      }
    }

    return ns;
  }

  public get_adjudications(
    job_uid: string, 
    patient_uid: string, 
    criteria: CohortDefinition,
    dtmn_dict: any,
  ): Observable<any> {
    if (this.db.adjudications.hasOwnProperty(patient_uid)) {
      // ok, just return at last
    } else {
      // too bad, no such patient yet, let's create
      var nodes = [];
      nodes = this._get_nodes(criteria);
      console.log('* flatten criteria', nodes);

      // now, create determinations by others
      // skip the first user, just create others
      let other_dtmns:any = {};
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        other_dtmns[n.nodeUID] = {}
        for (let j = 1; j < EXAMPLE_USERS.length; j++) {
          // set this user to this criteria
          let jg = this.randomEnumValue(JUDGEMENT_TYPE);
          if (Math.random()<0.95) {
            // for most of case, just stay the same judgement
            jg = dtmn_dict[n.nodeUID].judgement;
          }
          other_dtmns[n.nodeUID][EXAMPLE_USERS[j].uid] = {
            job_uid: job_uid,
            patient_uid: patient_uid,
            criteria_uid: n.nodeUID,

            // just use this example user
            user_uid: EXAMPLE_USERS[j].uid,
            judgement: jg,

            comment: '',
            // comment: faker.lorem.lines(1),
            date_updated: faker.date.between(
              '2010-01-01T00:00:00.000Z', 
              '2022-12-31T00:00:00.000Z'
            ),
          };
        }
      }
      // ok, save this dtmns for later use
      this.db.adjudications.set(patient_uid, other_dtmns);
    }
    return of(this.db.adjudications.get(patient_uid));
  }

  /////////////////////////////////////////////////////////
  // Fact related functions
  /////////////////////////////////////////////////////////

  get_facts(
    job_uid: string, 
    criteria_uid: string,
    patient_uid: string,
  ): Observable<Array<any>> {
    let facts = [] as Array<any>;
    let n_facts = Math.floor(Math.random() * 50);
    let fact_types = [
      'OBSERVATION',
      'PERSON',
      'CONDITION'
    ];
    let ft = fact_types[Math.floor(Math.random() * fact_types.length)];
    for (let i = 0; i < n_facts; i++) {
      let ftc = 'ehr';
      if (Math.random()<0.5) {
        ftc = 'nlp';
      }
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
        evidence_id: ftc+':'+ft+':' + faker.random.numeric(7),
        data_source: ftc,
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

  public get_fact_detail(evidence_id: string): Observable<Object> {
    let d = {} as any;
    d[evidence_id] = {
      "resourceType":"Condition",
      "id":evidence_id,
      "code":{
        "coding":[{
          "system":"https://athena.ohdsi.org/",
          "code":"12345678",
          "display":"Name"
        }]},
      "subject":{
        "identifier":{"value":"1234567"}
      },
      "recordedDate": faker.date.between('2010-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
    }
    return of(d);
  }

  public get_fact_details(evidence_ids: string[]): Observable<any> {
    let d = {} as any;

    for (let i = 0; i < evidence_ids.length; i++) {
      const evidence_id = evidence_ids[i];

      let obj = {};
      if (evidence_id.startsWith('nlp')) {
        obj = this._get_fact_detail_by_nlp(evidence_id);

      } else {
        obj = {
          "resourceType":"Condition",
          "id":evidence_id,
          "code":{
            "coding":[{
              "system": "https://athena.ohdsi.org/",
              "code": faker.random.numeric(8),
              "display": "Name"
            }]},
          "subject":{
            "identifier":{
              "value": faker.random.numeric(7),
            }
          },
          "recordedDate": faker.date.between('2010-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
        }
      }
      d[evidence_id] = obj;
    }
    return of(d);
  }

  private _get_fact_detail_by_nlp(evidence_id: string): any {
    if (evidence_id.indexOf('CONDITION')>=0) {
      let d = JSON.parse(JSON.stringify(EXAMPLE_DOC_FHIR_NLP_CONDITION));
      // update some values
      d['id'] = evidence_id;
      d['contained'][0]['id'] = evidence_id;

      return d;
    }

    return {
      "resourceType":"Condition",
      "id":evidence_id,
      "code":{
        "coding":[{
          "system":"https://athena.ohdsi.org/",
          "code": faker.random.numeric(8),
          "display":"Name"
        }]},
      "subject":{
        "identifier":{
          "value":faker.random.numeric(7),
        }
      },
      "recordedDate": faker.date.between('2010-01-01T00:00:00.000Z', '2022-12-31T00:00:00.000Z')
    }
  }

  public get_random_decision(n_criteria_no: number): string {
    let r = Math.random();
    if (n_criteria_no == -1) {
      if (r < 0.7) {
        return CohortInclusion.UNJUDGED;
      } else if (r < 0.95) {
        return CohortInclusion.EXCLUDE;
      } else {
        return CohortInclusion.INCLUDE;
      }

    } else if (n_criteria_no == 0) {
      if (r < 0.7) {
        return CohortInclusion.UNJUDGED;
      } else {
        return CohortInclusion.INCLUDE;
      }
    } else {
      if (r < 0.95) {
        return CohortInclusion.EXCLUDE;
      } else {
        return CohortInclusion.UNJUDGED;
      }
    }
  }
}
