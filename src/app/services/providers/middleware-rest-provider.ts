import {CohortDefinition} from "../../models/cohort-definition";
import {PatInfo} from "../../models/pat-info";

export abstract class MiddlewareRestProvider {
  /* ===== Cohort Related Methods ====== */
  public abstract getCohortCriteria(project_uid?: string): CohortDefinition
  public abstract writeCohortCriteria(project_uid?: string, definition?: CohortDefinition): boolean
  public abstract getRetrievedCohort(project_uid?: string): Array<PatInfo>
  public abstract writeRetrievedCohort(project_uid: string, cohort: Array<PatInfo>): boolean
}
