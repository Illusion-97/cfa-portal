export default class EvaluationFormation {
  
  constructor(id, version,blocEvaluationId,contenu,competencesEvaluees,dateEvaluation) {
    this.id = id;
    this.version = version;
    this.bocEvaluationId = blocEvaluationId;
    this.contenu = contenu;
    this.competencesEvaluees = competencesEvaluees;
    this.dateEvaluation =dateEvaluation
  }
}
