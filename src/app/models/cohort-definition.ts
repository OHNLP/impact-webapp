export interface CohortDefinition {
  node_type: NodeType;
  op_type: BooleanOperationType | EntityType;
  op_criteria: string;
  children?: CohortDefinition[];
}

export enum NodeType {
  BOOLEAN,
  ENTITY
}

export enum BooleanOperationType {
  AND,
  MIN_OR,
  NOT
}

export enum EntityType {
  Diagnosis,
  Drug,
  Procedure
}
