import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplicationStatusService} from "../../../../services/application-status.service";
import {MatTree, MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from "@angular/material/tree";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {
  BooleanOperationType,
  CohortDefinition, CriteriaMatchState, EntityType,
  EntityTypeToDisplayNameMap,
  NodeType
} from "../../../../models/cohort-definition";
import {MiddlewareAdapterService} from "../../../../services/middleware-adapter.service";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";


/**
 * Flattened tree node. We use FlatTreeNode here instead of nested so we can manually pad (needed for stylistic purposes
 * due to individual tree items being nav links and nested trees padding by groups leading to sub-links not filling up
 * the whole width of the tree)
 */
export interface FlatTreeNode {
  node_id: string;
  node_type: NodeType;
  value_type?: BooleanOperationType | EntityType;
  match_state?: CriteriaMatchState | undefined;
  value?: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-patient-review-definition-selection-wrapper',
  templateUrl: './patient-review-definition-selection-wrapper.component.html',
  styleUrls: ['./patient-review-definition-selection-wrapper.component.css']
})
export class PatientReviewDefinitionSelectionWrapperComponent implements OnInit {
  /** Reference to the Tree itself */
  @ViewChild('tree') tree!: MatTree<any>;

  rootMatchState: CriteriaMatchState | undefined;

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<CohortDefinition, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<CohortDefinition, FlatTreeNode>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public appstatus: ApplicationStatusService,
              middleware: MiddlewareAdapterService
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);
    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    let root = middleware.rest.getCohortCriteria(this.appstatus.activeProject!.uid)  // TODO this should be based on patient
    let children = root.children
    if (!children) {
      children = []
    }
    this.dataSource.data = children;
    this.treeControl.expandAll()
  }


  /** Transform the data to something the tree can read. */
  transformer(node: CohortDefinition, level: number): FlatTreeNode {
    return {
      node_id: node.node_id,
      node_type: node.node_type,
      value: node.value,
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

  get nodeType(): typeof NodeType {
    return NodeType
  }

  /** Get the children for the node. */
  getChildren(node: CohortDefinition): CohortDefinition[] | null | undefined {
    return node.children;
  }

  hasChild = (_: number, node: CohortDefinition) => node.node_type === NodeType.BOOLEAN;

  getNodeName(node: CohortDefinition): string {
    if (node.node_type === NodeType.BOOLEAN) {
      if (node.value_type === BooleanOperationType.MIN_OR) {
        return 'At least ' + node.value + ' of: '
      } else if (node.value_type === BooleanOperationType.NOT) {
        return 'None of: '
      } else {
        return 'All of: '
      }
    } else if (node.node_type === NodeType.ENTITY) {
      return EntityTypeToDisplayNameMap[(<EntityType>node.value_type)] + ": " + node.value
    } else {
      return node.value_type + ": " + node.value
    }
  }

  range(start: number, end: number): Array<number> {
    return [...Array(1 + end - start).keys()].map(v => start + v)
  }

  toggleSelect(node_id: string): void {
    if (this.appstatus.selectedPatientCriteriaFilter === node_id) {
      this.appstatus.selectedPatientCriteriaFilter = undefined
    } else {
      this.appstatus.selectedPatientCriteriaFilter = node_id
    }
  }

  classForMatchState(match_status: CriteriaMatchState | undefined): string {
    switch (match_status) {
      case CriteriaMatchState.CONFIRMED_MATCH:
        return "confirmed-match";
      case CriteriaMatchState.ALGORITHMIC_MATCH:
        return "algorithmic-match";
      case CriteriaMatchState.ALGORITHMIC_MATCH_NLP:
        return "algorithmic-match-nlp";
      case CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP:
        return "algorithmic-mismatch-nlp";
      case CriteriaMatchState.ALGORITHMIC_MISMATCH:
        return "algorithmic-mismatch";
      case CriteriaMatchState.CONFIRMED_MISMATCH:
        return "confirmed-mismatch";
      default:
        return "undetermined-match"
    }
  }

  ngOnInit(): void {
  }

  getPatientMatchStatusDisplay(matchState: CriteriaMatchState | undefined) : string {
    switch (matchState) {
      case CriteriaMatchState.CONFIRMED_MATCH:
        return "check";
      case CriteriaMatchState.ALGORITHMIC_MATCH:
        return "check";
      case CriteriaMatchState.ALGORITHMIC_MATCH_NLP:
        return "check";
      case CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP:
        return "close";
      case CriteriaMatchState.ALGORITHMIC_MISMATCH:
        return "close";
      case CriteriaMatchState.CONFIRMED_MISMATCH:
        return "close";
      default:
        return "question_mark"
    }
  }
}
