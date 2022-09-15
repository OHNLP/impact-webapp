import { Fact, FactCollection } from "./clinical-data";
import { CohortInclusion, PatInfo } from "./pat-info";

export const EXAMPLE_PATIENT: PatInfo = {
    pat_id: '12345678',
    // decisions
    inclusion: CohortInclusion.INCLUDE,
}

export const EXAMPLE_FACTS: FactCollection[] = [{
    type: 'lab_result',
    facts: [{
        id: 'lab-123',
        type: 'lab_result',
        date_time: new Date(),

        summary: "Multiple myeloma, in remission",

        code: "203.01",
        code_system: 'ICD-9-CM',

        score_bm25: 0.1
    }, {
        id: 'lab-222',
        type: 'lab_result',
        date_time: new Date(),

        summary: "WBCs(b/L)=8.00(3.5-10.5); Neutrophils (%) = 62(40-70); <span class='highlight'>Platelets</span> (b/L) = 262 (150-450); Hb (g/dL) = 11.7 (13-17); Monocytes (%) = 10 (2-8); Lymphocytes (%) = 28 (25-45); RBCs (t/L) 3.8...",

        code: "203.01",
        code_system: 'ICD-9-CM',

        score_bm25: 0.1
    }],
}, {
    type: 'clinical_note',
    facts: [{
        id: 'note-123',
        type: 'clinical_note',
        date_time: new Date(),

        summary: "<span class='highlight'>Bone marrow </span>is a spongy, soft tissue that resembles a jelly or jam that you would spread on toast. It comes in two colors, red and yellow. <span class='highlight'>Bone marrow </span>files the cavities of your bone ...n",
        full_text: "",

        score_bm25: 0.1
    }, {
        id: '507-123-12345',
        type: 'clinical_note',
        date_time: new Date(),

        summary: "Reported <span class='highlight'>uncontrolled bleeding</span>. Bruise easily, bleed for a long time when cut, develop a rash of pinpoint-sized reddish-purple spots, usually on the lower legs, and sometimes bleed from ...",
        full_text: "",

        score_bm25: 0.1
    }],
}, {
    type: 'other_document',
    facts: [{
        id: 'other-123',
        type: 'other_document',
        date_time: new Date(),

        summary: "At diagnosis, <span class='highlight'>marrow area</span> infiltrated by <span class='highlight'>myeloma</span> correlated negatively with hemoglobin, erythrocytes, and marrow erythroid cells. After successful chemotherapy ...",
        full_text: "",

        code: "203.01",
        code_system: 'ICD-9-CM',

        score_bm25: 0.1
    }]
}];