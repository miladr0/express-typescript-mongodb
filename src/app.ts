// eslint-disable-next-line simple-import-sort/imports
import 'reflect-metadata';
import { CORS_ORIGINS, CREDENTIALS, DBURL, isProduction, PORT, SENTRY_DSN, jwtStrategy } from './config';

import * as Sentry from '@sentry/node';
import bodyParser from 'body-parser';
import { defaultMetadataStorage as classTransformerDefaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, ErrorRequestHandler, RequestHandler } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import http from 'http';
import mongoose from 'mongoose';
import passport from 'passport';
import { getMetadataArgsStorage, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUi from 'swagger-ui-express';
import xss from 'xss-clean';

import handlingErrorsMiddleware from './middlewares/handlingErrors.middleware';

let serverConnection: http.Server;

export default class App {
  private app: Application;
  private port: string | number;

  constructor(controllers: Function[]) {
    this.app = express();
    this.port = PORT || 8080;

    this.initSentry();
    this.initMiddlewares();
    this.initRoutes(controllers);

    this.initSwagger(controllers);
    this.initHandlingErrors();
  }

  private initSentry() {
    if (isProduction) {
      Sentry.init({ dsn: SENTRY_DSN });
      // The request handler must be the first middleware on the app
      this.app.use(Sentry.Handlers.requestHandler() as RequestHandler);
    }
  }
  private initMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors({ origin: CORS_ORIGINS }));

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // sanitize user data
    this.app.use(hpp());
    this.app.use(xss());
    this.app.use(cookieParser());

    // jwt authentication
    this.app.use(passport.initialize());
    passport.use('jwt', jwtStrategy);
  }

  private initRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      cors: {
        origin: CORS_ORIGINS,
        credentials: CREDENTIALS,
      },
      routePrefix: '/api',
      controllers: controllers,
      defaultErrorHandler: false,
    });
  }

  private initSwagger(controllers: Function[]) {
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: classTransformerDefaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    });

    const routingControllersOptions = {
      controllers: controllers,
    };

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas,
        securitySchemes: {
          basicAuth: {
            scheme: 'basic',
            type: 'http',
          },
        },
      },
      info: {
        description: 'API Generated with `routing-controllers-openapi` package',
        title: 'API',
        version: '1.0.0',
      },
    });

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
  }

  private initHandlingErrors() {
    if (isProduction) {
      // The error handler must be before any other error middleware and after all controllers
      this.app.use(Sentry.Handlers.errorHandler() as ErrorRequestHandler);
    }
    this.app.use(handlingErrorsMiddleware);
  }

  static async initDB() {
    await mongoose.connect(DBURL);
  }

  static async closeDB() {
    await mongoose.disconnect();
  }

  public initWebServer = async () => {
    return new Promise(resolve => {
      serverConnection = this.app.listen(this.port, () => {
        console.log(`✅  Ready on port http://localhost:${this.port}`);

        resolve(serverConnection.address());
      });
    });
  };

  public initServerWithDB = async () => {
    await Promise.all([App.initDB(), this.initWebServer()]);
  };

  public stopWebServer = async () => {
    return new Promise(resolve => {
      serverConnection.close(() => {
        resolve(void 0);
      });
    });
  };

  public getServer = () => {
    return this.app;
  };
}
