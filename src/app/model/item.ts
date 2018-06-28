export class Item {
    constructor(
        public name:string,       
        public created_at:string = ( new Date() ).getTime().toString(),
        public updated_at:string = ( new Date() ).getTime().toString(),
    ) {

    }
}