export class EntrepriseModel{
    constructor(
        public _id: string ="",
        public nom: string  = "",
        public secteurActivite: string = "",
        public description: string  = "",
        
        //public adresse: AdresseModel = new AdresseModel(),

        public voie:string ="",
        public codePostal: string ="",
        public ville:string ="",
        public pays: string ="",

        public siteweb: string  = "",
        public tel: string  = "",
        public fax: string  = "",
        
        public siret: string  = "",
        
        public nbSalaries: string = "",
        public chiffreAffaire: string = "",
        public representant:{ _id :string, nom:string, prenom: string} | any  = {_id: "", nom:"", prenom:""}){}
}

export class AdresseModel{
    constructor(
        public voie:string ="",
        public ville:string ="",
        public codePostal: string ="",
        public pays: string ="",
        ){}
}