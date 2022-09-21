import { StructuredData, ClinicalDocument, Fact } from "src/app/models/clinical-data";
import { CohortDefinition } from "src/app/models/cohort-definition";
import { Determination } from "src/app/models/Determination";
import { PatInfo } from "src/app/models/pat-info";
import { Project } from "src/app/models/project";
import { MiddlewareRestProvider } from "../middleware-rest-provider";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map, Observable, of } from 'rxjs';
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

    constructor(private http: HttpClient) {
        super();
    }

    public getUserName(): string {
        throw new Error("Method not implemented.");
    }
    public get_projects(): Observable<Project[]> {
        throw new Error("Method not implemented.");
    }
    public getCohortCriteria(project_uid: string): Observable<CohortDefinition> {
        // create the URL
        let url = this.base_url + '/_projects/criterion';

        // set the parameters
        const params = new HttpParams()
            .set("project_uid", project_uid)

        // send request and parse the return
        return this.http.get(url, { "params": params }).pipe(map(rsp => {
            let criteria = rsp as CohortDefinition;
            return criteria;
        }));
    }
    public writeCohortCriteria(project_uid: string, definition: CohortDefinition): boolean {
        throw new Error("Method not implemented.");
    }
    public getRetrievedCohort(project_uid: string): PatInfo[] {
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
        job_uid: string, 
        patient_uid: string
    ): Observable<Determination[]> {
        throw new Error("Method not implemented.");
    }

    public get_facts(job_uid: string, patient_uid: string, criteria_uid: string): Observable<Fact[]> {
        // create the URL
        let url = this.base_url + '/_cohorts/node_evidence';

        // set the parameters
        const params = new HttpParams()
            .set("job_uid", job_uid)
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
