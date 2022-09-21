export class PatInfo {
  pat_uid: string = 'PATIENT_ID'
  inclusion: CohortInclusion = CohortInclusion.UNJUDGED
}

export enum CohortInclusion {
  UNJUDGED = "UNJUDGED",
  INCLUDE = "INCLUDE",
  EXCLUDE = "EXCLUDE"
}
