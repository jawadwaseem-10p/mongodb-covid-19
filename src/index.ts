import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import {connect, Mongoose} from 'mongoose';


// Start the server
const connectionOptions =  {
    authSource: 'admin',
    dbName: 'covid-19',
    user: 'admin',
    pass: 'yourpassword',
    
}
const port = Number(process.env.PORT || 3000);
connect('mongodb://admin:mitreadmin123456@localhost:27017/covid-19',connectionOptions).then(() => {
    logger.info('connected to db');
    app.listen(port, () => {
        logger.info('Express server started on port: ' + port);
    });
}).catch((err) => logger.err(err))