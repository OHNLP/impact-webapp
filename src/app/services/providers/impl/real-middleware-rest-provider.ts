import { StructuredData, ClinicalDocument, Fact } from "src/app/models/clinical-data";
import { CohortDefinition } from "src/app/models/cohort-definition";
import { Determination } from "src/app/models/determination";
import { PatInfo } from "src/app/models/pat-info";
import { Project } from "src/app/models/project";
import { MiddlewareRestProvider } from "../middleware-rest-provider";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class RealMiddlewareRestProvider extends MiddlewareRestProvider {

    constructor(private http: HttpClient) {
        super();
    }

    public getUserName(): string {
        throw new Error("Method not implemented.");
    }
    public getProjectList(): Project[] {
        throw new Error("Method not implemented.");
    }
    public getCohortCriteria(project_uid: string): Observable<CohortDefinition> {
        let url = 'http://localhost:8080/_projects/criterion';
        const params = new HttpParams()
            .set("project_uid", "046b6c7f-0b8a-43b9-b35d-6489e6daee91")
        // return this.http.get(url, {"params":params});
        throw new Error("Method not implemented.");
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
    public getDeterminations(project_uid: string, patient_uid: string): Determination[] {
        throw new Error("Method not implemented.");
    }
    public getFacts(project_uid: string, patient_uid: string, criteria_uid: string): Fact[] {
        throw new Error("Method not implemented.");
    }

}
