import {CohortDefinition} from "../../models/cohort-definition";
import {CohortInclusion, PatInfo} from "../../models/pat-info";
import {Fact} from "../../models/clinical-data";
import {Project} from "../../models/project";
import { Observable } from "rxjs";
import { Determination } from "../../models/determination";
import { JobInfo } from "src/app/models/job-info";
import { DataSource } from "src/app/models/data-source";

export abstract class MiddlewareRestProvider {
  /* Data Source Config Methods */
  public abstract get_project_data_sources(
    project_uid: string
  ): Observable<Array<DataSource>>

  public abstract get_all_data_sources(
  ): Observable<Array<DataSource>>

  public abstract update_project_data_sources(
    project_uid: string, 
    dss: Array<DataSource>
  ): Observable<boolean>

  public abstract get_job_data_sources(
    job_uid: string
  ): Observable<Array<DataSource>>

  /* ===== Global/User Information Methods ===== */
  public abstract get_username(): string

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

  /* ===== Criteria Related Methods ====== */
  public abstract get_criteria(
    project_uid: string
  ): Observable<CohortDefinition>;

  public abstract update_criteria(
    project_uid: string,
    criteria: CohortDefinition
  ): Observable<boolean>;

  /* ===== Cohort Related Methods ====== */
  public abstract get_patients(
    project_uid: string
  ): Observable<Array<PatInfo>>;

  public abstract get_patient_detail(
    patient_uid: string
  ): Observable<any>;

  /* ===== Individual Patient Decision Related Methods =====*/
  public abstract get_patient_decisions(
    job_uid: string,
    patient_uids: string[]
  ): Observable<Map<string, CohortInclusion>>;

  public abstract update_patient_decision(
    job_uid: string,
    patient_uid: string,
    judgement: CohortInclusion
  ): Observable<boolean>;

  /* ===== Individual Patient Determination Related Methods =====*/
  public abstract get_determinations(
    job_uid: string, 
    patient_uid: string,
    criteria?: CohortDefinition
  ): Observable<Array<Determination>>;

  public abstract get_adjudications(
    job_uid: string, 
    patient_uid: string,
    criteria: CohortDefinition,
    dtmn_dict: any
  ): Observable<any>;

  public abstract update_determination(
    job_uid: string,
    criteria_uid: string,
    patient_uid: string,
    dtmn: Determination
  ): Observable<Determination>;

  /* ===== Fact Related Methods =====*/
  public abstract get_facts(
    job_uid: string, 
    criteria_uid: string,
    patient_uid: string,
  ): Observable<Array<Fact>>;

  public abstract get_fact_detail(
    evidence_id: string
  ): Observable<Object>;

  public abstract get_fact_details(
    evidence_ids: string[]
  ): Observable<any>;

  /* ===== UMLS Related Methods =====*/
  public abstract get_umls_codes_by_keyword(
    keyword: string
  ): Observable<any[]>;

  /* ===== PhenoRepSearch Related Methods =====*/
  public abstract get_pheno_reps_by_keyword(
    keyword: string
  ): Observable<CohortDefinition[]>;
}
