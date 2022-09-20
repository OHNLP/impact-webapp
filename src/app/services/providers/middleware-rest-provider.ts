import {CohortDefinition} from "../../models/cohort-definition";
import {PatInfo} from "../../models/pat-info";
import {ClinicalDocument, Fact, StructuredData} from "../../models/clinical-data";
import {Project} from "../../models/project";
import { Observable } from "rxjs";
import { Determination } from "../../models/Determination";

export abstract class MiddlewareRestProvider {
  /* ===== Global/User Information Methods ===== */
  public abstract getUserName(): string

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
  ): Array<PatInfo>;

  public abstract writeRetrievedCohort(project_uid: string, cohort?: Array<PatInfo>): boolean

  /* ===== Individual Patient Evidence Related Methods =====*/
  public abstract getStructuredEvidence(project_uid: string, patient_uid: string, criterion?: string): Array<StructuredData>

  public abstract getUnstructuredEvidence(project_uid: string, patient_uid: string, criterion?: string): Array<ClinicalDocument>

  /* ===== Individual Patient Determination Related Methods =====*/
  public abstract get_determinations(
    job_uid: string, 
    patient_uid: string
  ): Observable<Array<Determination>>;

  public abstract get_facts(
    job_uid: string, 
    patient_uid: string,
    criteria_uid: string
  ): Observable<Array<Fact>>;
}
