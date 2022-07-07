import {CohortDefinition} from "../../models/cohort-definition";

export abstract class MiddlewareRestProvider {
  /* ===== Cohort Related Methods ====== */
  public abstract getCohortCriteria(project_uid?: string): CohortDefinition
  public abstract writeCohortCriteria(project_uid?: string, definition?: CohortDefinition): boolean
}
