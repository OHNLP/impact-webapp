import { Fact } from "src/app/models/clinical-data";
import { CohortDefinition } from "src/app/models/cohort-definition";
import { Determination } from "src/app/models/determination";
import { CohortInclusion, PatInfo } from "src/app/models/pat-info";
import { Project } from "src/app/models/project";
import { MiddlewareRestProvider } from "../middleware-rest-provider";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, map, Observable, ObservableInput, of, throwError } from 'rxjs';
import { JobInfo } from "src/app/models/job-info";
import { environment } from "src/environments/environment";
import { faker } from "@faker-js/faker";
import * as dayjs from "dayjs"

@Injectable({
  providedIn: 'root'
})

export class RealMiddlewareRestProvider extends MiddlewareRestProvider {

  // need to update this when init
  public base_url: string = '';

  constructor(
    private http: HttpClient,
  ) {
    super();
    this.base_url = environment.apiURL;
  }

  public _get_headers(): HttpHeaders {
    let auth = localStorage.getItem('header_user_credentials') || '';
    return new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', auth);
  }

  public _handle_error(error: HttpErrorResponse, caught: Observable<Object>): ObservableInput<any> {
    console.error('Error occurred', error);

    if (error.status === 401) {
      // A client-side or network error occurred. Handle it accordingly.
      throwError(() => new Error('Username or password is not correct.'));

    } else if (error.status === 0) {
      return throwError(() => new Error('HTTP Failure. The middleware server is not unavailable or network issue. Please try later or contact the system administrator.'));

    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Error [' + error.status + '] happened. ' + error.message));
  }


  /////////////////////////////////////////////////////////
  // User related functions
  /////////////////////////////////////////////////////////

  public get_username(): string {
    throw new Error("Method not implemented.");
  }

  /////////////////////////////////////////////////////////
  // Project related functions
  /////////////////////////////////////////////////////////

  public create_project(name: string): Observable<Project> {
    // create the URL
    let url = this.base_url + '/_projects/create';

    // set the parameters
    const params = new HttpParams()
      .set('name', name);
    // set the request body
    const body = {
      name: name
    };
    // set the headers
    const headers = this._get_headers();

    // send request and parse the return
    return this.http.put(url,
      body,
      { "params": params, 'headers': headers })
      .pipe(
        catchError(this._handle_error),
        map(rsp => {
          let r = rsp as any;
          let p = {
            uid: r.uid,
            short_title: r.name,
            name: r.name + ' | ' + r.name,
            description: r.name,
            date_updated: new Date(),
            stat: {
              n_cohort: -1,
              n_records: -1,
              n_included: -1,
              n_excluded: -1,
              n_unjudged: -1
            }
          };

          console.log('* created project', p);
          return p;
        }));
  }

  public get_projects(): Observable<Project[]> {
    // create the URL
    let url = this.base_url + '/_projects/';

    // set the parameters
    const params = new HttpParams();
    // set the headers
    const headers = this._get_headers();

    // send request and parse the return
    return this.http.get(url, { "params": params, 'headers': headers })
      .pipe(
        catchError(this._handle_error),
        map(rsp => {
          let rs = rsp as Array<any>;
          let prjs = [] as Project[];

          for (let i = 0; i < rs.length; i++) {
            const r = rs[i];
            let short_title = r.name.split(' ')[0];
            prjs.push({
              uid: r.uid,
              short_title: short_title,
              name: r.name + ' | ' + r.name,
              description: r.name,
              date_updated: new Date(),
              stat: {
                n_cohort: 3,
                n_records: 1,
                n_included: 1,
                n_excluded: 1,
                n_unjudged: 1
              }
            })
          }

          console.log('* get_projects', prjs);
          return prjs;
        }));
  }

  /////////////////////////////////////////////////////////
  // Job related functions
  /////////////////////////////////////////////////////////

  public submit_job(project_uid: string): Observable<JobInfo> {
    // create the URL
    let url = this.base_url + '/_jobs/create';

    // set the parameters
    const params = new HttpParams()
      .set("project_uid", project_uid)

    // set the headers
    const headers = this._get_headers();

    // send request and parse the return
    return this.http.post(
      url,
      {},
      { "params": params, "headers": headers }
    ).pipe(map(rsp => {
      let r = rsp as any;
      console.log('* /_jobs/create', rsp);
      return {
        project_uid: r.projectUID,
        job_uid: r.jobUID,
        start_date: r.startDate,
        status: r.status,
      };
    }));
  }

  public cancel_job(job_uid: string): Observable<boolean> {
    // create the URL
    let url = this.base_url + '/_jobs/cancel';

    // set the parameters
    const params = new HttpParams()
      .set("job_uid", job_uid)

    const body = {
      job_uid: job_uid
    }
    // set the headers
    const headers = this._get_headers();

    // send request and parse the return
    return this.http.post(url, body, { "params": params, "headers": headers }).pipe(map(rsp => {
      let r = eval("" + rsp);
      return r;
    }));
  }

  public get_jobs(project_uid: string): Observable<JobInfo[]> {
    // create the URL
    let url = this.base_url + '/_jobs/project';

    // set the parameters
    const params = new HttpParams()
      .set("project_uid", project_uid)
    // set the headers
    const headers = this._get_headers();

    // send request and parse the return
    return this.http.get(url, { "params": params, "headers": headers }).pipe(map(rsp => {
      let rs = rsp as any[];
      let jobs: JobInfo[] = [];
      for (let i = 0; i < rs.length; i++) {
        const r = rs[i];
        jobs.push({
          job_uid: r.jobUID,
          project_uid: r.projectUID,
          start_date: dayjs(r.startDate).toDate(),
          status: r.status
        });
      }
      console.log('* get_jobs', jobs);
      return jobs;
    }));
  }

  /////////////////////////////////////////////////////////
  // Criteria related functions
  /////////////////////////////////////////////////////////

  public get_criteria(project_uid: string): Observable<CohortDefinition> {
    // create the URL
    let url = this.base_url + '/_projects/criterion';

    // set the parameters
    const params = new HttpParams()
      .set("project_uid", project_uid);

    const headers = this._get_headers();

    // send request and parse the return
    return this.http.get(url, { "params": params, 'headers': headers })
      .pipe(map(rsp => {
        let criteria = rsp as CohortDefinition;
        console.log('* get_criteria', criteria);
        return criteria;
      }));
  }

  public update_criteria(project_uid: string, criteria: CohortDefinition): Observable<boolean> {
    // create the URL
    let url = this.base_url + '/_projects/criterion';

    // set the parameters
    const params = new HttpParams()
      .set("project_uid", project_uid);

    const body = criteria;

    const headers = this._get_headers();

    // send request and parse the return
    return this.http.post(url, body, { "params": params, 'headers': headers })
      .pipe(map(rsp => {
        let r = rsp as boolean;
        console.log('* update_criteria', r);
        return r;
      }));
  }

  /////////////////////////////////////////////////////////
  // Patient related functions
  /////////////////////////////////////////////////////////
  public get_patient_detail(patient_uid: string): Observable<Object> {
    // create the URL
    let url = this.base_url + '/_cohorts/evidencebyuid';

    // set the parameters
    const params = new HttpParams()
      .set("evidenceUID", "PERSON:"+patient_uid);

    // get header for this request
    const headers = this._get_headers();

    // send request and parse the return
    return this.http.get(
      url, 
      { "params": params, 'headers': headers }
    ).pipe(map(rsp => {
      let d = rsp as any;
      console.log('* get_patient_detail', d);
      let detail = d['PERSON:' + patient_uid];
      return detail;
    }));
  }

  public get_patients(job_uid: string): Observable<PatInfo[]> {
    // create the URL
    let url = this.base_url + '/_cohorts/';

    // set the parameters
    const params = new HttpParams()
      .set("job_uid", job_uid);

    const headers = this._get_headers();

    // send request and parse the return
    return this.http.get(url, { "params": params, 'headers': headers })
      .pipe(map(rsp => {
        let rs = rsp as any[];
        console.log('* get_patients', rs.length);

        let pats = [] as PatInfo[];
        for (let i = 0; i < rs.length; i++) {
          const r = rs[i];
          pats.push({
            pat_uid: r['patUID'],
            name: r['patUID'],
            inclusion: r['inclusion'],

            // init others
            labels: [],
            stat: {
              n_records: -1,
              n_criteria_yes: -1,
              n_criteria_no: -1,
              n_criteria_na: -1,
              n_criteria_unknown: -1,
            },

            fhir: {}
          })
        }
        return pats;
      }));
  }

  /////////////////////////////////////////////////////////
  // Decision related functions
  /////////////////////////////////////////////////////////

  public update_patient_decision(
    job_uid: string,
    patient_uid: string,
    judgement: CohortInclusion
  ): Observable<boolean> {
    // create the URL
    let url = this.base_url + '/_cohorts/relevance';

    // set the parameters
    const params = new HttpParams()
      .set("job_uid", job_uid)
      .set("patient_uid", patient_uid)
      .set("judgement", judgement);

    // set the headers
    const headers = this._get_headers();

    // send request and parse the return
    return this.http.post(
      url,
      {},
      { "params": params, "headers": headers }
    ).pipe(map(rsp => {
      console.log('* /_cohorts/relevance = ' + rsp);
      return true;
    }));
  }

  public get_patient_decisions(job_uid: string, patient_uids: string[]): Observable<Map<string, CohortInclusion>> {
    // create the URL
    let url = this.base_url + '/_cohorts/relevance';

    // set the parameters
    const params = new HttpParams()
      .set("job_uid", job_uid)
      .appendAll({ "patient_uid": patient_uids })

    // set the headers
    const headers = this._get_headers();

    // send request and parse the return
    return this.http.get(url, { "params": params, "headers": headers }).pipe(map(rsp => {
      return rsp as Map<string, CohortInclusion>;
    }));
  }

  /////////////////////////////////////////////////////////
  // Determination related functions
  /////////////////////////////////////////////////////////

  public get_determinations(
    job_uid: string,
    patient_uid: string,
    criteria?: CohortDefinition
  ): Observable<Determination[]> {
    // create the URL
    let url = this.base_url + '/_cohorts/criterion_match_status';

    // set the parameters
    const params = new HttpParams()
      .set("job_uid", job_uid)
      .set('person_uid', patient_uid)
    // set the headers
    const headers = this._get_headers();

    // send request and parse the return
    return this.http.get(
      url,
      { "params": params, 'headers': headers }
    ).pipe(map(rsp => {
      /*
          dd = {
              "additionalProp1": {
                  "judgement": "JUDGED_MATCH",
                  "comment": "string"
              },
              "additionalProp2": {
                  "judgement": "JUDGED_MATCH",
                  "comment": "string"
              },
              "additionalProp3": {
                  "judgement": "JUDGED_MATCH",
                  "comment": "string"
              }
          }
      */
      let dd = rsp as Object;
      let dtmns: Determination[] = [];

      let nodeUID: keyof typeof dd;
      for (nodeUID in dd) {
        const r = dd[nodeUID] as any;
        dtmns.push({
          job_uid: job_uid.toLocaleLowerCase(),
          patient_uid: patient_uid.toLocaleLowerCase(),
          criteria_uid: nodeUID.toLocaleLowerCase(),
          judgement: r.judgement,
          comment: r.comment == null? "": r.comment,
          date_updated: new Date(),
        });
      }

      return dtmns;
    }));
  }

  public update_determination(
    job_uid: string,
    criteria_uid: string,
    patient_uid: string,
    dtmn: Determination): Observable<Determination> {

    // create the URL
    let url = this.base_url + '/_cohorts/criterion_match_status';

    // set the parameters
    const params = new HttpParams()
      .set("job_uid", job_uid)
      .set('node_uid', criteria_uid)
      .set('person_uid', patient_uid)
    // set the headers
    const headers = this._get_headers();

    // send request and parse the return
    return this.http.post(
      url,
      {
        "judgement": dtmn.judgement,
        "comment": dtmn.comment
      },
      { "params": params, 'headers': headers }
    ).pipe(map(rsp => {
      let dd = rsp as Object;
      if (rsp.hasOwnProperty(patient_uid)) {
        console.error('* error setting dtmn for criterion!', dd);
      }
      return dtmn;
    }));
  }

  /////////////////////////////////////////////////////////
  // Fact related functions
  /////////////////////////////////////////////////////////

  public get_facts(job_uid: string, 
    criteria_uid: string,
    patient_uid: string, 
  ): Observable<Fact[]> {
    // create the URL
    let url = this.base_url + '/_cohorts/node_evidence';

    // set the parameters
    const params = new HttpParams()
      .set("job_uid", job_uid)
      .set('node_uid', criteria_uid)
      .set('person_uid', patient_uid)
    // set the headers
    const headers = this._get_headers();

    // send request and parse the return
    return this.http.get(url, { "params": params, 'headers': headers }).pipe(map(rsp => {
      let rs = rsp as Array<any>;
      let facts = [] as Array<Fact>;

      for (let i = 0; i < rs.length; i++) {
        let EUIDs = rs[i].evidenceUID.split(':');
        let data_source = EUIDs[0];
        let type = EUIDs[1];
        facts.push({
          evidence_id: '' + rs[i].evidenceUID,
          data_source: data_source,
          type: type,
          date_time: new Date(0),

          summary: "", // no 
          full_text: "",
          score: rs[i].score,
          fhir: {}
        });

      }

      return facts;
    }));
  }

  public get_fact_detail(evidence_id: string): Observable<Object> {
    // create the URL
    let url = this.base_url + '/_cohorts/evidencebyuid';

    // set the parameters
    const params = new HttpParams()
      .set("evidenceUID", evidence_id)
    // set the headers
    const headers = this._get_headers();

    // send request and parse the return
    return this.http.get(
      url, 
      { "params": params, 'headers': headers }
    ).pipe(map(rsp => {
      let d = rsp as any;
      // the returned object should be an dict-like obj
      let fhir = d[evidence_id];

      return fhir;
    }));
  }

  public get_fact_details(evidence_ids: string[]): Observable<any> {
    // create the URL
    let url = this.base_url + '/_cohorts/evidencebyuid';

    // set the parameters
    const params = new HttpParams()
      .set("evidenceUID", evidence_ids.join(','))
    // set the headers
    const headers = this._get_headers();

    // send request and parse the return
    return this.http.get(
      url, 
      { "params": params, 'headers': headers }
    ).pipe(map(rsp => {
      let d = rsp as any;
      return d;
    }));
  }

}

