import { HttpClient, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { RealMiddlewareRestProvider } from "./real-middleware-rest-provider";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EXAMPLE_JOBS } from "src/app/samples/sample-job";
import { EXAMPLE_PATIENTS } from "src/app/samples/sample-patient";
import { CohortInclusion } from "src/app/models/pat-info";

describe('RealMiddlewareRestProvider', () => {

    let service: RealMiddlewareRestProvider;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        service = TestBed.inject(RealMiddlewareRestProvider);
        httpController = TestBed.inject(HttpTestingController);
    });

    it('should get cohort decisions', () => {
        service.get_patient_decisions(
            EXAMPLE_JOBS[0].job_uid,
            [
                EXAMPLE_PATIENTS[0].pat_uid,
                EXAMPLE_PATIENTS[1].pat_uid,
            ]
        ).subscribe(rsp => {
            
        })
    });
});