import {MiddlewareRestProvider} from "../middleware-rest-provider";
import {CohortDefinition} from "../../../models/cohort-definition";
import {example_cohort_definition} from "../../../views/project/cohort-definition/example-data";
import {PatInfo} from "../../../models/pat-info";

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

  getRetrievedCohort(project_uid?: string): Array<PatInfo> {
    let cohort = []
    let i = 0
    while (i < 1000) {
      let pat = new PatInfo()
      pat.mrn = i.toString()
      pat.name = "Test Patient " + i.toString()
      cohort.push(pat)
      i += 1
    }
    return cohort;
  }

  writeRetrievedCohort(project_uid: string, cohort: Array<PatInfo>): boolean {
    return false;
  }
}
