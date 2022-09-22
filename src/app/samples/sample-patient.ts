import { CohortInclusion, PatInfo } from "../models/pat-info";

export const EXAMPLE_PATIENT: PatInfo = {
    pat_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    name: 'Patient Name A',
    // decisions
    inclusion: CohortInclusion.INCLUDE,
};

export const EXAMPLE_PATIENTS: PatInfo[] = [
{
    pat_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    name: 'Patient Name A',
    // decisions
    inclusion: CohortInclusion.INCLUDE,
},
{
    pat_uid: '52b4a04b-c7a1-4239-9ea0-6f5a92814cbd',
    name: 'Patient Name B',
    // decisions
    inclusion: CohortInclusion.EXCLUDE,
},
{
    pat_uid: '62b4a04b-c7a1-4239-9ea0-6f5a92814cbe',
    name: 'Patient Name C',
    // decisions
    inclusion: CohortInclusion.UNJUDGED,
},
];