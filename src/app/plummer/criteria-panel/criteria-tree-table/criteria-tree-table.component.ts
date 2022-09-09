import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BooleanOperationType, CohortDefinition, CriteriaMatchState, EntityType, NodeType } from 'src/app/models/cohort-definition';
import { DETERMINATION_VALUE } from 'src/app/models/determination';
import { ApplicationStatusService } from 'src/app/services/application-status.service';
import { MiddlewareAdapterService } from 'src/app/services/middleware-adapter.service';

/**
 * Flattened tree node. We use FlatTreeNode here instead of nested so we can manually pad (needed for stylistic purposes
 * due to individual tree items being nav links and nested trees padding by groups leading to sub-links not filling up
 * the whole width of the tree)
 */
 export interface FlatTreeNode {
  // node_id: string;
  // node_type: NodeType;
  // value_type: BooleanOperationType | EntityType;
  // match_state: CriteriaMatchState | undefined;
  // title: string;
  // description: string;

  // value?: string;

  criteria: CohortDefinition;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-criteria-tree-table',
  templateUrl: './criteria-tree-table.component.html',
  styleUrls: ['./criteria-tree-table.component.css']
})
export class CriteriaTreeTableComponent implements OnInit {
  @ViewChild('tree') tree!: MatTree<any>;
  @Input() criteria?: CohortDefinition 

  /** Transform the data to something the tree can read. */
  transformer(node: CohortDefinition, level: number): FlatTreeNode {
    return {
      // node_id: node.node_id,
      // node_type: node.node_type,
      // value_type: node.value_type,
      // value: node.value,
      // match_state: node.match_state,
      // title: node.title,
      // description: node.description,
      criteria: node,
      level: level,
      expandable: !!node.children && node.children.length > 0
      // expandable: node.node_type === NodeType.BOOLEAN || node.node_type === NodeType.CATEGORY
    };
  }
  
  treeControl = new FlatTreeControl<FlatTreeNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(
    this.treeControl, 
    this.treeFlattener
  );

  constructor(
    public appStatus: ApplicationStatusService, 
    public middleware: MiddlewareAdapterService
  ) { 
  };

  hasChild = (_: number, node: FlatTreeNode) => node.expandable;

  ngOnInit(): void {
    // for mat-tree data
    if (this.criteria?.children === undefined) {
      this.dataSource.data = [];
    } else {
      this.dataSource.data = this.criteria.children;
    }
  }

  countDeterminationYes(): number {
    return this.countDetermination(DETERMINATION_VALUE.YES);
  }

  countDeterminationNo(): number {
    return this.countDetermination(DETERMINATION_VALUE.NO);
  }

  countDeterminationNA(): number {
    return this.countDetermination(DETERMINATION_VALUE.NA);
  }

  countDeterminationUNK(): number {
    return this.countDetermination(DETERMINATION_VALUE.UNK);
  }

  countDetermination(dval:DETERMINATION_VALUE): number {
    if (this.criteria?.children === undefined) {
      return 0
    }
    let n = 0;
    for (let i = 0; i < this.criteria.children.length; i++) {
      const criteria = this.criteria.children[i];
      // check determination
      let d = this.appStatus.uwDeterminationDict[criteria.node_id];
      if (d === undefined) {
        // oh .. no data yet
      } else {
        if (d.value === dval) {
          // great!
          n += 1;
        }
      }
    }

    return n;
  }
}
