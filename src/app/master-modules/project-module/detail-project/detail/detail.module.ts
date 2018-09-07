import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailProjectComponent} from '../detail-project.component';
import {OverviewComponent} from '../overview/overview.component';
import {LogFrameComponent} from '../log-frame/log-frame.component';
import {OutcomeTreeComponent} from '../log-frame/outcome-tree/outcome-tree.component';
import {IndicatorTreeComponent} from '../log-frame/indicator-tree/indicator-tree.component';
import {ActivityTreeComponent} from '../log-frame/activity-tree/activity-tree.component';
import {OutputTreeComponent} from '../log-frame/output-tree/output-tree.component';
import {ActivityComponent} from '../activity/activity.component';
import {MaterialModule} from '../../../../material.module';
import {DetailRoutingModule} from './detail-routing/detail-routing.module';
import {ActivityDialogComponent} from '../activity-dialog/activity-dialog.component';
import {IndicatorDialogComponent} from '../indicator-dialog/indicator-dialog.component';
import {OutcomeDialogComponent} from '../outcome-dialog/outcome-dialog.component';
import {OutputDialogComponent} from '../output-dialog/output-dialog.component';
import {InputDialogComponent} from '../input-dialog/input-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChooserDialogComponent} from '../chooser-dialog/chooser-dialog.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ExpenditureComponent} from '../expenditure/expenditure.component';
import { DataEntryComponent } from '../data-entry/data-entry.component';
import { BiannualTableComponent } from '../data-entry/biannual-table/biannual-table.component';
import { QuarterTableComponent } from '../data-entry/quarter-table/quarter-table.component';
import { AnnualTableComponent } from '../data-entry/annual-table/annual-table.component';
import { DataEntryDialogComponent } from '../data-entry/data-entry-dialog/data-entry-dialog.component';
import { ActivityDetailComponent } from '../activity/activity-detail/activity-detail.component';
import { FinanceComponent } from '../finance/finance.component';
import { FilterPipePipe } from '../data-entry/pipe/filter-pipe.pipe';
import { ShowAllComponent } from '../data-entry/show-all/show-all.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DetailRoutingModule,
    FormsModule,
    PerfectScrollbarModule
  ],
  declarations: [DetailProjectComponent, OverviewComponent,
    ActivityComponent, LogFrameComponent, OutcomeTreeComponent,DataEntryComponent,BiannualTableComponent,QuarterTableComponent,AnnualTableComponent,
    DataEntryDialogComponent,FinanceComponent,FilterPipePipe,ShowAllComponent,
    IndicatorTreeComponent, ActivityTreeComponent, OutputTreeComponent, ExpenditureComponent,
  ActivityDialogComponent, IndicatorDialogComponent, OutcomeDialogComponent,
    OutputDialogComponent, InputDialogComponent, ChooserDialogComponent, ActivityDetailComponent],

  exports: [DetailProjectComponent, OverviewComponent,FilterPipePipe,
    ActivityComponent, LogFrameComponent, OutcomeTreeComponent,
    IndicatorTreeComponent, ActivityTreeComponent, OutputTreeComponent,
    ActivityDialogComponent, IndicatorDialogComponent, OutcomeDialogComponent, FinanceComponent,
    OutputDialogComponent, InputDialogComponent, ChooserDialogComponent, ActivityDetailComponent],
  entryComponents: [
    ActivityDialogComponent,
    IndicatorDialogComponent,
    OutcomeDialogComponent,
    OutputDialogComponent,
    InputDialogComponent,
    ChooserDialogComponent,
    DataEntryDialogComponent,
    ShowAllComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class DetailModule { }
