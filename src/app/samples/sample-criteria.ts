import { BinaryRelationalType, BooleanOperationType, CohortDefinition, EntityType, NodeType, ValuePathDef } from "../models/cohort-definition";

export const EXAMPLE_CRITERIA_RRMM_XS: CohortDefinition =
{
  node_id: '45cce24d-65b7-4ab8-b2cd-c16c8d44b722',
  node_type: NodeType.BOOLEAN,
  value_type: BooleanOperationType.AND,
  title: 'root',
  description: 'root',
  children: [
    {
      node_id: 'c4b9f789-2673-4438-b8a4-9260f5695280',
      node_type: NodeType.BOOLEAN,
      value_type: BooleanOperationType.AND,
      title: 'Inclusion Criteria',
      description: 'All responses must be “Yes” unless specified as “NA”',
      children: [
        {
          node_id: 'd8151c93-2bf6-4f1b-98c8-ef8809da5bb6',
          node_type: NodeType.ENTITY,
          title: 'Age >= 18 years',
          description: 'The age of the participant must be greater than 18.',
          entity: {
            type: EntityType.PERSON,
            definitionComponents: [{
              valuePath: ValuePathDef.CONDITION_CODE,
              type: BinaryRelationalType.LTE,
              values: ['18']
            }]
          }
        }, 
        {
          node_id: 'd9152c93-2bf6-4f1b-98c8-ef8809da5bb8',
          node_type: NodeType.BOOLEAN,
          value_type: BooleanOperationType.AND,
          title: 'Measurable disease by IMWG criteria',
          description: 'Measurable disease by IMWG criteria as defined by at least one of the following in Section 11.0',
          children: [
            {
              node_id: 'b14d2d45-44f0-4ec6-b621-b5d5c3f7e08d',
              node_type: NodeType.ENTITY,
              title: 'a. Serum M-protein >= 0.5 g/dL',
              description: 'a. Serum M-protein >= 0.5 g/dL',
              entity: {
                type: EntityType.OBSERVATION,
                definitionComponents: [{
                  valuePath: ValuePathDef.OBSERVATION_CODE,
                  type: BinaryRelationalType.EQ,
                  values: ['Serum M-protein']
                }, {
                  valuePath: ValuePathDef.OBSERVATION_VALUE,
                  type: BinaryRelationalType.GTE,
                  values: ['0.5']
                }]
              },
            }, 
            {
              node_id: 'c14d2d45-42f0-4ec6-b621-b5d5c3f7e08d',
              node_type: NodeType.ENTITY,
              title: 'b. Urine M-protein >= 200 mg',
              description: 'Urine M-protein >= 200 mg in 24-hour collection',
              entity: {
                type: EntityType.OBSERVATION,
                definitionComponents: [{
                  valuePath: ValuePathDef.OBSERVATION_CODE,
                  type: BinaryRelationalType.EQ,
                  values: ['Urine M-protein']
                }, {
                  valuePath: ValuePathDef.OBSERVATION_VALUE,
                  type: BinaryRelationalType.GTE,
                  values: ['200']
                }]
              },
            }]
        }, 
        {
          node_id: 'x9152ct3-2bf6-4f1b-98c8-ef8809da5bb8',
          node_type: NodeType.ENTITY,
          title: 'ECOG Performance Status',
          description: 'ECOG Performance Status (PS) 0, 1 or 2 (Appendix I).',
          entity: {
            type: EntityType.OBSERVATION,
            definitionComponents: [{
              valuePath: ValuePathDef.CONDITION_CODE,
              type: BinaryRelationalType.IN,
              values: ['ECOG']
            }]
          }
        }]
    },
    {
      node_id: 'af45810x-fa3d-476b-93e8-d96701b0b8d9',
      node_type: NodeType.BOOLEAN,
      value_type: BooleanOperationType.NOT,
      title: 'Exclusion Criteria',
      description: 'All responses must be “No”',
      children: [
        {
          node_id: '208dbfc2-7a1a-4f63-81fb-594900862730',
          node_type: NodeType.ENTITY,
          title: 'Patients known to be HIV positive',
          description: 'Patients known to be HIV positive and/or currently receiving antiretroviral therapy.',
          entity: {
            type: EntityType.DIAGNOSIS,
            definitionComponents: [{
              valuePath: ValuePathDef.CONDITION_CODE,
              type: BinaryRelationalType.IN,
              values: ['HIV']
            }]
          }
        },
        {
          node_id: '338dbfc2-7a1a-4f63-81fb-594900862730',
          node_type: NodeType.ENTITY,
          title: 'Uncontrolled hypertension or diabetes',
          description: 'Uncontrolled hypertension or uncontrolled diabetes <= 14 days prior to registration.',
          entity: {
            type: EntityType.DIAGNOSIS,
            definitionComponents: [{
              valuePath: ValuePathDef.CONDITION_CODE,
              type: BinaryRelationalType.IN,
              values: ['hypertension', 'diabete']
            }]
          }
        },
        {
          node_id: '438dbfc2-7a1a-4f63-81fb-594900862730',
          node_type: NodeType.ENTITY,
          title: 'Known active hepatitis A, B, or C infection',
          description: 'Known active hepatitis A, B, or C infection; or known to be positive for HCV RNA or HBsAg (HBV surface antigen).',
          entity: {
            type: EntityType.DIAGNOSIS,
            definitionComponents: [{
              valuePath: ValuePathDef.CONDITION_CODE,
              type: BinaryRelationalType.IN,
              values: ['hepatitis', 'HCV', 'HBV', 'HBsAg']
            }]
          }
        }
      ]
    }]
};


export const EXAMPLE_CRITERIA_RRMM_MD: CohortDefinition =
{
  node_id: '45cce24d-65b7-4ab8-b2cd-c16c8d44b722',
  node_type: NodeType.CATEGORY,
  title: 'root',
  description: 'root',
  value_type: BooleanOperationType.AND,
  children: [
    {
      node_id: 'c4b9f789-2673-4438-b8a4-9260f5695280',
      node_type: NodeType.CATEGORY,
      title: 'Inclusion Criteria',
      description: 'All responses must be “Yes” unless specified as “NA”',
      value_type: BooleanOperationType.AND,
      value: 'inclusion_criteria',

      children: [
        {
          node_id: 'd8151c93-2bf6-4f1b-98c8-ef8809da5bb6',
          node_type: NodeType.ENTITY,
          title: 'Age >= 18 years',
          description: 'The age of the participant must be greater than 18.',
          entity: {
            type: EntityType.PERSON,
            definitionComponents: [{
              valuePath: ValuePathDef.CONDITION_CODE,
              type: BinaryRelationalType.LTE,
              values: ['18']
            }]
          },
        },
        {
          node_id: '19a78933-3737-43fa-9b0e-4d9b8b17786c',
          node_type: NodeType.ENTITY,
          title: 'Diagnosis of RRMM w/ progressive disease',
          description: 'Diagnosis of RRMM with progressive disease at study entry as per the International Myeloma Working Group (IMWG) uniform criteria.',
          value_type: EntityType.PROCEDURE,
          value: 'Coronary Artery Bypass',
        },
        {
          node_id: '3f0ec93c-2e94-44dd-b2b3-f2a480d03f1c',
          node_type: NodeType.BOOLEAN,
          title: 'Measurable disease by IMWG criteria in Section 11.0',
          description: 'Measurable disease by IMWG criteria as defined by at least one of the following in Section 11.0',
          value_type: BooleanOperationType.MIN_OR,
          value: '1',
          children: [
            {
              node_id: 'b14d2d45-44f0-4ec6-b621-b5d5c3f7e08d',
              node_type: NodeType.BOOLEAN,
              title: 'a. Serum M-protein >= 0.5 g/dL',
              description: 'a. Serum M-protein >= 0.5 g/dL',
              entity: {
                type: EntityType.OBSERVATION,
                definitionComponents: [{
                  valuePath: ValuePathDef.OBSERVATION_CODE,
                  type: BinaryRelationalType.EQ,
                  values: ['Serum M-protein']
                }, {
                  valuePath: ValuePathDef.OBSERVATION_VALUE,
                  type: BinaryRelationalType.GTE,
                  values: ['0.5']
                }]
              },
            },
            {
              node_id: '6f90641e-cd8d-4cac-a8c3-0699bc6efa93',
              node_type: NodeType.BOOLEAN,
              title: 'b. Urine M-protein >= 200 mg in 24-hour collection',
              description: 'b. Urine M-protein >= 200 mg in 24-hour collection',
              value_type: BooleanOperationType.NOT,
              value: '',
            },
            {
              node_id: '32363253-a123-4094-ab11-efc32e1e1a3b',
              node_type: NodeType.BOOLEAN,
              title: 'c. Serum Free Light Chain level >= 10 mg/dL',
              description: 'c. Serum Free Light Chain level >= 10 mg/dL',
              value_type: BooleanOperationType.NOT,
              value: '',
            },
            {
              node_id: 'bcba0be8-496e-431c-a312-875c69a1b4b3',
              node_type: NodeType.BOOLEAN,
              title: 'd. Measurable plasmacytoma',
              description: 'd. Measurable plasmacytoma (at least one lesion that has a single diameter of >= 2cm on PET scan)',
              value_type: BooleanOperationType.NOT,
              value: '',
            },
            {
              node_id: '132d09ad-9a2d-44db-923e-3c292b6dcaff',
              node_type: NodeType.BOOLEAN,
              title: 'e. Bone marrow plasma cell >= 30%',
              description: 'e. Bone marrow plasma cell >= 30%',
              value_type: BooleanOperationType.NOT,
              value: '',
            }
          ]
        },
        {
          node_id: '426a0682-0289-4c11-9b62-5ad9ca4fadf6',
          node_type: NodeType.BOOLEAN,
          title: 'Prior treatment',
          description: '',
          value_type: BooleanOperationType.AND,
          value: '2',
          children: [
            {
              node_id: 'd23bcf0a-38fb-4c57-ac6c-c3dab5f18c9b',
              node_type: NodeType.ENTITY,
              title: 'Arm A: at least 3 prior lines of therapy',
              description: 'At least one of the following must be true',
              value_type: BooleanOperationType.MIN_OR,
              value: '1',
              children: [
                {
                  node_id: 'ae241cc2-1e4f-498a-9729-a1681682b891',
                  node_type: NodeType.BOOLEAN,
                  title: '(1) Previously at least 3 prior lines of therapy',
                  description: '(1) Subjects must have been previously treated with at least 3 prior lines of therapy, including a proteasome inhibitor and an TMiD.',

                },
                {
                  node_id: 'f7080978-b983-432b-ae5b-9d56e0ff920f',
                  node_type: NodeType.BOOLEAN,
                  title: '(2) Subjects who are refractory to carfilzomib and/or po...',
                  description: 'Subjects who are refractory to carfilzomib and/or pomalidomide may enroll in Am, A using the quad,uplet regimen, SKPd, provided KPd triplet is not the most recent line of prior therapy and that they have been previously treated with at least 3 prior lines of therapy, including a proteasome inhibitor and an IMiD.". Carfilzomib/Pomalidomide refractory status is defined by the IMWG criteria: disease that is nonresponsive (SD or PD) while on therapy, or progresses within 60 days of last therapy in patients who have achieved minimal response (MR) or better at some point previously before then progressing in their disease course.',
                  value_type: EntityType.DIAGNOSIS,
                  value: 'theray',
                }
              ]
            },
            {
              node_id: 'b52c3c30-d6e5-4c6e-9c55-efc2e86ec7f6',
              node_type: NodeType.ENTITY,
              title: 'Arm B: up to 2 prior lines of therapy',
              description: 'Subjects must have progressive disease and been exposed to up to 2 prior lines of therapy, at least one of which includes both a oroteasome inhibitor and lenalidomide.',
              value_type: EntityType.DIAGNOSIS,
              value: 'TKI Test',
            },
          ]
        },
        {
          node_id: '8e936b93-a0bc-427d-b63e-51aa4b2d0925',
          node_type: NodeType.BOOLEAN,
          title: 'Un-transfused Platelet count >100,000 uL (w/o P.T for >14d)',
          description: 'Un-transfused Platelet count >= 100,000 uL (without platelet transfusion for >=14 days) for SKPd and >= 100,000 (without platelet transfusion for >= 7 days) for SPd is permitted. Additionally, for both Arms A and B platelet count of >= 75,000 uL is permitted if thrombocytopenia is deemed by the investigator to be secondary to severe bone marrow infiltration (>=50%) by myeloma as determined. \nIs thrombocytopenia is deemed by the investigator to be secondary to severe bone marrow infiltration (>=50%) by myeloma as determined?',
          value_type: BooleanOperationType.MIN_OR,
          value: '1',
          children: [
            {
              node_id: 'aece5a50-7892-48b1-a8da-bcc3863f6aa7',
              node_type: NodeType.ENTITY,
              title: 'Yes. Platelet count >= 75,000?',
              description: '',
              value_type: EntityType.DRUG,
              value: 'Platelet',
            },
            {
              node_id: '0f2cc2af-8593-4d71-bcbb-d9e7cbbbbb93',
              node_type: NodeType.BOOLEAN,
              title: 'No. Platelet count >= 100,000?',
              description: '',
              value_type: EntityType.DRUG,
              value: 'Platelet',
            }
          ]
        }
      ]
    },
    {
      node_id: 'af45810e-fa3d-476b-93e8-d96701b0b8d9',
      node_type: NodeType.CATEGORY,
      title: 'Exclusion Criteria',
      description: 'All responses must be “No”',
      value_type: BooleanOperationType.NOT,
      value: 'exclusion_criteria',
      children: [
        {
          node_id: '208dbfc2-7a5a-4f63-81fb-594900862730',
          node_type: NodeType.ENTITY,
          title: 'History of myocardial infraction <= 6 month',
          description: 'History of myocardial infraction <= 6 month',
          value_type: EntityType.PROCEDURE,
          value: 'myocardial',
        },
        {
          node_id: '8c99b343-3dfd-417c-8581-27832bcf76e4',
          node_type: NodeType.ENTITY,
          title: 'Failure to recover from acute, reversible effects of prior therapy',
          description: 'Failure to recover from acute, reversible effects of prior therapy',
          value_type: EntityType.DIAGNOSIS,
          value: 'myocardial',
        }
      ]
    },
    {
      node_id: 'fe5ee78f-0133-4e9e-861e-69ef9fd3c0ab',
      node_type: NodeType.CATEGORY,
      title: 'Registration Check/Other Category',
      description: 'All responses must be “Yes”',
      value_type: BooleanOperationType.AND,
      value: 'registration_check',
      children: [
        {
          node_id: '8c1f9c82-e9fa-42b9-84bd-7f5b61f6a3b9',
          node_type: NodeType.ENTITY,
          title: 'Consent form signed and dated',
          description: 'Consent form signed and dated',
          value_type: EntityType.PROCEDURE,
          value: 'myocardial',
        },
        {
          node_id: '076349b4-c112-4d79-a3ac-1fbe45ab1eb4',
          node_type: NodeType.ENTITY,
          title: 'Existence of a signed authorization for use and disclosure',
          description: 'Existence of a signed authorization for use and disclosure',
          value_type: EntityType.DIAGNOSIS,
          value: 'myocardial',
        },
        {
          node_id: 'e9520d8e-8543-4fff-938f-ff1eff89b519',
          node_type: NodeType.ENTITY,
          title: 'Uncontrolled intercurrent non-cardiac illness at least one',
          description: 'Uncontrolled intercurrent non-cardiac illness at least one',
          value_type: EntityType.DIAGNOSIS,
          value: 'myocardial',
        },
        {
          node_id: '77a8366a-e5d0-438f-8717-a2d1325062fe',
          node_type: NodeType.ENTITY,
          title: 'Study drug is available on site',
          description: 'Study drug is available on site',
          value_type: EntityType.DRUG,
          value: 'Carfilzomib Bortezomib ixazomib',
        }
      ]
    }
  ]
};