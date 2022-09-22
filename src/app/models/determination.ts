export interface Determination {
    // system information
    project_uid: string,
    patient_uid: string,
    criteria_uid: string,
    judgement: JUDGEMENT_TYPE,

    // user created information
    value: DETERMINATION_VALUE,
    comment: string,
    date_updated: Date,
}

export enum DETERMINATION_VALUE {
    UNK = "UNK",
    YES = "YES",
    NO = "NO",
    NA = "NA"
}

export enum JUDGEMENT_TYPE {
    JUDGED_MATCH = "JUDGED_MATCH",
    JUDGED_MISMATCH = "JUDGED_MISMATCH",
    JUDGED_NO_EVIDENCE = "JUDGED_NO_EVIDENCE",
    EVIDENCE_FOUND = "EVIDENCE_FOUND",  // Yes by structure data
    EVIDENCE_FOUND_NLP = "EVIDENCE_FOUND_NLP", // Yes by NLP
    NO_EVIDENCE_FOUND = "NO_EVIDENCE_FOUND", // No 
    UNJUDGED = "UNJUDGED",
}