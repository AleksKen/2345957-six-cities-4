import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/index.ts';
import {AuthorizationStatus} from '../../constants/constants.ts';
import {logoutAction} from '../../store/api-actions.ts';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';
import {getEmail} from '../../services/email.ts';
import {getProfilePicture} from '../../services/profile-picture.ts';


type HatProps = {
  favorites: Offer[];
}

const LOGO_WIDTH = '81';
const LOGO_HEIGHT = '41';
const AVATAR_SIZE = '20px';
const AVATAR_MARGIN_RIGHT = '8px';
const AVATAR_BORDER_RADIUS = '50%';

function Hat({favorites}: HatProps): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getAuthorizationStatus);
  const userEmail = getEmail();
  const userPicture = getProfilePicture();
  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <div className="header__nav-link header__nav-link--profile">
                  {user === AuthorizationStatus.Auth ? (
                    <img src={userPicture} className="header__avatar-wrapper"
                      style={{
                        borderRadius: AVATAR_BORDER_RADIUS,
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                        marginRight: AVATAR_MARGIN_RIGHT
                      }}
                    >
                    </img>
                  ) : (
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                  )}
                  {user === AuthorizationStatus.Auth ? (
                    <Link to="/favorites">
                      <span className="header__user-name user__name">{userEmail}</span>
                      <span className="header__favorite-count">{favorites.length}</span>
                    </Link>
                  ) : (
                    <Link to="/login" className="header__nav-link">Login</Link>
                  )}
                </div>
              </li>
              {user === AuthorizationStatus.Auth && (
                <li className="header__nav-item">
                  <Link to="/login" className="header__nav-link" onClick={handleSignOut}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Hat;
