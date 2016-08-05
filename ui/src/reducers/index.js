import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import authReducer from './auth_reducer';
import profileReducer from './profile_reducer';
import applicationReducer from './application_reducer';



const rootReducer = combineReducers({
  form : form,
  auth : authReducer,
  profile : profileReducer,
  application : applicationReducer
});

export default rootReducer;
