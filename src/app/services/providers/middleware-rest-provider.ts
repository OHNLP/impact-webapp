import {CohortDefinition} from "../../models/cohort-definition";
import {CohortInclusion, PatInfo} from "../../models/pat-info";
import {ClinicalDocument, Fact, StructuredData} from "../../models/clinical-data";
import {Project} from "../../models/project";
import { Observable } from "rxjs";
import { Determination } from "../../models/determination";
import { JobInfo } from "src/app/models/job-info";

export abstract class MiddlewareRestProvider {
  /* ===== Global/User Information Methods ===== */
  public abstract get_username(): string

  // public abstract create_project(): 

  /* ===== Job Management Methods ===== */
  public abstract submit_job(
    project_uid: string
  ): Observable<JobInfo>

  public abstract cancel_job(
    job_uid: string
  ): Observable<boolean>

  public abstract get_jobs(
    project_uid: string
  ): Observable<JobInfo[]>;

  /* ===== Project Management Methods ===== */
  public abstract get_projects(
    // should be related to user
  ): Observable<Array<Project>>

  public abstract create_project(
    // should be related to user
    name: string
  ): Observable<Project>

  /* ===== Cohort Related Methods ====== */
  public abstract get_criteria(
    project_uid: string
  ): Observable<CohortDefinition>;

  public abstract get_patients(
    project_uid: string
  ): Observable<Array<PatInfo>>;

  /* ===== Individual Patient Determination Related Methods =====*/
  public abstract get_patient_decisions(
    job_uid: string,
    patient_uids: string[]
  ): Observable<Map<string, CohortInclusion>>;

  public abstract update_patient_decision(
    job_uid: string,
    patient_uid: string,
    judgement: CohortInclusion
  ): Observable<boolean>;

  public abstract get_determinations(
    uid: string, 
    patient_uid: string,
    criteria?: CohortDefinition
  ): Observable<Array<Determination>>;

  public abstract update_determination(
    job_uid: string,
    criteria_uid: string,
    patient_uid: string,
    dtmn: Determination
  ): Observable<Determination>;

  public abstract get_facts(
    uid: string, 
    patient_uid: string,
    criteria_uid: string
  ): Observable<Array<Fact>>;

  public abstract get_fact_detail(
    evidence_id: string
  ): Observable<Object>;
}
