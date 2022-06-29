import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {example_cohort_definition} from './example-data';
import {BooleanOperationType, CohortDefinition, EntityType, NodeType} from "../../../models/cohort-definition";
import {
  CohortDefinitionItemEditorModalComponent
} from "./cohort-definition-item-editor-modal/cohort-definition-item-editor-modal.component";
import {MatDialog} from "@angular/material/dialog";


/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  node_type: NodeType;
  op_type: BooleanOperationType | EntityType;
  op_criteria?: string;
  level: number;
  expandable: boolean;
}

export const base_empty_criteria = [
  {
    node_type: NodeType.BOOLEAN,
    op_type: BooleanOperationType.AND,
    op_criteria: 'root',
    children: []
  }
]

@Component({
  selector: 'app-cohort-definition',
  templateUrl: './cohort-definition.component.html',
  styleUrls: ['./cohort-definition.component.css']
})
export class CohortDefinitionComponent {

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<CohortDefinition, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<CohortDefinition, FlatTreeNode>;

  /** Reference to the Editor Modal for cohort definition items*/
  dialogRef: any;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = example_cohort_definition; // TODO replace with service call
    this.treeControl.expandAll()
  }

  /** Transform the data to something the tree can read. */
  transformer(node: CohortDefinition, level: number): FlatTreeNode {
    return {
      node_type: node.node_type,
      op_type: node.op_type,
      op_criteria: node.op_criteria,
      level,
      expandable: node.node_type === NodeType.BOOLEAN
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
  getChildren(node: CohortDefinition): CohortDefinition[] | null | undefined {
    return node.children;
  }

  get nodeType(): typeof NodeType {
    return NodeType
  }

  getNodeName(node: FlatTreeNode): string {
    if (node.node_type === NodeType.BOOLEAN) {
      if (node.op_type === BooleanOperationType.MIN_OR) {
        return 'At least ' + node.op_criteria + ' of: '
      } else if (node.op_type === BooleanOperationType.NOT) {
        return 'None of: '
      } else {
        return 'All of: '
      }
    } else {
      return EntityType[node.op_type] + ": " + node.op_criteria
    }
  }

  resetTreeEmpty() {
    this.dataSource.data = base_empty_criteria
    this.treeControl.expandAll()
  }
}
