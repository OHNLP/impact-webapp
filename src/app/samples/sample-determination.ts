import { Determination, DETERMINATION_VALUE, JUDGEMENT_TYPE } from "../models/determination";

export const EXAMPLE_DETERMINATIONS: Determination[] = [
{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: 'd8151c93-2bf6-4f1b-98c8-ef8809da5bb6',
    judgement: JUDGEMENT_TYPE.EVIDENCE_FOUND,

    // user created information
    value: DETERMINATION_VALUE.YES,
    comment: 'Birthday information is found in the EHR',
    date_updated: new Date(),
},
{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: 'd9152c93-2bf6-4f1b-98c8-ef8809da5bb8',
    judgement: JUDGEMENT_TYPE.JUDGED_MATCH,

    // user created information
    value: DETERMINATION_VALUE.YES,
    comment: 'GERD confirmed',
    date_updated: new Date(),
},
{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: 'b14d2d45-44f0-4ec6-b621-b5d5c3f7e08d',
    judgement: JUDGEMENT_TYPE.EVIDENCE_FOUND,

    // user created information
    value: DETERMINATION_VALUE.YES,
    comment: 'Serum M-protein found',
    date_updated: new Date(),
},
{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: 'c14d2d45-42f0-4ec6-b621-b5d5c3f7e08d',
    judgement: JUDGEMENT_TYPE.EVIDENCE_FOUND,

    // user created information
    value: DETERMINATION_VALUE.YES,
    comment: 'Urine M-protein found',
    date_updated: new Date(),
},
{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: 'x9152ct3-2bf6-4f1b-98c8-ef8809da5bb8',
    judgement: JUDGEMENT_TYPE.EVIDENCE_FOUND,

    // user created information
    value: DETERMINATION_VALUE.NA,
    comment: 'ECOG not found',
    date_updated: new Date(),
},
{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: 'x9152ct3-lab6-4f1b-98c8-ef8809da5bb8',
    judgement: JUDGEMENT_TYPE.EVIDENCE_FOUND_NLP,

    // user created information
    value: DETERMINATION_VALUE.NA,
    comment: 'None of following found',
    date_updated: new Date(),
},
{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: 'a14d2d45-lab0-4ec6-b621-b5d5c3f7e08d',
    judgement: JUDGEMENT_TYPE.NO_EVIDENCE_FOUND,

    // user created information
    value: DETERMINATION_VALUE.NA,
    comment: 'ANC not found',
    date_updated: new Date(),
},
{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: 'b24d2d45-lab0-4ec6-b621-b5d5c3f7e08e',
    judgement: JUDGEMENT_TYPE.NO_EVIDENCE_FOUND,

    // user created information
    value: DETERMINATION_VALUE.NA,
    comment: 'PLT not found',
    date_updated: new Date(),
},
{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: 'c24d2d45-lab0-4ec6-b621-b5d5c3f7e08e',
    judgement: JUDGEMENT_TYPE.EVIDENCE_FOUND_NLP,

    // user created information
    value: DETERMINATION_VALUE.NA,
    comment: 'HGB not found',
    date_updated: new Date(),
},



{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: '208dbfc2-7a1a-4f63-81fb-594900862730',
    judgement: JUDGEMENT_TYPE.NO_EVIDENCE_FOUND,

    // user created information
    value: DETERMINATION_VALUE.NA,
    comment: 'HIV not found',
    date_updated: new Date(),
},
{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: '338dbfc2-7a1a-4f63-81fb-594900862730',
    judgement: JUDGEMENT_TYPE.NO_EVIDENCE_FOUND,

    // user created information
    value: DETERMINATION_VALUE.NA,
    comment: 'hypertension not found',
    date_updated: new Date(),
},
{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: '438dbfc2-7a1a-4f63-81fb-594900862730',
    judgement: JUDGEMENT_TYPE.NO_EVIDENCE_FOUND,

    // user created information
    value: DETERMINATION_VALUE.NA,
    comment: 'hepatitis not found',
    date_updated: new Date(),
},
{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: 'y8152ct3-2bf6-4f1b-98c8-ef8809da5bb9',
    judgement: JUDGEMENT_TYPE.NO_EVIDENCE_FOUND,

    // user created information
    value: DETERMINATION_VALUE.NA,
    comment: 'COPD not found',
    date_updated: new Date(),
},
{
    // system information
    project_uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    patient_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    criteria_uid: 'z9152ct4-2bf6-4f1b-98c8-ef8809da5bb9',
    judgement: JUDGEMENT_TYPE.NO_EVIDENCE_FOUND,

    // user created information
    value: DETERMINATION_VALUE.NA,
    comment: 'asthma not found',
    date_updated: new Date(),
},
];