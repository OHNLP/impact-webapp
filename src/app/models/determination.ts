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
    EVIDENCE_FOUND = "EVIDENCE_FOUND",
    EVIDENCE_FOUND_NLP = "EVIDENCE_FOUND_NLP",
    NO_EVIDENCE_FOUND = "NO_EVIDENCE_FOUND",
    UNJUDGED = "UNJUDGED",
}