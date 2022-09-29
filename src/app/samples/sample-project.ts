import { Project } from "../models/project";

export const EXAMPLE_PROJECTS: Project[] = [
{
    uid: '046b6c7f-0b8a-43b9-b35d-6489e6daee91',
    short_title: 'GERD',
    name: 'Clinical trials feasibility screening for gastroesophageal reflux disease',

    description: 'Screening gastroesophageal reflux disease (GERD) positive patients and GERD negative patients',
    date_updated: new Date(),
    stat: {
        n_cohort: 5120,
        n_records: 122151,
        n_included: 103,
        n_excluded: 1103,
        n_unjudged: 3814
    }
},
{
    uid: '126b6c7f-0b8a-43b9-b35d-6489e6daee92',
    short_title: 'IDBD-RRMM',
    name: 'Iberdomide, Daratumumab, Bortezomib, and Dexamethasone for the Treatment of Newly Diagnosed Multiple Myeloma, IDEAL Study [NCT05392946]',

    description: "This phase I/II trial studies the side effects and best dose of iberdomide and how well it works in combination with daratumumab, bortezomib, and dexamethasone in treating patients with newly diagnosed multiple myeloma. Immunotherapy with iberdomide, may induce changes in body's immune system and may interfere with the ability of tumor cells to grow and spread...",
    date_updated: new Date(),
    stat: {
        n_cohort: 2319,
        n_records: 82352,
        n_included: 105,
        n_excluded: 888,
        n_unjudged: 1226
    }
},
{
    uid: '236b6c7f-0b8a-43b9-b35d-6489e6daee93',
    short_title: 'SCOPE-RRMM',
    name: 'Selinexor, Pomalidomide, and Dexamethasone With or Without Carfilzomib for the Treatment of Patients With Relapsed Refractory Multiple Myeloma, The SCOPE Trial [NCT04764942]',

    description: "This phase I/II trial identifies the best dose and side effects of selinexor, and how well it works when given in combination with pomalidomide and dexamethasone with or without carfilzomib in treating patients with multiple myeloma that has come back (relapsed) and does not respond to treatment with proteasome inhibitors and immunomodulatory drugs (refractory).",
    date_updated: new Date(),
    stat: {
        n_cohort: 9812,
        n_records: 66251,
        n_included: 110,
        n_excluded: 6422,
        n_unjudged: 3180
    }
}
];