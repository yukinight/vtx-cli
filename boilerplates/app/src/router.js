import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

const routes = [{
    path: '/',
    models: () => [import('./models/example')],
    component: () => import('./routes/IndexPage'),
}];

function RouterConfig({ history, app }) {
    return (
        <Router history={history}>
        <Switch>
            {
                routes.map(({ path, ...dynamics }, key) => (
                    <Route
                        key={key}
                        exact
                        path={path}
                        component={dynamic({
                        app,
                        ...dynamics,
                        })}
                    />
                ))
            }
        </Switch>
        </Router>
    );
}

export default RouterConfig;
