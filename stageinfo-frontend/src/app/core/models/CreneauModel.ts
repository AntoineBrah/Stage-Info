export class CreneauSchema{
    constructor(
        public dateDeb:Date = new Date(),
        public heureDeb:number =0,
        public dispo: boolean = false,
        public commentaire: string ="",
        ){}
}