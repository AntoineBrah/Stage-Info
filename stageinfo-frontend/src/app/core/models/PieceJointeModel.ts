export class PieceJointeSchema {
    constructor(
        public nom: string,
        public type: string,
        public date: Date,
        public size: number,
        public content: string,
        public extension: string,
    
        public idUser: string,
        public idStage: string){}
    
}