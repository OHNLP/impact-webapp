import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  BooleanOperationType, BooleanOperationTypeToDisplayNameMap,
  CohortDefinition,
  EntityType, EntityTypeToDisplayNameMap,
  NodeType,
  NodeTypeToDisplayNameMap
} from "../../../../models/cohort-definition";

export interface CohortDefinitionEditorData {
  node: CohortDefinition,
  commit: boolean
}

@Component({
  selector: 'app-cohort-definition-item-editor-modal',
  templateUrl: './cohort-definition-item-editor-modal.component.html',
  styleUrls: ['./cohort-definition-item-editor-modal.component.css']
})
export class CohortDefinitionItemEditorModalComponent {

  nodeTypes = Object.values(NodeType)
  booleanOpTypes = Object.values(BooleanOperationType)
  entityTypes = Object.values(EntityType)

  constructor(
    public dialogRef: MatDialogRef<CohortDefinitionItemEditorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CohortDefinition,
  ) {}

  onNoClick(): void {
    this.dialogRef.close({node: this.data, commit: false}); // TODO debug change to false
  }

  get nodeType(): typeof NodeType {
    return NodeType
  }

  get nodeTypeNames(): Record<NodeType, string> {
    return NodeTypeToDisplayNameMap
  }

  get booleanOpType(): typeof BooleanOperationType {
    return BooleanOperationType
  }

  get booleanOpTypeNames(): Record<BooleanOperationType, string> {
    return BooleanOperationTypeToDisplayNameMap
  }

  get entityType(): typeof EntityType {
    return EntityType
  }

  get entityTypeNames(): Record<EntityType, string> {
    return EntityTypeToDisplayNameMap
  }


}
