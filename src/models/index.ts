import mongoose from 'mongoose';
import { MONGODB_URI } from '../utils/utils';
export function connect() {
	// Create the database connection

	mongoose
		.connect(MONGODB_URI)
		.then(() => {
            console.log("connected")
		})
		.catch((e) => {
			console.info('Mongoose connection error');
			console.error(e);
		});

	// CONNECTION EVENTS
	// When successfully connected
	mongoose.connection.on('connected', () => {
		console.info('Mongoose default connection open to ' );
	});

	// If the connection throws an error
	mongoose.connection.on('error', (err) => {
		console.error('Mongoose default connection error: ' + err);
	});

	// When the connection is disconnected
	mongoose.connection.on('disconnected', () => {
		console.info('Mongoose default connection disconnected');
	});

	// If the Node process ends, close the Mongoose connection
	process.on('SIGINT', () => {
		mongoose.connection.close(true);
		console.info(
			'Mongoose default connection disconnected through app termination'
		);
		process.exit(0);
	});
}