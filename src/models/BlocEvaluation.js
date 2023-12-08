export default class BlocEvaluation {
  
  constructor(id, version,livretEvaluationId,activiteTypeId,criteresSatisfaits,commentaireInsatisfaction, commentaireEvaluationsComplementaires) {
    this.id = id;
    this.version = version;
    this.criteresSatisfaits = criteresSatisfaits;
    this.commentaireInsatisfaction = commentaireInsatisfaction;
    this.commentaireEvaluationsComplementaires = commentaireEvaluationsComplementaires;
  }
}
