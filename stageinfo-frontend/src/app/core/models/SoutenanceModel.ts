export class SoutenanceModel {
    constructor(
        public _id: string ="",
        public titre: string ="",
        public etudiant: string ="",
        public tuteurUniv: string ="",
        public tuteurEntreprise: string = "",
        public rapporteur: string ="",
        public entreprise : string ="",
        public commentaire: string ="",
        public session: string ="",
        public modifications:{
            date: Date;
            idUser: string;
            motif: string;
        } | any  ="",
        public idStage: string = "",
        public idCreneau: string =""){}
}
