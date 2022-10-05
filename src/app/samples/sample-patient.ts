import { CohortInclusion, PatInfo } from "../models/pat-info";

export const EXAMPLE_PATIENTS: PatInfo[] = [
{
    pat_uid: '42b4a04b-c7a1-4239-9ea0-6f5a92814cbc',
    name: 'Megumi Noda',
    // decisions
    inclusion: CohortInclusion.INCLUDE,

    labels: [
        'GERD', 
        'WARFARIN',
        'ECOG PS2'
    ],
    stat: {
        n_records: 100,
        n_criteria_yes: 4,
        n_criteria_no: 1,
        n_criteria_na: 5,
        n_criteria_unknown: 0,
    }
},
{
    pat_uid: '52b4a04b-c7a1-4239-9ea0-6f5a92814cbd',
    name: 'Shinichi Chiaki',
    // decisions
    inclusion: CohortInclusion.EXCLUDE,

    labels: [
        'GERD', 
        'COUMADIN',
        'ECOG PS1'
    ],
    stat: {
        n_records: 105,
        n_criteria_yes: 4,
        n_criteria_no: 1,
        n_criteria_na: 5,
        n_criteria_unknown: 0,
    }
},
{
    pat_uid: '62b4a04b-c7a1-4239-9ea0-6f5a92814cbe',
    name: 'Edward Elric',
    // decisions
    inclusion: CohortInclusion.UNJUDGED,

    labels: [
        'WARFARIN',
        'ECOG PS1'
    ],
    stat: {
        n_records: 132,
        n_criteria_yes: 4,
        n_criteria_no: 1,
        n_criteria_na: 5,
        n_criteria_unknown: 0,
    }
},
];