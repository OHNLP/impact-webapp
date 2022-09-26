import {Component, ViewChild} from '@angular/core';
import {MatTree, MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {
  BooleanOperationType,
  CohortDefinition,
  EntityType,
  EntityTypeToDisplayNameMap,
  NodeType
} from "../../../models/cohort-definition";
import {
  CohortDefinitionItemEditorModalComponent
} from "./cohort-definition-item-editor-modal/cohort-definition-item-editor-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ApplicationStatusService} from "../../../services/application-status.service";
import {MiddlewareAdapterService} from "../../../services/middleware-adapter.service";
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

export const base_empty_criteria = [
  {
    node_id: crypto.randomUUID(),
    node_type: NodeType.BOOLEAN,
    title: '',
    description: '',
    value_type: BooleanOperationType.AND,
    value: 'root',
    children: [],
    match_state: undefined
  }
]

@Component({
  selector: 'app-cohort-definition',
  templateUrl: './cohort-definition.component.html',
  styleUrls: ['./cohort-definition.component.css']
})
export class CohortDefinitionComponent {
  /** Reference to the Tree itself */
  @ViewChild('tree') tree!: MatTree<any>;

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: NestedTreeControl<CohortDefinition, CohortDefinition>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeNestedDataSource<CohortDefinition>;

  /** The unmodified tree for comparison purposes to determine if changes need to be saved */
  unmodifiedTree!: CohortDefinition;

  /** The tree in it's currently possibly modified state that is sync'ed to end-user display */
  workingTree!: CohortDefinition;

  // for json editor
  public editorOptions: JsonEditorOptions;
  @ViewChild("editor") editor: JsonEditorComponent | undefined;

  constructor(
    public appStatus: ApplicationStatusService,
    public middleware: MiddlewareAdapterService,
    public dialog: MatDialog
  ) {
    if (appStatus.activeProject) {
      // this.unmodifiedTree = 
      middleware.rest.getCohortCriteria(appStatus.activeProject?.uid).subscribe(criteria => this.unmodifiedTree = criteria);
      // this.workingTree = 
      middleware.rest.getCohortCriteria(appStatus.activeProject?.uid).subscribe(
        criteria => this.workingTree = criteria
      );
    } else {
      throw new Error("Cohort definition attempted without active project")
    }
    this.treeControl = new NestedTreeControl<CohortDefinition>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<CohortDefinition>();
    this.dataSource.data = [this.workingTree];
    this.treeControl.dataNodes = this.dataSource.data
    this.treeControl.expandAll()

    // init the json editor
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
  }


  /** Get the children for the node. */
  getChildren(node: CohortDefinition): CohortDefinition[] | null | undefined {
    return node.children;
  }

  get nodeType(): typeof NodeType {
    return NodeType
  }

  hasChild = (_: number, node: CohortDefinition) => node.node_type === NodeType.BOOLEAN;

  getNodeName(node: CohortDefinition): string {
    if (node.node_type === NodeType.BOOLEAN) {
      if (node.value_type === BooleanOperationType.MIN_OR) {
        return 'At least one of: ' + node.title;
      } else if (node.value_type === BooleanOperationType.NOT) {
        return 'None of: ' + node.title;
      } else {
        return 'All of: ' + node.title;
      }
    } else if (node.node_type === NodeType.ENTITY) {
      return EntityTypeToDisplayNameMap[(<EntityType>node.entity?.type)] + ": " + 
        node.entity?.definitionComponents[0].values[0];
    } else {
      return node.title;
    }
  }

  toggleEditor(): void {
    this.appStatus.uwCriteriaUseEditorMode = !this.appStatus.uwCriteriaUseEditorMode;
  }

  onChangeJSONEditor(event:any): void {
    // this.appStatus.uwCriteria = this.editor.get() as unknown as CohortDefinition;
  }

  resetTreeEmpty(): void {
    this.dataSource.data = base_empty_criteria
    this.treeControl.dataNodes = this.dataSource.data
    this.treeControl.expandAll()
  }

  newNode(): CohortDefinition {
    return {
      node_id: crypto.randomUUID(),
      node_type: NodeType.BOOLEAN,
      title: '',
      description: '',
      value_type: BooleanOperationType.MIN_OR,
      value: '1',
      children: []
    }
  }

  openEditorDialog(node: CohortDefinition, parent?: CohortDefinition): void {
    const dialogRef = this.dialog.open(CohortDefinitionItemEditorModalComponent, {
      width: '80%',
      data: {
        node_id: node.node_id,
        node_type: node.node_type,
        value_type: node.value_type,
        value: node.value,
        children: node.children
      }
    });

    dialogRef.afterClosed().subscribe((result: CohortDefinition) => {
      console.log('The dialog was closed');
      if (!result) {
        return
      }
      console.log("Committing changes")
      if (parent) {
        console.log('Adding new node to parent node ' + parent.node_id)
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(result)
      } else {
        console.log('Editing existing node ' + node.node_id)
        node.node_type = result.node_type
        node.value_type = result.value_type
        node.value = result.value
        node.children = result.children
      }
      const data = this.dataSource.data;
      this.dataSource.data = [];
      this.dataSource.data = data;
    });
  }

  public findNodeByNodeId(node_id: string): CohortDefinition | undefined {
    return this.findNodeByNodeIdRecurs(node_id, this.workingTree)
  }

  private findNodeByNodeIdRecurs(node_id: string, curr: CohortDefinition): CohortDefinition | undefined {
    if (curr.node_id === node_id) {
      return curr
    } else {
      for (let node of (curr.children ? curr.children : [])) {
        let val = this.findNodeByNodeIdRecurs(node_id, node);
        if (val) {
          return val;
        }
      }
      return;
    }
  }

  public deleteNode(node: CohortDefinition): void {
    this.deleteNodeRecurs(node.node_id, this.workingTree);
    // Force-refresh tree render
    const data = this.dataSource.data;
    this.dataSource.data = [];
    this.dataSource.data = data;
  }

  private deleteNodeRecurs(node_id: string, curr: CohortDefinition) {
    if (!curr.children) {
      return
    }
    for (let node of curr.children) {
      if (node.node_id === node_id) {
        let idx = curr.children.indexOf(node)
        if (idx > -1) {
          curr.children?.splice(idx, 1)
          return
        }
      } else {
        this.deleteNodeRecurs(node_id, node)
      }
    }
  }
}
