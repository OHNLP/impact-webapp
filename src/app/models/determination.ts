export interface Determination {
    // system information
    job_uid: string,
    patient_uid: string,
    criteria_uid: string,

    // the user uid
    user_uid: string,

    // the judgement by current user?
    judgement: JUDGEMENT_TYPE,

    // user created information
    comment: string,
    date_updated: Date,
}

export enum JUDGEMENT_TYPE {
    // human's judgement
    JUDGED_MATCH = "JUDGED_MATCH",
    JUDGED_MISMATCH = "JUDGED_MISMATCH",
    JUDGED_NO_EVIDENCE = "JUDGED_NO_EVIDENCE",

    // machine's judgement
    EVIDENCE_FOUND = "EVIDENCE_FOUND",  // Yes by structure data
    EVIDENCE_FOUND_NLP = "EVIDENCE_FOUND_NLP", // Yes by NLP
    NO_EVIDENCE_FOUND = "NO_EVIDENCE_FOUND", // No 

    // for reseting judgement
    UNJUDGED = "UNJUDGED",
}

export enum JUDGEMENT_AGREEMENT {
    AGREED = 'AGREED',
    DISAGREED = 'DISAGREED',
    INSUFFICIENT = 'INSUFFICIENT',
}