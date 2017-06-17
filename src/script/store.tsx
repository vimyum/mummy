import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { logger, shareCurrentAsset } from './middleware/index';

export default function createFinalStore() {
      const finalCreateStore = compose(
        applyMiddleware(logger),
        applyMiddleware(shareCurrentAsset),
      )(createStore);
      return finalCreateStore(rootReducer);
}


