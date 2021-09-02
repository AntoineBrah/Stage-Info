export class EmbaucheSchema{
    constructor(
        public idStage:string = "",
        public idEtudiant:string ="",
        public idEntreprise: string = "",
        public commentaire: string ="",

        public contratType: boolean = false,
        public dateEmbauche: Date = new Date(),
        ){}
}