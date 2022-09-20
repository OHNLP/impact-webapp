import { Fact } from "../models/clinical-data";

export const EXAMPLE_FACTS: Fact[] = [{
    id: '459f651d-12be-47db-b9a2-40bb1b001308',
    type: 'lab_result',
    date_time: new Date(),
  
    summary: "Multiple myeloma, in remission",
  
    code: "203.01",
    code_system: 'ICD-9-CM',
  
    score: 0.1
  }, {
    id: '46ef95ea-4a1b-467d-b638-a735968ab44e',
    type: 'lab_result',
    date_time: new Date(),
  
    summary: "WBCs(b/L)=8.00(3.5-10.5); Neutrophils (%) = 62(40-70); <span class='highlight'>Platelets</span> (b/L) = 262 (150-450); Hb (g/dL) = 11.7 (13-17); Monocytes (%) = 10 (2-8); Lymphocytes (%) = 28 (25-45); RBCs (t/L) 3.8...",
  
    code: "203.01",
    code_system: 'ICD-9-CM',
  
    score: 0.1
  },
  {
    id: '95365803-9cf8-4948-908a-9b8ffbd85e5c',
    type: 'clinical_note',
    date_time: new Date(),
  
    summary: "<span class='highlight'>Bone marrow </span>is a spongy, soft tissue that resembles a jelly or jam that you would spread on toast. It comes in two colors, red and yellow. <span class='highlight'>Bone marrow </span>files the cavities of your bone ...n",
    full_text: "",
  
    score: 0.1
  }, {
    id: '95365803-9cf8-4948-908a-9b8ffbd85e5d',
    type: 'clinical_note',
    date_time: new Date(),
  
    summary: "Reported <span class='highlight'>uncontrolled bleeding</span>. Bruise easily, bleed for a long time when cut, develop a rash of pinpoint-sized reddish-purple spots, usually on the lower legs, and sometimes bleed from ...",
    full_text: "",
  
    score: 0.1
  },
  {
    id: '3791313e-04c8-4227-bf56-1d1b4ee22cc7',
    type: 'other_document',
    date_time: new Date(),
  
    summary: "At diagnosis, <span class='highlight'>marrow area</span> infiltrated by <span class='highlight'>myeloma</span> correlated negatively with hemoglobin, erythrocytes, and marrow erythroid cells. After successful chemotherapy ...",
    full_text: "",
  
    code: "203.01",
    code_system: 'ICD-9-CM',
  
    score: 0.1
  },
  {
    id: '3791313a-04c8-4227-bf56-1d1b4ee22cc7',
    type: 'other_document',
    date_time: new Date(),
  
    summary: "At diagnosis, <span class='highlight'>marrow area</span> infiltrated by <span class='highlight'>myeloma</span> correlated negatively with hemoglobin, erythrocytes, and marrow erythroid cells. After successful chemotherapy ...",
    full_text: "",
  
    code: "203.01",
    code_system: 'ICD-9-CM',
  
    score: 0.1
  },
  {
    id: 'a791313a-04c8-4227-bf56-1d1b4ee22cc7',
    type: 'other_document',
    date_time: new Date(),
  
    summary: "At diagnosis, <span class='highlight'>marrow area</span> infiltrated by <span class='highlight'>myeloma</span> correlated negatively with hemoglobin, erythrocytes, and marrow erythroid cells. After successful chemotherapy ...",
    full_text: "",
  
    code: "203.01",
    code_system: 'ICD-9-CM',
  
    score: 0.1
  },
  {
    id: '5791313a-04c8-4227-bf56-1d1b4ee22cc7',
    type: 'other_document',
    date_time: new Date(),
  
    summary: "At diagnosis, <span class='highlight'>marrow area</span> infiltrated by <span class='highlight'>myeloma</span> correlated negatively with hemoglobin, erythrocytes, and marrow erythroid cells. After successful chemotherapy ...",
    full_text: "",
  
    code: "203.01",
    code_system: 'ICD-9-CM',
  
    score: 0.1
  },
  {
    id: '6791313a-04c8-4227-bf56-1d1b4ee22cc7',
    type: 'other_document',
    date_time: new Date(),
  
    summary: "At diagnosis, <span class='highlight'>marrow area</span> infiltrated by <span class='highlight'>myeloma</span> correlated negatively with hemoglobin, erythrocytes, and marrow erythroid cells. After successful chemotherapy ...",
    full_text: "",
  
    code: "203.01",
    code_system: 'ICD-9-CM',
  
    score: 0.1
  },
  {
    id: '7791313a-04c8-4227-bf56-1d1b4ee22cc7',
    type: 'other_document',
    date_time: new Date(),
  
    summary: "At diagnosis, <span class='highlight'>marrow area</span> infiltrated by <span class='highlight'>myeloma</span> correlated negatively with hemoglobin, erythrocytes, and marrow erythroid cells. After successful chemotherapy ...",
    full_text: "",
  
    code: "203.01",
    code_system: 'ICD-9-CM',
  
    score: 0.1
  },
  {
    id: '8791313a-04c8-4227-bf56-1d1b4ee22cc7',
    type: 'other_document',
    date_time: new Date(),
  
    summary: "At diagnosis, <span class='highlight'>marrow area</span> infiltrated by <span class='highlight'>myeloma</span> correlated negatively with hemoglobin, erythrocytes, and marrow erythroid cells. After successful chemotherapy ...",
    full_text: "",
  
    code: "203.01",
    code_system: 'ICD-9-CM',
  
    score: 0.1
  },
  {
    id: '9791313a-04c8-4227-bf56-1d1b4ee22cc7',
    type: 'other_document',
    date_time: new Date(),
  
    summary: "At diagnosis, <span class='highlight'>marrow area</span> infiltrated by <span class='highlight'>myeloma</span> correlated negatively with hemoglobin, erythrocytes, and marrow erythroid cells. After successful chemotherapy ...",
    full_text: "",
  
    code: "203.01",
    code_system: 'ICD-9-CM',
  
    score: 0.1
  }
  ];