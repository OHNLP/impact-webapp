export enum View {
  GLOBAL_DASHBOARD,

  // project related
  PROJECT_LIST,
  PROJECT_JOB_LIST,
  PROJECT_DASHBOARD,
  PROJECT_QUERY_DEFINITION,

  COHORT_BROWSER,
  PROJECT_RELEVANCE_PATIENT_VIEW,

  USER_LOGIN,

  // for making new project
  PROJECT_MAKER,

  // for reviewing patient
  PLUMMER,

  // for data source management
  DATA_SOURCE_EDITOR,
}

export enum PatientView {
  SUMMARY,
  STRUCTURED_DATA,
  UNSTRUCTURED_DATA
}
