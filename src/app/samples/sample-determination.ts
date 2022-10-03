import { Determination, JUDGEMENT_TYPE } from "../models/determination";

export const EXAMPLE_DETERMINATIONS: Determination[] = [
{
    // system information
    job_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: 'd8151c93-2bf6-4f1b-98c8-ef8809da5bb6',
    judgement: JUDGEMENT_TYPE.EVIDENCE_FOUND,

    // user created information
    comment: 'Birthday information is found in the EHR',
    date_updated: new Date(),
},
{
    // system information
    job_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: 'd9152c93-2bf6-4f1b-98c8-ef8809da5bb8',
    judgement: JUDGEMENT_TYPE.JUDGED_MATCH,

    // user created information
    comment: 'GERD confirmed',
    date_updated: new Date(),
}
];