export class PatInfo {
  mrn: string = 'PAT_ID_NOT_INITIALIZED'
  name: string = 'PAT_NAME_NOT_INITIALIZED'
  inclusion: CohortInclusion = CohortInclusion.UNJUDGED
  dob: Date = new Date(2000, 0, 1)
  birth_gender_male_flag: boolean = true
}

export enum CohortInclusion {
  UNJUDGED = "UNJUDGED",
  INCLUDE = "INCLUDE",
  EXCLUDE = "EXCLUDE"
}
