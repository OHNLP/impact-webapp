import {CohortDefinition} from "../../models/cohort-definition";
import {PatInfo} from "../../models/pat-info";
import {ClinicalDocument, Fact, StructuredData} from "../../models/clinical-data";
import {Project} from "../../models/project";
import { Observable } from "rxjs";
import { Determination } from "../../models/determination";
import { JobInfo } from "src/app/models/job-info";

export abstract class MiddlewareRestProvider {
  /* ===== Global/User Information Methods ===== */
  public abstract get_username(): string

  /* ===== Project Management Methods ===== */
  public abstract get_projects(
    // should be related to user
  ): Observable<Array<Project>>

  /* ===== Cohort Related Methods ====== */
  public abstract getCohortCriteria(
    project_uid: string
  ): Observable<CohortDefinition>;

  public abstract writeCohortCriteria(
    project_uid: string, 
    definition: CohortDefinition
  ): boolean;

  public abstract getRetrievedCohort(
    project_uid: string
  ): Observable<Array<PatInfo>>;

  public abstract writeRetrievedCohort(project_uid: string, cohort?: Array<PatInfo>): boolean

  /* ===== Individual Patient Evidence Related Methods =====*/
  public abstract getStructuredEvidence(project_uid: string, patient_uid: string, criterion?: string): Array<StructuredData>

  public abstract getUnstructuredEvidence(project_uid: string, patient_uid: string, criterion?: string): Array<ClinicalDocument>

  /* ===== Individual Patient Determination Related Methods =====*/
  public abstract get_cohort_decisions(
    job_uid: string,
    patient_uids: string[]
  ): Observable<Object>;

  public abstract get_determinations(
    uid: string, 
    patient_uid: string
  ): Observable<Array<Determination>>;

  public abstract set_determination(
    job_uid: string,
    dtmn: Determination
  ): Observable<Determination>;

  public abstract get_facts(
    uid: string, 
    patient_uid: string,
    criteria_uid: string
  ): Observable<Array<Fact>>;

  public abstract get_document(

  ): Observable<ClinicalDocument>;

  /* ===== Jobs Related Methods =====*/
  public abstract get_jobs(
    project_uid: string
  ): Observable<JobInfo[]>;
}
