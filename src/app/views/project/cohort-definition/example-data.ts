/** Example file/folder data. */
import {BooleanOperationType, CohortDefinition, EntityType, NodeType} from "../../../models/cohort-definition";

export const example_cohort_definition: CohortDefinition =
  {
    node_id: 'e959bf98-7c79-4843-8ed8-eb4e088bb4c4',
    node_type: NodeType.BOOLEAN,
    op_type: BooleanOperationType.AND,
    op_criteria: 'root',
    children: [
      {
        node_id: '15dfdbd7-d8bc-45d8-a272-1cbcf63321ee',
        node_type: NodeType.ENTITY,
        op_type: EntityType.DIAGNOSIS,
        op_criteria: 'Hypertension'
      },
      {
        node_id: 'f6186c2f-2a0f-4c98-8cdd-40b114fd92fe',
        node_type: NodeType.BOOLEAN,
        op_type: BooleanOperationType.MIN_OR,
        op_criteria: '2',
        children: [
          {
            node_id: '40600a22-e57e-4ed0-b7f0-71f59eed1dae',
            node_type: NodeType.BOOLEAN,
            op_type: BooleanOperationType.NOT,
            op_criteria: '',
            children: [
              {
                node_id: '55680695-c84c-4eeb-8395-e0088e6af511',
                node_type: NodeType.ENTITY,
                op_type: EntityType.DIAGNOSIS,
                op_criteria: 'ASCVD'
              },
            ]
          },
          {
            node_id: 'd2683471-27ef-4990-adfc-5a0e4f511206',
            node_type: NodeType.ENTITY,
            op_type: EntityType.DRUG,
            op_criteria: 'Lipitor'
          },
          {
            node_id: 'ae1c06dd-9919-47ac-937e-4269e03a4717',
            node_type: NodeType.ENTITY,
            op_type: EntityType.DIAGNOSIS,
            op_criteria: 'Diabetes'
          },
        ]
      },
    ]
  }
;
