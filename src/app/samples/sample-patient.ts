import { CohortInclusion, CohortMatch, PatInfo } from "../models/pat-info";

export const EXAMPLE_PATIENTS: PatInfo[] = [
{
    pat_uid: '42b4a04b',
    name: 'Megumi Noda',
    // decisions
    inclusion: CohortInclusion.INCLUDE,
    match: CohortMatch.MATCHED,

    labels: [
        'GERD', 
        'WARFARIN',
        'ECOG PS2'
    ],
    stat: {
        n_records: 23,
        n_criteria_yes: 4,
        n_criteria_no: 0,
        n_criteria_na: 5,
        n_criteria_unknown: 0,
    },
    fhir: {}
},
{
    pat_uid: '52b4a04b',
    name: 'Shinichi Chiaki',
    // decisions
    inclusion: CohortInclusion.EXCLUDE,
    match: CohortMatch.UNMATCHED,

    labels: [
        'GERD', 
        'COUMADIN',
        'ECOG PS1'
    ],
    stat: {
        n_records: 34,
        n_criteria_yes: 4,
        n_criteria_no: 1,
        n_criteria_na: 5,
        n_criteria_unknown: 0,
    },
    fhir: {}
},
{
    pat_uid: '62b4a04c',
    name: 'Edward Elric',
    // decisions
    inclusion: CohortInclusion.UNJUDGED,
    match: CohortMatch.UNKNOWN,

    labels: [
        'WARFARIN',
        'ECOG PS1'
    ],
    stat: {
        n_records: 45,
        n_criteria_yes: 3,
        n_criteria_no: 0,
        n_criteria_na: 6,
        n_criteria_unknown: 0,
    },
    fhir: {}
},
];