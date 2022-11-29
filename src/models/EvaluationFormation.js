export default class EvaluationFormation {
  
  constructor(id, version,blocEvaluationId,contenu,competencesEvalueesId,dateEvaluation, interventionId) {
    this.id = id;
    this.version = version;
    this.bocEvaluationId = blocEvaluationId;
    this.contenu = contenu;
    this.competencesEvalueesId = competencesEvalueesId;
    this.dateEvaluation = dateEvaluation;
    this.interventionId = interventionId;
  }
}
