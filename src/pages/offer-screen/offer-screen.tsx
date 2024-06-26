import CommentSubmissionForm from '../../components/comment-submission-form/comment-submission-form.tsx';
import ListOfReviews from '../../components/list-of-reviews/list-of-reviews.tsx';
import Map from '../../components/map/map.tsx';
import ListOfCityCards from '../../components/list-of-city-cards/list-of-city-cards.tsx';
import {Offer, Points} from '../../types/offer.ts';
import Hat from '../../components/hat/hat.tsx';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/index.ts';
import {useEffect} from 'react';
import {fetchOfferDataAction} from '../../store/api-actions.ts';
import {getRating} from '../../utils.ts';
import {AuthorizationStatus} from '../../constants/constants.ts';
import {selectCurrentOfferData} from '../../store/selectors.ts';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';
import AddToFavoritesButton from '../../components/add-to-favorites-button/add-to-favorites-button.tsx';

type OfferScreenProps = {
  favorites: Offer[];
}

const BOOKMARK_ICON_WIDTH = 30;
const BOOKMARK_ICON_HEIGHT = 32;

const AVATAR_SIZE = '74';

function OfferScreen({favorites}: OfferScreenProps): JSX.Element {
  const {id} = useParams();

  const user = useAppSelector(getAuthorizationStatus);
  const {offerInfo, nearestOffers, reviews} = useAppSelector(selectCurrentOfferData);

  const points: Points[] = nearestOffers.map((offer) => ({
    id: offer.id,
    location: offer.location,
  }));

  const mapPoints: Points[] = points.slice(0, 3);

  if (offerInfo) {
    mapPoints.push({
      id: offerInfo.id,
      location: offerInfo.location,
    });
  }

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOfferDataAction({id: id ?? ''}));
  }, [dispatch, id]);
  if (!offerInfo) {
    return <div className="container">Loading</div>;
  }
  return (
    <div className="page">
      <Hat favorites={favorites}/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">

              {offerInfo.images.map((url) => (
                <div className="offer__image-wrapper" key={url}>
                  <img className="offer__image" src={url} alt="Photo studio"/>
                </div>
              ))}

            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerInfo.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper"
                style={{display: 'flex', justifyContent: 'space-between', alignItems: 'stretch'}}
              >
                <h1 className="offer__name">{offerInfo.title}</h1>
                <AddToFavoritesButton
                  id={offerInfo.id}
                  isFavorite={offerInfo.isFavorite}
                  iconWidth={BOOKMARK_ICON_WIDTH}
                  iconHeight={BOOKMARK_ICON_HEIGHT}
                  buttonClass="place-card__bookmark-button"
                  activeClass="place-card__bookmark-button--active"
                  iconClass="place-card__bookmark-icon"
                  buttonText="In bookmarks"
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{width: `${getRating(offerInfo.rating)}`}}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offerInfo.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offerInfo.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${offerInfo.bedrooms} Bedrooms`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {`Max ${offerInfo.maxAdults} adults`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerInfo.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerInfo.goods.map((advantage) => (
                    <li className="offer__inside-item" key={advantage}>
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${
                      offerInfo.host.isPro ? 'offer__avatar-wrapper--pro' : ''
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={offerInfo.host.avatarUrl}
                      width={AVATAR_SIZE}
                      height={AVATAR_SIZE}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offerInfo.host.name}
                  </span>
                  {offerInfo.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offerInfo.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ListOfReviews reviews={reviews}/>
                {user === AuthorizationStatus.Auth && <CommentSubmissionForm id={id!}/>}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={nearestOffers[0].city} points={mapPoints} specialCaseId={offerInfo.id}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <ListOfCityCards cities={nearestOffers.slice(0, 3)} listType={'near'}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
