import { Component, Input, OnInit } from '@angular/core';
import { MatTree } from '@angular/material/tree';
import { CohortDefinition } from 'src/app/models/cohort-definition';
import { Determination, DETERMINATION_VALUE } from 'src/app/models/determination';
import { ApplicationStatusService } from 'src/app/services/application-status.service';
import { MiddlewareAdapterService } from 'src/app/services/middleware-adapter.service';
import { FlatTreeNode } from '../criteria-tree-table/criteria-tree-table.component';

@Component({
  selector: 'app-criteria-tree-node',
  templateUrl: './criteria-tree-node.component.html',
  styleUrls: ['./criteria-tree-node.component.css']
})
export class CriteriaTreeNodeComponent implements OnInit {
  @Input() tree?: MatTree<any>
  @Input() node?: FlatTreeNode

  DETERMINATION_VALUE = DETERMINATION_VALUE

  constructor(
    public appStatus: ApplicationStatusService, 
    public middleware: MiddlewareAdapterService
  ) { }

  ngOnInit(): void {
    // check if this criterion exists
    if (this.appStatus.uwDeterminationDict[this.node!.criteria.node_id] === undefined) {
      this.appStatus.uwDeterminationDict[this.node!.criteria.node_id] = this.createDetermination(
        '', // project_uid
        '', // patient_uid
        this.node!.criteria.node_id
      );
    }
  }

  toggleCriteriaDetail(criteria_uid?: string): void {
    if (this.appStatus.uwCriteriaNodeID === criteria_uid) {
      this.appStatus.uwCriteriaNodeID = undefined;
    } else {
      // ok, let's show this criteria
      this.appStatus.uwCriteriaNodeID = criteria_uid;
      // and notify update the facts if is leaf
      this.appStatus.setFactCollections(criteria_uid);
    }

    console.log('* clicked criteria: ' + criteria_uid);
  }

  getNodeWidth(level?: number): number {
    if (level === undefined) {
      return 500 - 160;
    }
    return 500 - 160 - level * 20;
  }

  createDetermination(
    project_uid: string, 
    patient_uid: string, 
    criteria_uid: string, 
    value?: DETERMINATION_VALUE ) 
  {
    if (value === undefined) {
      value = DETERMINATION_VALUE.UNK;
    }
    return {
      project_uid: project_uid,
      patient_uid: patient_uid,
      criteria_uid: criteria_uid,

      // user created information
      value: value,
      comment: '',
      date_updated: new Date()
    }
  }

  setDeterminationValue(dtmn:Determination, value:DETERMINATION_VALUE):void {
    dtmn.value = value;
    dtmn.date_updated = new Date();
  }

  appendDeterminationComment(dtmn:Determination, c:string): void {
    dtmn.comment += c + '\n';
  }
}
