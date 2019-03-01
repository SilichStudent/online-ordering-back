import { createConnection, Connection } from 'typeorm'

class DBConnevtionService {

    public connection: Promise<Connection>;

    constructor() {
        console.log("CONNECT CONNECT");

        this.connection = createConnection();
    }

}

export default new DBConnevtionService().connection