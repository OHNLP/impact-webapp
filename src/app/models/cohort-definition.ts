export interface CohortDefinition {
  // for node it self
  node_id: string;
  node_type: NodeType;

  // basic information for reading
  title: string;
  description: string;

  // the condition information
  entity?: {
    type: EntityType;
    definitionComponents: ValueDefinition[]
  };

  // other
  value_type?: BooleanOperationType | EntityType;
  value?: string;
  children?: CohortDefinition[];
}

export interface ValueDefinition {
  valuePath: ValuePathDef;
  type: BinaryRelationalType;
  values: string[];
}

/*
 * declare all enums using NAME = "NAME" to facilitate jackson parsing in middleware. This necessitates a display
 * name map as well
 */
export enum NodeType {
  BOOLEAN = "BOOLEAN",
  RELATIONAL = "RELATIONAL",
  ENTITY = "ENTITY",
  CATEGORY = 'CATEGORY'
}

export const NodeTypeToDisplayNameMap: Record<NodeType, string> = {
  BOOLEAN: "Logical",
  RELATIONAL: "Relational",
  ENTITY: "Clinical Entity",
  CATEGORY: "Category"
}


export enum BooleanOperationType {
  AND = "AND",
  MIN_OR = "MIN_OR",
  NOT = "NOT"
}

export const BooleanOperationTypeToDisplayNameMap: Record<BooleanOperationType, string> = {
  AND: "Match All Of",
  MIN_OR: "Match at Minimum n Of",
  NOT: "Match None Of"
}

export enum EntityType {
  DIAGNOSIS = "DIAGNOSIS",
  DRUG = "DRUG",
  PROCEDURE = "PROCEDURE",
  LABORATORY = "LABORATORY",
  PERSON = 'PERSON',
  CONDITION = 'CONDITION',
  MEDICATION = 'MEDICATION',
  OBSERVATION = 'OBSERVATION'
}

export const EntityTypeToDisplayNameMap: Record<EntityType, string> = {
  DIAGNOSIS: "Diagnosis",
  DRUG: "Drug",
  PROCEDURE: "Procedure",
  LABORATORY: "Lab Test",
  PERSON: 'PERSON',
  CONDITION: 'CONDITION',
  MEDICATION: 'MEDICATION',
  OBSERVATION: 'OBSERVATION'
}

export enum BinaryRelationalType {
  LT = "LT",
  LTE = "LTE",
  GT = "GT",
  GTE = "GTE",
  EQ = "EQ",
  RANGE = 'RANGE',
  IN = "IN"
}

export enum ValueType {
  CONCEPT = "CONCEPT",
  NUMERIC = "NUMERIC",
  VALUE_LIST = "VALUE_LIST"
}

export enum CriteriaMatchState {
  CONFIRMED_MATCH,
  ALGORITHMIC_MATCH,
  ALGORITHMIC_MATCH_NLP,
  ALGORITHMIC_MISMATCH_NLP,
  ALGORITHMIC_MISMATCH,
  CONFIRMED_MISMATCH,
  UNJUDGED,
  UNKNOWN
}

export enum ValuePathDef {
  PERSON_ID = 'PERSON_ID',
  PERSON_GENDER = 'PERSON_GENDER',
  PERSON_DOB = 'PERSON_DOB',
  CONDITION_CODE = 'CONDITION_CODE', 
  PROCEDURE_CODE = 'PROCEDURE_CODE', 
  MEDICATION_CODE = 'MEDICATION_CODE', 
  OBSERVATION_CODE = 'OBSERVATION_CODE', 
  OBSERVATION_VALUE = 'OBSERVATION_VALUE', 
}