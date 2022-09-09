/** Example file/folder data. */
import {
  BooleanOperationType,
  CohortDefinition,
  CriteriaMatchState,
  EntityType,
  NodeType
} from "../../../models/cohort-definition";

export const example_cohort_definition: CohortDefinition =
{
  node_id: 'root',
  node_type: NodeType.CATEGORY,
  title: 'root',
  description: 'root',
  value_type: BooleanOperationType.AND,
  value: '',
  match_state: CriteriaMatchState.ALGORITHMIC_MATCH,
  children: [
    {
      node_id: 'inclusion_criteria',
      node_type: NodeType.CATEGORY,
      title: 'Inclusion Criteria',
      description: 'All responses must be “Yes” unless specified as “NA”',
      value_type: BooleanOperationType.AND,
      value: 'inclusion_criteria',
      match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP,
      children: [
        {
          node_id: 'ic-1',
          node_type: NodeType.ENTITY,
          title: 'Age >= 18 years',
          description: 'The age of the participant must be greater than 18.',
          value_type: EntityType.DIAGNOSIS,
          value: 'Hypertension',
          match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH
        },
        {
          node_id: 'ic-2',
          node_type: NodeType.ENTITY,
          title: 'Diagnosis of RRMM w/ progressive disease',
          description: 'Diagnosis of RRMM with progressive disease at study entry as per the International Myeloma Working Group (IMWG) uniform criteria.',
          value_type: EntityType.PROCEDURE,
          value: 'Coronary Artery Bypass',
          match_state: CriteriaMatchState.CONFIRMED_MISMATCH
        },
        {
          node_id: 'ic-3',
          node_type: NodeType.BOOLEAN,
          title: 'Measurable disease by IMWG criteria in Section 11.0',
          description: 'Measurable disease by IMWG criteria as defined by at least one of the following in Section 11.0',
          value_type: BooleanOperationType.MIN_OR,
          value: '1',
          match_state: CriteriaMatchState.ALGORITHMIC_MATCH,
          children: [
            {
              node_id: 'ic-3-1',
              node_type: NodeType.BOOLEAN,
              title: 'a. Serum M-protein >= 0.5 g/dL',
              description: 'a. Serum M-protein >= 0.5 g/dL',
              value_type: EntityType.DIAGNOSIS,
              value: 'test',
              match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP
            },
            {
              node_id: 'ic-3-2',
              node_type: NodeType.BOOLEAN,
              title: 'b. Urine M-protein >= 200 mg in 24-hour collection',
              description: 'b. Urine M-protein >= 200 mg in 24-hour collection',
              value_type: BooleanOperationType.NOT,
              value: '',
              match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP
            },
            {
              node_id: 'ic-3-3',
              node_type: NodeType.BOOLEAN,
              title: 'c. Serum Free Light Chain level >= 10 mg/dL',
              description: 'c. Serum Free Light Chain level >= 10 mg/dL',
              value_type: BooleanOperationType.NOT,
              value: '',
              match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP
            },
            {
              node_id: 'ic-3-4',
              node_type: NodeType.BOOLEAN,
              title: 'd. Measurable plasmacytoma',
              description: 'd. Measurable plasmacytoma (at least one lesion that has a single diameter of >= 2cm on PET scan)',
              value_type: BooleanOperationType.NOT,
              value: '',
              match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP
            },
            {
              node_id: 'ic-3-5',
              node_type: NodeType.BOOLEAN,
              title: 'e. Bone marrow plasma cell >= 30%',
              description: 'e. Bone marrow plasma cell >= 30%',
              value_type: BooleanOperationType.NOT,
              value: '',
              match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP
            }
          ]
        },
        {
          node_id: 'ic-4',
          node_type: NodeType.BOOLEAN,
          title: 'Prior treatment',
          description: '',
          value_type: BooleanOperationType.AND,
          value: '2',
          match_state: CriteriaMatchState.ALGORITHMIC_MATCH,
          children: [
            {
              node_id: 'ic-4-1',
              node_type: NodeType.ENTITY,
              title: 'Arm A: at least 3 prior lines of therapy',
              description: 'At least one of the following must be true',
              value_type: BooleanOperationType.MIN_OR,
              value: '1',
              match_state: CriteriaMatchState.ALGORITHMIC_MATCH_NLP,
              children: [
                {
                  node_id: 'ic-4-1-1',
                  node_type: NodeType.BOOLEAN,
                  title: '(1) Previously at least 3 prior lines of therapy',
                  description: '(1) Subjects must have been previously treated with at least 3 prior lines of therapy, including a proteasome inhibitor and an TMiD.',
                  value_type: EntityType.DIAGNOSIS,
                  value: 'theray',
                  match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP
                },
                {
                  node_id: 'ic-4-1-2',
                  node_type: NodeType.BOOLEAN,
                  title: '(2) Subjects who are refractory to carfilzomib and/or po...',
                  description: 'Subjects who are refractory to carfilzomib and/or pomalidomide may enroll in Am, A using the quad,uplet regimen, SKPd, provided KPd triplet is not the most recent line of prior therapy and that they have been previously treated with at least 3 prior lines of therapy, including a proteasome inhibitor and an IMiD.". Carfilzomib/Pomalidomide refractory status is defined by the IMWG criteria: disease that is nonresponsive (SD or PD) while on therapy, or progresses within 60 days of last therapy in patients who have achieved minimal response (MR) or better at some point previously before then progressing in their disease course.',
                  value_type: EntityType.DIAGNOSIS,
                  value: 'theray',
                  match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP
                }
              ]
            },
            {
              node_id: 'ic-4-2',
              node_type: NodeType.ENTITY,
              title: 'Arm B: up to 2 prior lines of therapy',
              description: 'Subjects must have progressive disease and been exposed to up to 2 prior lines of therapy, at least one of which includes both a oroteasome inhibitor and lenalidomide.',
              value_type: EntityType.DIAGNOSIS,
              value: 'TKI Test',
              match_state: CriteriaMatchState.ALGORITHMIC_MATCH_NLP
            },
          ]
        },
        {
          node_id: 'ic-5',
          node_type: NodeType.BOOLEAN,
          title: 'Un-transfused Platelet count >100,000 uL (w/o P.T for >14d)',
          description: 'Un-transfused Platelet count >= 100,000 uL (without platelet transfusion for >=14 days) for SKPd and >= 100,000 (without platelet transfusion for >= 7 days) for SPd is permitted. Additionally, for both Arms A and B platelet count of >= 75,000 uL is permitted if thrombocytopenia is deemed by the investigator to be secondary to severe bone marrow infiltration (>=50%) by myeloma as determined. \nIs thrombocytopenia is deemed by the investigator to be secondary to severe bone marrow infiltration (>=50%) by myeloma as determined?',
          value_type: BooleanOperationType.MIN_OR,
          value: '1',
          match_state: CriteriaMatchState.ALGORITHMIC_MATCH,
          children: [
            {
              node_id: 'ic-5-1',
              node_type: NodeType.ENTITY,
              title: 'Yes. Platelet count >= 75,000?',
              description: '',
              value_type: EntityType.DRUG,
              value: 'Platelet',
              match_state: CriteriaMatchState.ALGORITHMIC_MATCH_NLP
            },
            {
              node_id: 'ic-5-2',
              node_type: NodeType.BOOLEAN,
              title: 'No. Platelet count >= 100,000?',
              description: '',
              value_type: EntityType.DRUG,
              value: 'Platelet',
              match_state: CriteriaMatchState.ALGORITHMIC_MATCH_NLP,
            }
          ]
        }
      ]
    },
    {
      node_id: 'exclusion_criteria',
      node_type: NodeType.CATEGORY,
      title: 'Exclusion Criteria',
      description: 'All responses must be “No”',
      value_type: BooleanOperationType.AND,
      value: 'exclusion_criteria',
      match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP,
      children: [
        {
          node_id: 'ec-1',
          node_type: NodeType.ENTITY,
          title: 'History of myocardial infraction <= 6 month',
          description: 'History of myocardial infraction <= 6 month',
          value_type: EntityType.PROCEDURE,
          value: 'myocardial',
          match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP,
        },
        {
          node_id: 'ec-2',
          node_type: NodeType.ENTITY,
          title: 'Failure to recover from acute, reversible effects of prior therapy',
          description: 'Failure to recover from acute, reversible effects of prior therapy',
          value_type: EntityType.DIAGNOSIS,
          value: 'myocardial',
          match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP,
        }
      ]
    },
    {
      node_id: 'registration_check',
      node_type: NodeType.CATEGORY,
      title: 'Registration Check/Other Category',
      description: 'All responses must be “Yes”',
      value_type: BooleanOperationType.AND,
      value: 'registration_check',
      match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP,
      children: [
        {
          node_id: 'rc-1',
          node_type: NodeType.ENTITY,
          title: 'Consent form signed and dated',
          description: 'Consent form signed and dated',
          value_type: EntityType.PROCEDURE,
          value: 'myocardial',
          match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP,
        },
        {
          node_id: 'rc-2',
          node_type: NodeType.ENTITY,
          title: 'Existence of a signed authorization for use and disclosure',
          description: 'Existence of a signed authorization for use and disclosure',
          value_type: EntityType.DIAGNOSIS,
          value: 'myocardial',
          match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP,
        },
        {
          node_id: 'rc-3',
          node_type: NodeType.ENTITY,
          title: 'Uncontrolled intercurrent non-cardiac illness at least one',
          description: 'Uncontrolled intercurrent non-cardiac illness at least one',
          value_type: EntityType.DIAGNOSIS,
          value: 'myocardial',
          match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP,
        },
        {
          node_id: 'rc-4',
          node_type: NodeType.ENTITY,
          title: 'Study drug is available on site',
          description: 'Study drug is available on site',
          value_type: EntityType.DRUG,
          value: 'Carfilzomib Bortezomib ixazomib',
          match_state: CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP,
        }
      ]
    }
  ]
};