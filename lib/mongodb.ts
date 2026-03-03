import mongoose from 'mongoose';
import { logDatabaseConnection, logError } from './errors/logger';

// Validate MONGODB_URI environment variable
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Connection options as specified in design.md
const options: mongoose.ConnectOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connect to MongoDB with connection pooling and error handling
 * Implements singleton pattern for connection reuse
 * Includes retry logic through mongoose's built-in reconnection
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Return existing connection promise if connection is in progress
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, options)
      .then((mongoose) => {
        logDatabaseConnection('connected');
        return mongoose;
      })
      .catch((error) => {
        logDatabaseConnection('error', error);
        // Reset the promise so next call will retry
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    logError('Failed to establish database connection', error);
    throw error;
  }

  return cached.conn;
}

// Handle connection events for better logging
mongoose.connection.on('connected', () => {
  logDatabaseConnection('connected');
});

mongoose.connection.on('error', (err) => {
  logDatabaseConnection('error', err);
});

mongoose.connection.on('disconnected', () => {
  logDatabaseConnection('disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logDatabaseConnection('disconnected');
  process.exit(0);
});

export default connectDB;
