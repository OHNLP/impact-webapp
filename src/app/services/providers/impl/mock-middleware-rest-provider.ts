import {MiddlewareRestProvider} from "../middleware-rest-provider";
import {CohortDefinition} from "../../../models/cohort-definition";
import {example_cohort_definition} from "../../../views/project/cohort-definition/example-data";

export class MockMiddlewareRestProvider extends MiddlewareRestProvider {
  getCohortCriteria(project_uid?: string): CohortDefinition {
    if (!project_uid) {
      throw new Error("getCohortCriteria called without a project UID")
    }
    return example_cohort_definition;
  }

  writeCohortCriteria(project_uid?: string, definition?: CohortDefinition): boolean {
    return false;
  }
}
