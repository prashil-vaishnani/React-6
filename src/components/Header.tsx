import classes from "./Header.module.css";
import { authActions } from "../store/index";
import { useAppDispatch, useAppSelector } from "../store/hook";

const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth: boolean = useAppSelector((state) => state.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuth && (
        <nav>
          <ul>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
