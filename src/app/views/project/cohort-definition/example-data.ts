/** Example file/folder data. */
export const example_cohort_definition = [
  {
    node_type: 'boolean',
    op_type: 'AND',
    op_criteria: 'root',
    children: [
      {node_type: 'file', op_type: 'Diagnosis', op_criteria: 'Hypertension'},
      {
        node_type: 'boolean',
        op_type: 'MIN_OR',
        op_criteria: '2',
        children: [
          {
            node_type: 'boolean',
            op_type: 'NOT',
            op_criteria: '2',
            children: [
              {node_type: 'file', op_type: 'Diagnosis', op_criteria: 'ASCVD'},
            ]
          },
          {node_type: 'file', op_type: 'Drug', op_criteria: 'Lipitor'},
          {node_type: 'file', op_type: 'Diagnosis', op_criteria: 'Hypertension'},
        ]
      },
    ]
  }
];
