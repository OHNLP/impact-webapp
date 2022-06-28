export class PatInfo {
  mrn: string = 'PAT_ID_NOT_INITIALIZED'
  name: string = 'PAT_NAME_NOT_INITIALIZED'
  inclusion: CohortInclusion = CohortInclusion.UNJUDGED
}

export enum CohortInclusion {
  UNJUDGED,
  INCLUDE,
  EXCLUDE
}
