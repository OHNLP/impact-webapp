export interface Determination {
    project_uid: string,
    patient_uid: string,
    criteria_uid: string,

    // user created information
    value: DETERMINATION_VALUE,
    comment: string
    date_updated: Date
}

export enum DETERMINATION_VALUE {
    UNK,
    YES,
    NO,
    NA
}
