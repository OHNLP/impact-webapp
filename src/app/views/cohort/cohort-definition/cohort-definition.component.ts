import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTree, MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {
  BooleanOperationType,
  CohortDefinition,
  EntityType,
  EntityTypeToDisplayNameMap,
  NodeType
} from "../../../models/cohort-definition";
import {MatDialog} from "@angular/material/dialog";
import {ApplicationStatusService} from "../../../services/application-status.service";
import {MiddlewareAdapterService} from "../../../services/middleware-adapter.service";
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { MatAccordion } from '@angular/material/expansion';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatTableDataSource } from '@angular/material/table';

export const base_empty_criteria = [
  {
    nodeUID: crypto.randomUUID(),
    nodeType: NodeType.LOGICAL,
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
export class CohortDefinitionComponent implements OnInit {
  /** Reference to the Tree itself */
  @ViewChild('tree') tree!: MatTree<any>;

  public hasChanged: boolean = false;

  // for searching phenotype
  public phenotype_keyword: string = '';
  public displayedColumnsSearchUMLSCodes: string[] = [
    'sourceUMLSCUI',
    'representation',
    // 'reperesentationDescription',
    'action'
  ];
  public dataSourceUMLSCodes!:MatTableDataSource<any>;


  public library_keyword: string = '';
  public displayedColumnsSearchPhenoReps: string[] = [
    'type',
    'title',
    'action'
  ];
  public dataSourcePhenoReps!:MatTableDataSource<any>;

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
    public dialog: MatDialog,
    private clipboard: Clipboard
  ) {

    // init the json editor
    this.editorOptions = new JsonEditorOptions()
    // set all allowed modes
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; 
    
    // update the tree view?
    this.treeControl = new NestedTreeControl<CohortDefinition>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<CohortDefinition>();
  }

  ngOnInit(): void {
    this.dataSourceUMLSCodes = new MatTableDataSource();
    this.dataSourcePhenoReps = new MatTableDataSource();
    // this.dataSourceUMLSCodes.paginator = this.paginator;

    if (this.appStatus.uwProject) {
      // this.unmodifiedTree = 
      // middleware.rest.get_criteria(appStatus.uwProject?.uid).subscribe(
      //   criteria => this.unmodifiedTree = criteria
      // );
      // this.workingTree = 
      this.middleware.rest.get_criteria(this.appStatus.uwProject?.uid).subscribe(
        criteria => {
          this.appStatus.uwCriteria = criteria;
          this.workingTree = criteria;
          this.dataSource.data = [this.workingTree];
          this.treeControl.dataNodes = this.dataSource.data;
          this.treeControl.expandAll();
        }
      );
    } else {
      throw new Error("Cohort definition attempted without active project")
    }
  }

  shareCohortDef(): void {
    var ret = window.prompt('');
  }

  /////////////////////////////////////////////////////////
  // Phenotype lib related functions
  /////////////////////////////////////////////////////////
  searchPhenotypeReps(): void {
    let _this = this;
    this.appStatus.searchPhenotypeReps(
      this.library_keyword,
      function() {
        _this.dataSourcePhenoReps.data = _this.appStatus.uwPhenoReps!;
        console.log('* updated phenotype reps:', _this.dataSourcePhenoReps);
      }
    );
  }

  copyPhenotypeRep(def: CohortDefinition): void {

  }

  getPhenotypeRepJSONStr(def: CohortDefinition): string {
    return JSON.stringify(def, null, 2);
  }

  fmtDS(ds: string[]): string {
    return ds.join(', ');
  }

  /////////////////////////////////////////////////////////
  // UMLS CUI related functions
  /////////////////////////////////////////////////////////

  getUMLSCodeList(): string {
    if (this.appStatus.uwUMLSCodes == undefined) {
      return '';
    }
    // ok, it's not null now
    return this.appStatus.uwUMLSCodes.join(', ');
  }

  searchUMLSCodes(): void {
    let _this = this;
    this.appStatus.searchUMLSCodes(
      this.phenotype_keyword,
      function() {
        _this.dataSourceUMLSCodes.data = _this.appStatus.uwUMLSCodes!;
        console.log('* updated phenotype code:', _this.dataSourceUMLSCodes);
      }
    );
  }

  copyUMLSCode(elm: any): void {
    console.log('* copied UMLS Code:', elm)
  }

  copyUMLSCodes(): void {
    if (this.appStatus.uwUMLSCodes == undefined) {
      return;
    }
    // ok, it's not null now, add " to each
    let codes = this.appStatus.uwUMLSCodes.map(v => '"' + v + '"').join(', ');

    this.clipboard.copy(codes);

    // toast
    this.appStatus.toastr.success(
      'Copied to clipboard!'
    );
  }

  /////////////////////////////////////////////////////////
  // Tree view related functions
  /////////////////////////////////////////////////////////

  /** Get the children for the node. */
  getChildren(node: CohortDefinition): CohortDefinition[] | null | undefined {
    return node.children;
  }

  get nodeType(): typeof NodeType {
    return NodeType
  }

  hasChild(_: number, node: CohortDefinition): boolean {
    return node.nodeType === NodeType.LOGICAL;
  }

  getNodeName(node: CohortDefinition): string {
    if (node.nodeType === NodeType.LOGICAL) {
      if (node.type === BooleanOperationType.MIN_OR) {
        return 'At least one of: ' + node.title;
      } else if (node.type === BooleanOperationType.NOT) {
        return 'All No: ' + node.title;
      } else {
        return 'All Yes: ' + node.title;
      }
    } else if (node.nodeType === NodeType.ENTITY) {
      return node.title;
    } else {
      return node.title;
    }
  }

  /////////////////////////////////////////////////////////
  // Editor related functions
  /////////////////////////////////////////////////////////

  toggleEditor(): void {
    this.appStatus.uwCriteriaUseEditorMode = !this.appStatus.uwCriteriaUseEditorMode;

    // this.editor!.data = this.appStatus.uwCriteria!;
  }

  onClickSaveChanges(): void {
    let obj = this.editor!.get() as unknown as CohortDefinition;
    console.log('* changed JSON', obj);
    this.appStatus.uwCriteria = obj;
    this.appStatus.saveCriteria();
    // reset the status
    this.hasChanged = false;
  }

  onChangeJSONEditor(event: Event): void {
    this.hasChanged = true;
  }

  resetTreeEmpty(): void {
    // this.dataSource.data = base_empty_criteria
    // this.treeControl.dataNodes = this.dataSource.data
    // this.treeControl.expandAll()
  }

  newNode(): CohortDefinition {
    return {
      nodeUID: crypto.randomUUID(),
      nodeType: NodeType.LOGICAL,
      title: '',
      description: '',
      type: BooleanOperationType.MIN_OR,
      numericModifier: 1,
      children: []
    }
  }

  openEditorDialog(node: CohortDefinition, parent?: CohortDefinition): void {
    // const dialogRef = this.dialog.open(CohortDefinitionItemEditorModalComponent, {
    //   width: '80%',
    //   data: {
    //     nodeUID: node.nodeUID,
    //     nodeType: node.nodeType,
    //     type: node.type,
    //     value: node.value,
    //     children: node.children
    //   }
    // });

    // dialogRef.afterClosed().subscribe((result: CohortDefinition) => {
    //   console.log('The dialog was closed');
    //   if (!result) {
    //     return
    //   }
    //   console.log("Committing changes")
    //   if (parent) {
    //     console.log('Adding new node to parent node ' + parent.nodeUID)
    //     if (!parent.children) {
    //       parent.children = []
    //     }
    //     parent.children.push(result)
    //   } else {
    //     console.log('Editing existing node ' + node.nodeUID)
    //     node.nodeType = result.nodeType
    //     node.value_type = result.value_type
    //     node.value = result.value
    //     node.children = result.children
    //   }
    //   const data = this.dataSource.data;
    //   this.dataSource.data = [];
    //   this.dataSource.data = data;
    // });
  }

  public findNodeByNodeId(nodeUID: string): CohortDefinition | undefined {
    return this.findNodeByNodeIdRecurs(nodeUID, this.workingTree)
  }

  private findNodeByNodeIdRecurs(nodeUID: string, curr: CohortDefinition): CohortDefinition | undefined {
    if (curr.nodeUID === nodeUID) {
      return curr
    } else {
      for (let node of (curr.children ? curr.children : [])) {
        let val = this.findNodeByNodeIdRecurs(nodeUID, node);
        if (val) {
          return val;
        }
      }
      return;
    }
  }

  public deleteNode(node: CohortDefinition): void {
    this.deleteNodeRecurs(node.nodeUID, this.workingTree);
    // Force-refresh tree render
    const data = this.dataSource.data;
    this.dataSource.data = [];
    this.dataSource.data = data;
  }

  private deleteNodeRecurs(nodeUID: string, curr: CohortDefinition) {
    if (!curr.children) {
      return
    }
    for (let node of curr.children) {
      if (node.nodeUID === nodeUID) {
        let idx = curr.children.indexOf(node)
        if (idx > -1) {
          curr.children?.splice(idx, 1)
          return
        }
      } else {
        this.deleteNodeRecurs(nodeUID, node)
      }
    }
  }
}
