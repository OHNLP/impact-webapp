export interface CohortDefinition {
  node_id: string;
  node_type: NodeType;
  op_type: BooleanOperationType | EntityType;
  op_criteria: string;
  children?: CohortDefinition[];
}

export enum NodeType {
  BOOLEAN = "Logical",
  RELATIONAL = "Relational",
  ENTITY = "Entity"
}

export enum BooleanOperationType {
  AND = "Must Have All Of",
  MIN_OR = "Must Have at Minimum x Occurrences Of",
  NOT = "Must Not Have"
}

export enum EntityType {
  DIAGNOSIS = "Diagnosis",
  DRUG = "Drug",
  PROCEDURE = "Procedure"
}
