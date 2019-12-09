import React from 'react';
import {Route, Switch} from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import SearchPage from "./containers/SearchPage";
import WebDictPage from "./containers/WebDictPage";
import ConfigPage from "./containers/ConfigPage";
import BriefDictPage from "./containers/BriefDictPage";
import HistoryPage from "./containers/HistoryPage";
import NavPage from "./containers/NavPage";


export default () => (
  <App>
    <Switch>
      <Route path="/dict">
        <Route component={NavPage}/>
        <Route path={routes.WEB_DICT} component={WebDictPage}/>
        <Route path={routes.BRIEF_DICT} component={BriefDictPage}/>
      </Route>
      <Route>
        <Route path={routes.HOME} component={SearchPage}/>
        <Switch>
          <Route path={routes.HISTORY} component={HistoryPage}/>
          <Route path={routes.CONFIG} component={ConfigPage}/>
        </Switch>
      </Route>
    </Switch>
  </App>
);
