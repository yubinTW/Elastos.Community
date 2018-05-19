export default class {
    protected db;
    protected currentUser;

    constructor(db, session){
        this.db = db;
        this.currentUser = session.user;

        this.init();
    }

    protected init(){}

    public getDBModel(name: string){
        return this.db.getModel(name);
    }

}