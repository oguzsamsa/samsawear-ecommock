import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const user = useSelector((state) => state.client.user);
  return (
    <Route
      {...rest}
      render={() => {
        return user.email ? children : <Redirect to="/login" />;
      }}
    />
  );
}

export default PrivateRoute;
