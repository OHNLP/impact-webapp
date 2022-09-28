import { StructuredData, ClinicalDocument, Fact } from "src/app/models/clinical-data";
import { CohortDefinition } from "src/app/models/cohort-definition";
import { Determination } from "src/app/models/determination";
import { PatInfo } from "src/app/models/pat-info";
import { Project } from "src/app/models/project";
import { MiddlewareRestProvider } from "../middleware-rest-provider";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, map, Observable, ObservableInput, of, throwError } from 'rxjs';
import { JobInfo } from "src/app/models/job-info";

@Injectable({
    providedIn: 'root'
})

export class RealMiddlewareRestProvider extends MiddlewareRestProvider {
    public get_jobs(project_uid: string): Observable<JobInfo[]> {
        // create the URL
        let url = this.base_url + '/_jobs/project';

        // set the parameters
        const params = new HttpParams()
            .set("project_uid", project_uid)

        // send request and parse the return
        return this.http.get(url, { "params": params }).pipe(map(rsp => {
            let jobs = rsp as JobInfo[];
            return jobs;
        }));
    }

    public base_url: string = 'http://localhost:8080';

    constructor(
        private http: HttpClient
    ) {
        super();
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

    public _get_headers(): HttpHeaders {
        let auth = localStorage.getItem('header_user_credentials') || '';
        return new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*')
            .set('Authorization', auth);
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
    public writeCohortCriteria(project_uid: string, definition: CohortDefinition): boolean {
        throw new Error("Method not implemented.");
    }
    public getRetrievedCohort(project_uid: string): Observable<PatInfo[]> {
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

    public get_facts(uid: string, patient_uid: string, criteria_uid: string): Observable<Fact[]> {
        // create the URL
        let url = this.base_url + '/_cohorts/node_evidence';

        // set the parameters
        const params = new HttpParams()
            .set("uid", uid)
            .set('node_uid', criteria_uid)
            .set('person_uid', patient_uid)

        // send request and parse the return
        return this.http.get(url, { "params": params }).pipe(map(rsp => {
            let rs = rsp as Array<any>;
            let facts = [] as Array<Fact>;

            for (let i = 0; i < rs.length; i++) {
                facts.push({
                    id: 'RND-' + rs[i].evidenceUID,
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
