import {Injectable} from '@angular/core';
import {AppService} from '../../services/app.service';
import {apiRoutes} from '../../app.constants';
import {ToasterNotificationService} from '../../services/toaster-notification.service';

@Injectable()
export class ProjectService {

  constructor(private appservice: AppService,
              private toaseter: ToasterNotificationService) {
  }

  getProjectCategories() {
    return this.appservice.get(apiRoutes.projectCategory.index);
  }

  addProjectCategory(form) {
    const formValues = JSON.stringify({
      name: form.value.name,
      description: form.value.description
    });
    return this.appservice.post(apiRoutes.projectCategory.store, formValues);
  }

  index() {
    return this.appservice.get(apiRoutes.project.index);
  }

  update(id: number, body: any) {
    return this.appservice.put(apiRoutes.project.update, id, body);
  }

  show(id: number) {
    return this.appservice.show(apiRoutes.project.show, id);
  }

  addKebele(form) {
    const data = JSON.stringify({
      woreda_id: form.value.woreda,
      name: form.value.name
    });
    return this.appservice.post(apiRoutes.kebele.store, data);
  }

  addCluster(form) {
    const data = JSON.stringify({
      name: form.value.name
    });
    this.appservice.post(apiRoutes.cluster.store, data).subscribe(response => {
      console.log(response);
      return this.addClusterMember(form, response['data']['id']).subscribe(res => {
        form.resetForm();
      });
    });
  }

  addClusterMember(form, id) {
    const data = JSON.stringify({
      cluster_id: id,
      kebele_id: form.value.kebele
    });
    return this.appservice.post(apiRoutes.clusterMemeber.store, data);
  }

  getClusters() {
    return this.appservice.get(apiRoutes.cluster.index);
  }

  getZones() {
    return this.appservice.get(apiRoutes.zone.index);
  }

  getWoredas() {
    return this.appservice.get(apiRoutes.woreda.index);
  }

  getKebele() {
    return this.appservice.get(apiRoutes.kebele.index);
  }

  getImplementers() {
    return this.appservice.get(apiRoutes.implementer.index);
  }

  getBeneficaries() {
    return this.appservice.get(apiRoutes.beneficaries.index);
  }

  getManagers() {
    return this.appservice.get(apiRoutes.user.users);
  }

  getFrequencies() {
    return this.appservice.get(apiRoutes.frequencies.index);
  }

  getStatuses() {
    return this.appservice.get(apiRoutes.statuses.index);
  }

  addProject(form, program, budget) {
    const projectValue = JSON.stringify({
      program_id: program,
      project_category_id: form.value.category,
      name: form.value.name,
      description: form.value.description,
      featured: false,
      status_id: 2
    });
    this.appservice.post(apiRoutes.project.store, projectValue).subscribe(project => {
      this.addProjectDetail(form, project['data']['id'], budget).subscribe(detail => {
        this.addProjectFrequencies(form, detail['data']['project_id']).subscribe(frequency => {
          this.addProjectImplementers(form, frequency['data']['project_id']).subscribe(implementer => {
            this.addProjectBeneficaries(form, implementer['data']['project_id']).subscribe(beneficary => {
              form.resetForm();
              this.toaseter.success('Success', 'Project successfully saved');
            });
          });
        });
      });
    });
  }

  getOutputsByOutcome(id) {
    return this.appservice.show(apiRoutes.outcomes.outcome_outputs, id);
  }

  getIndicatorsByOutcome(id) {
    return this.appservice.show(apiRoutes.outcomeIndicator.show, id);
  }

  getIndicatorsByOutput(id) {
    return this.appservice.show(apiRoutes.output_indicator.show, id);
  }

  addProjectDetail(form, id, budget) {
    const projectDetail = JSON.stringify({
      project_id: id,
      cluster_id: form.value.cluster,
      budget: budget,
      goal: form.value.goal,
      objective: form.value.objective,
      mng_1: form.value.manager1,
      mng_2: form.value.manager2,
      starting_date: form.value.start.format('YYYY-MM-DD HH:mm:ss'),
      ending_date: form.value.end.format('YYYY-MM-DD HH:mm:ss')
    });
    return this.appservice.post(apiRoutes.project_detail.store, projectDetail);
  }

  addProjectFrequencies(form, id) {
    const frequencyValue = JSON.stringify({
      project_id: id,
      frequency_id: form.value.frequency
    });
    return this.appservice.post(apiRoutes.project_frequency.store, frequencyValue);
  }

  addProjectImplementers(form, id) {
    const implementerValue = JSON.stringify({
      project_id: id,
      implementer_id: form.value.implementer
    });
    return this.appservice.post(apiRoutes.project_implementers.store, implementerValue);
  }

  addProjectBeneficaries(form, id) {
    const beneficariesValue = JSON.stringify({
      project_id: id,
      beneficiary_id: form.value.beneficary
    });
    return this.appservice.post(apiRoutes.project_beneficiaries.store, beneficariesValue);
  }

  getOutcomes(id) {

    return this.appservice.show(apiRoutes.outcomes.show, id);
  }

  getOutputs(id) {
    return this.appservice.show(apiRoutes.outputs.show, id);
  }

  getTimePlans() {
    return this.appservice.get(apiRoutes.timeplans.index);
  }

  getDatatypes() {
    return this.appservice.get(apiRoutes.datatypes.index);
  }

  getMeasuringUnits() {
    return this.appservice.get(apiRoutes.measuring_units.index);
  }

  getDisaggregationMethods() {
    return this.appservice.get(apiRoutes.disaggregation_methods.index);
  }

  getActivityCategory() {
    return this.appservice.get(apiRoutes.activity_categories.index);
  }

  addOutcome(form, type) {
    const data = JSON.stringify({
      project_id: type['project_id'],
      name: form.value.name,
      type_id: form.value.type,
      parent_id: type['type'] === 'project' ? 0 : type['id']
    });
    return this.appservice.post(apiRoutes.outcomes.store, data);
  }

  addOutput(form, type) {
    const data = JSON.stringify({
      outcome_id: type['id'],
      name: form.value.name,
      type_id: form.value.type,
      parent_id: type['type'] === 'outcome' ? 0 : type['id']
    });
    return this.appservice.post(apiRoutes.outputs.store, data);
  }

  addIndicator(form, d) {
    const data = JSON.stringify({
      name: form.value.name,
      type_id: form.value.type,
      measuring_unit_id: form.value.unit,
      frequency_id: form.value.frequency,
      baseline_value: form.value.baseline,
      source: form.value.source,
      target_value: form.value.target,
      is_total: form.value.totalauto
    });
    this.appservice.post(apiRoutes.indicators.store, data).subscribe(response => {
      if (form.value.disaggregation) {
        this.addIndicatorDisaggregation(form, response['data']['id']);
      }
      if (d['type'] === 'outcome') {
        this.addOutcomeIndicator(response['data']['id'], d['id']);
      }
      if (d['type'] === 'output') {
        this.addOutputIndicator(response['data']['id'], d['id']);
      }
      if (d['type'] === 'activity') {
        this.addActivityIndicator(response['data']['id'], d['id']);
      }
      console.log(response);
    });
  }

  addIndicatorDisaggregation(form, id) {
    const data = JSON.stringify({
      indicator_id: id,
      methods: form.value.disgby
    });
    this.appservice.post(apiRoutes.indicator_disaggregation_methods.store, data).subscribe(response => {
      console.log(response);
    });
  }

  addOutcomeIndicator(indicator_id, outcome_id) {
    const data = JSON.stringify({
      indicator_id: indicator_id,
      outcome_id: outcome_id
    });
    this.appservice.post(apiRoutes.outcomeIndicator.store, data).subscribe(response => {
      console.log(response);
    });
  }

  addOutputIndicator(indicator_id, output_id) {
    const data = JSON.stringify({
      indicator_id: indicator_id,
      output_id: output_id
    });
    this.appservice.post(apiRoutes.output_indicator.store, data).subscribe(response => {
      console.log(response);
    });
  }


  addActivityIndicator(indicator_id, activity_id) {
    const data = JSON.stringify({
      indicator_id: indicator_id,
      output_id: activity_id
    });
    this.appservice.post(apiRoutes.output_indicator.store, data).subscribe(response => {
      console.log(response);
    });
  }

  addActivity(form, type) {
    let imp = '[';
    for (let i = 0; i < form.value.partners.length; i++) {
      imp += `{id: ${form.value.partners[i].split('_')[0]}, name: ${form.value.partners[i].split('_')[1]}},`;
    }
    imp = imp.substring(0, imp.lastIndexOf(',')) + ']';
    const data = JSON.stringify({
      name: form.value.name,
      output_id: type['output_id'],
      status_id: form.value.status,
      activity_category_id: form.value.category,
      baseline: form.value.baseline,
      target: form.value.target,
      kebele_id: form.value.kebele,
      start_date: form.value.start.format('YYYY-MM-DD HH:mm:ss'),
      end_date: form.value.end.format('YYYY-MM-DD HH:mm:ss'),
      implementing_partners: imp,
      parent_id: type['type'] === 'output' ? 0 : type['id']
    });
    this.appservice.post(apiRoutes.activities.index, data).subscribe(response => {
      if (form.value.onbudget) {
        this.addActivityBudget(response['data']['id'], form.value.budget);
      }
      console.log(response);
    });
  }

  updateActivity(updatedData) {
    return this.appservice.put(apiRoutes.activities.update, updatedData['id'], updatedData);
  }

  addActivityBudget(activity_id, amount) {
    this.appservice.post(apiRoutes.activity_budgets.index, JSON.stringify({
      activity_id: activity_id,
      amount: amount
    })).subscribe(data => console.log(data));
  }

  getActivity(id) {
    return this.appservice.show(apiRoutes.activities.show, id);
  }
  getActivities() {
    return this.appservice.get(apiRoutes.activities.index);
  }
  getExpenditureCategories() {
    return this.appservice.get(apiRoutes.expenditure_categories.index);
  }
  addExpenditureCategiries(body) {
    return this.appservice.post(apiRoutes.expenditure_categories.store, body);
  }
  addExpenditure(body) {
    return this.appservice.post(apiRoutes.expenditures.store, body);
  }
  getFinanceByProject(project_id) {
    return this.appservice.show(apiRoutes.finance.project_finance, project_id);
  }
  addFinance(project_id, frequency_id, plans, form) {
    this.appservice.post(apiRoutes.finance.store,
      JSON.stringify({
      project_id: project_id,
      frequency_id: frequency_id
    })
    ).subscribe(data =>  {
      this.addFinancePlans(data['data']['id'], plans, form);
      console.log(data['data']['id']);
    });
  }

  addFinancePlans(finance_id, plans, form) {
    this.appservice.post(apiRoutes.finance_plans.store, JSON.stringify({
      finance_id: finance_id,
      plans: plans
    })).subscribe(data => {
      form.resetForm();
      this.toaseter.success('success', data['message']);
    });
  }
  addmonthlyExpenditure(body) {
    console.log(body.length);
    return this.appservice.post(apiRoutes.monthly_expenditures.store, JSON.stringify({length: body.length, body: body}));
  }
  getMonthlyExpenditureByFinancePlan(id) {
    return this.appservice.show(apiRoutes.monthly_expenditures.get_monthly_expenditures_by_finance_plan, id);
  }

  addMilestone(form) {
    return this.appservice.post(apiRoutes.milestones.index, form);
  }
  add_milestone_actual_values(form_data) {
    return this.appservice.post(apiRoutes.milestone_actual_values.store, JSON.stringify(form_data));
  }
}
