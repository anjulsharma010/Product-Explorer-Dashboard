import { all, fork } from 'redux-saga/effects';
import { productsSaga } from './productsSaga';
import { favoritesSaga } from './favoritesSaga';

export default function* rootSaga() {
  yield all([
    fork(productsSaga),
    fork(favoritesSaga),
  ]);
}
