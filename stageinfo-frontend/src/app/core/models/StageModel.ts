export class StageModel {
    constructor(
        public _id: string ="",
        public ajouteur: string | any ="",
        public etat : string ="",
        public titre: string ="",
        public description: string ="",
        public duree: string ="",
        public dateDebut: string = "",
        public niveauRequis: string ="",
        public parcours : string | any ="",
        public entreprise: string | any ="",
        public competences: string ="",
        public conditions: string ="",
        public avantages: string = ""
        ){}
}