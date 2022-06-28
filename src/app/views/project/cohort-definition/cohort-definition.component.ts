import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { example_cohort_definition } from './example-data';

/** File node data with possible child nodes. */
export interface QueryNode {
  node_type: string;
  op_type: string;
  op_criteria: string;
  children?: QueryNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  node_type: string;
  op_type: string;
  op_criteria: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-cohort-definition',
  templateUrl: './cohort-definition.component.html',
  styleUrls: ['./cohort-definition.component.css']
})
export class CohortDefinitionComponent {

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<QueryNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<QueryNode, FlatTreeNode>;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = example_cohort_definition;
  }

  /** Transform the data to something the tree can read. */
  transformer(node: QueryNode, level: number): FlatTreeNode {
    return {
      node_type: node.node_type,
      op_type: node.op_type,
      op_criteria: node.op_criteria,
      level,
      expandable: node.node_type === 'boolean'
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode): number {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: QueryNode): QueryNode[] | null | undefined {
    return node.children;
  }

  getNodeNameForBooleanOp(node: FlatTreeNode): string {
    if (node.op_type === 'MIN_OR') {
      return 'At least ' + node.op_criteria + ' of: '
    } else if (node.op_type === 'NOT') {
      return 'None of: '
    } else {
      return 'All of: '
    }
  }
}

export enum ItemTypes {
  Diagnosis,
  Drug,
  Procedure
}
