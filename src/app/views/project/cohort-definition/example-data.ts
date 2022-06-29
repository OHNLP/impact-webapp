/** Example file/folder data. */
import {BooleanOperationType, EntityType, NodeType} from "../../../models/cohort-definition";

export const example_cohort_definition = [
  {
    node_type: NodeType.BOOLEAN,
    op_type: BooleanOperationType.AND,
    op_criteria: 'root',
    children: [
      {node_type: NodeType.ENTITY, op_type: EntityType.Diagnosis, op_criteria: 'Hypertension'},
      {
        node_type: NodeType.BOOLEAN,
        op_type: BooleanOperationType.MIN_OR,
        op_criteria: '2',
        children: [
          {
            node_type: NodeType.BOOLEAN,
            op_type: BooleanOperationType.NOT,
            op_criteria: '',
            children: [
              {node_type: NodeType.ENTITY, op_type: EntityType.Diagnosis, op_criteria: 'ASCVD'},
            ]
          },
          {node_type: NodeType.ENTITY, op_type: EntityType.Drug, op_criteria: 'Lipitor'},
          {node_type: NodeType.ENTITY, op_type: EntityType.Diagnosis, op_criteria: 'Diabetes'},
        ]
      },
    ]
  }
];
