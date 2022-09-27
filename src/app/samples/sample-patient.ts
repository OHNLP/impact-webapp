import { CohortInclusion, PatInfo } from "../models/pat-info";

export const EXAMPLE_PATIENTS: PatInfo[] = [
{
    pat_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    name: 'Megumi Noda',
    // decisions
    inclusion: CohortInclusion.INCLUDE,
},
{
    pat_uid: '52b4a04b-c7a1-4239-9ea0-6f5a92814cbd',
    name: 'Shinichi Chiaki',
    // decisions
    inclusion: CohortInclusion.EXCLUDE,
},
{
    pat_uid: '62b4a04b-c7a1-4239-9ea0-6f5a92814cbe',
    name: 'Edward Elric',
    // decisions
    inclusion: CohortInclusion.UNJUDGED,
},
];