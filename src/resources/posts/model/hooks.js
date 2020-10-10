import baseModel from '../../../libs/baseModel';
import schema from './schema';

schema.plugin(baseModel, { timestamp: true });
