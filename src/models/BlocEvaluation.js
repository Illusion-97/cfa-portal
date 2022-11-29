export default class BlocEvaluation {
  
  constructor(id, version,livretEvaluationId,activiteTypeId,criteresSatisfaits,commentaireInsatisfaction, commentaireEvaluationsComplementaires,formateurEvaluateurId,dateSignature,evaluationsFormationsId) {
    this.id = id;
    this.version = version;
    this.livretEvaluationId = livretEvaluationId;
    this.activiteTypeId = activiteTypeId;
    this.criteresSatisfaits = criteresSatisfaits;
    this.commentaireInsatisfaction = commentaireInsatisfaction;
    this.commentaireEvaluationsComplementaires = commentaireEvaluationsComplementaires;
    this.formateurEvaluateurId = formateurEvaluateurId;
    this.dateSignature = dateSignature;
    this.evaluationsFormationsId = evaluationsFormationsId;
  }
}
