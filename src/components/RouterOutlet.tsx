import * as React from 'react';
import { Route } from 'react-router-dom';
import routes from '../router/AppRoutes';

interface RouterProps {
  className: string;
}

const RouterOutlet: React.FC<RouterProps> = (props) => {
  return (
    <div className={props.className}>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        );
      })}
    </div>
  );
};

export default RouterOutlet;
