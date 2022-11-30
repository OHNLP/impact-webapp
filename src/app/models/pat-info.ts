export class PatInfo {
  pat_uid: string = 'PATIENT_ID'
  name: string = 'PATIENT_NAME'
  inclusion: CohortInclusion = CohortInclusion.UNJUDGED
  match: CohortMatch = CohortMatch.UNKNOWN

  // optional
  labels?: string[]
  stat?: {
    n_records: number,
    n_criteria_yes: number,
    n_criteria_no: number,
    n_criteria_na: number,
    n_criteria_unknown: number,
  }

  // the information from evidence?
  fhir: any = {}
}

export enum CohortInclusion {
  UNJUDGED = "UNJUDGED",
  INCLUDE = "INCLUDE",
  EXCLUDE = "EXCLUDE"
}

export enum CohortMatch {
  MATCHED = "C_MATCHED",
  UNMATCHED = "C_UNMATCHED",
  UNKNOWN = "C_UNKNOWN",
}