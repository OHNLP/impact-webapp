import { CohortInclusion, PatInfo } from "../models/pat-info";

export const EXAMPLE_PATIENT: PatInfo = {
    pat_id: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    // decisions
    inclusion: CohortInclusion.INCLUDE,
};

export const EXAMPLE_PATIENTS: PatInfo[] = [
{
    pat_id: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    // decisions
    inclusion: CohortInclusion.INCLUDE,
},
{
    pat_id: '52b4a04b-c7a1-4239-9ea0-6f5a92814cbd',
    // decisions
    inclusion: CohortInclusion.EXCLUDE,
},
{
    pat_id: '62b4a04b-c7a1-4239-9ea0-6f5a92814cbe',
    // decisions
    inclusion: CohortInclusion.UNJUDGED,
},
];