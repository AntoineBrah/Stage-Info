export class UserModel{
    constructor(
        public _id: string = "",
        public nom: string  = "",
        public prenom: string  = "",
        public email: string  = "",
        public telephone: string  = "",
        public fax: string  = "",
        public password: string  = "",
        public role: string  = "",

        // Si étudiant
        public numeroEtudiant: string  = "",
        public promotion: string  = "",
        public parcours : { _id :string, acronyme:string} | any  = {_id: "", acronyme:""},

        // Si représentant entreprise
        public fonction : string  = "",
        public entreprise: { _id :string, nom:string} | any  = {_id: "", nom:""},

    ){}
}
