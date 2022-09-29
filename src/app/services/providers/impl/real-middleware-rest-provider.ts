import { StructuredData, ClinicalDocument, Fact } from "src/app/models/clinical-data";
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

@Injectable({
    providedIn: 'root'
})

export class RealMiddlewareRestProvider extends MiddlewareRestProvider {
    public get_evidence(evidence_id: string): Observable<Object> {
        throw new Error("Method not implemented.");
    }
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
            { "params":params, "headers":headers }
        ).pipe(map(rsp => {
            console.log('* /_cohorts/relevance = ' + rsp);
            return true;
        }));
    }

    // need to update this when init
    public base_url: string = '';

    constructor(
        private http: HttpClient,
    ) {
        super();
        this.base_url = environment.apiURL;
    }


    public get_patient_decisions(job_uid: string, patient_uids: string[]): Observable<Map<string, CohortInclusion>> {
        // create the URL
        let url = this.base_url + '/_cohorts/relevance';

        // set the parameters
        const params = new HttpParams()
            .set("job_uid", job_uid)
            .appendAll({"patient_uid": patient_uids})

        // set the headers
        const headers = this._get_headers();

        // send request and parse the return
        return this.http.get(url, { "params":params, "headers":headers }).pipe(map(rsp => {
            return rsp as Map<string, CohortInclusion>;
        }));
    }

    public _get_headers(): HttpHeaders {
        let auth = localStorage.getItem('header_user_credentials') || '';
        return new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*')
            .set('Authorization', auth);
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
        return this.http.get(url, { "params": params }).pipe(map(rsp => {
            let jobs = rsp as JobInfo[];
            return jobs;
        }));
    }

    public handleError(error: HttpErrorResponse, caught: Observable<Object>): ObservableInput<any> {
        if (error.status === 401) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
          
          throwError(() => new Error('401 happened;'));
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened;'));
    }

    public get_username(): string {
        throw new Error("Method not implemented.");
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
                catchError(this.handleError),
                map(rsp => {
                let rs = rsp as Array<any>;
                let prjs = [] as Project[];

                for (let i = 0; i < rs.length; i++) {
                    const r = rs[i];
                    prjs.push({
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
                    })
                }

                return prjs;
        }));
    }
    public getCohortCriteria(project_uid: string): Observable<CohortDefinition> {
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
                return criteria;
        }));
    }
   
    public get_patients(project_uid: string): Observable<PatInfo[]> {
        throw new Error("Method not implemented.");
    }
    public writeRetrievedCohort(project_uid: string, cohort?: PatInfo[] | undefined): boolean {
        throw new Error("Method not implemented.");
    }
    public getStructuredEvidence(project_uid: string, patient_uid: string, criterion?: string | undefined): StructuredData[] {
        throw new Error("Method not implemented.");
    }
    public getUnstructuredEvidence(project_uid: string, patient_uid: string, criterion?: string | undefined): ClinicalDocument[] {
        throw new Error("Method not implemented.");
    }
    public get_determinations(
        uid: string, 
        patient_uid: string
    ): Observable<Determination[]> {
        throw new Error("Method not implemented.");
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

    public get_facts(uid: string, patient_uid: string, criteria_uid: string): Observable<Fact[]> {
        // create the URL
        let url = this.base_url + '/_cohorts/node_evidence';

        // set the parameters
        const params = new HttpParams()
            .set("uid", uid)
            .set('node_uid', criteria_uid)
            .set('person_uid', patient_uid)
        // set the headers
        const headers = this._get_headers();

        // send request and parse the return
        return this.http.get(url, { "params": params, 'headers': headers }).pipe(map(rsp => {
            let rs = rsp as Array<any>;
            let facts = [] as Array<Fact>;

            for (let i = 0; i < rs.length; i++) {
                facts.push({
                    evidence_id: 'RND-' + rs[i].evidenceUID,
                    type: 'lab_result',
                    date_time: new Date(),

                    summary: "At diagnosis, <span class='highlight'>marrow area</span> infiltrated by <span class='highlight'>myeloma</span> correlated negatively with hemoglobin, erythrocytes, and marrow erythroid cells. After successful chemotherapy ...",

                    code: "203.01",
                    code_system: 'ICD-9-CM',

                    score: rs[i].score
                });

            }

            return facts;
        }));
    }

    public get_document(): Observable<ClinicalDocument> {
        throw new Error("Method not implemented.");
    }
}
