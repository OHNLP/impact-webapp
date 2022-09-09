export interface CohortDefinition {
  // for node it self
  node_id: string;
  node_type: NodeType;

  // basic information for reading
  title: string;
  description: string;

  // other
  value_type: BooleanOperationType | EntityType;
  value: string;
  match_state: CriteriaMatchState | undefined;
  children?: CohortDefinition[];
}

export interface ValueDefinition { // TODO implement this instead of using "value" strings
  type: ValueType; // TODO consider renaming ValueType to prevent overlap with value_type in CohortDefinition
  relationalType: BinaryRelationalType
  value: string;
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
  LABORATORY = "LABORATORY"
}

export const EntityTypeToDisplayNameMap: Record<EntityType, string> = {
  DIAGNOSIS: "Diagnosis",
  DRUG: "Drug",
  PROCEDURE: "Procedure",
  LABORATORY: "Lab Test"
}

export enum BinaryRelationalType {
  LT = "LT",
  LTE = "LTE",
  GT = "GT",
  GTE = "GTE",
  EQ = "EQ",
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
  CONFIRMED_MISMATCH
}
