export class PatInfo {
  pat_uid: string = 'PATIENT_ID'
  name: string = 'PATIENT_NAME'
  inclusion: CohortInclusion = CohortInclusion.UNJUDGED
}

export enum CohortInclusion {
  UNJUDGED = "UNJUDGED",
  INCLUDE = "INCLUDE",
  EXCLUDE = "EXCLUDE"
}
