export class PatInfo {
  pat_id: string = 'PATIENT_ID'
  inclusion: CohortInclusion = CohortInclusion.UNJUDGED
}

export enum CohortInclusion {
  UNJUDGED = "UNJUDGED",
  INCLUDE = "INCLUDE",
  EXCLUDE = "EXCLUDE"
}
