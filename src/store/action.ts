import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import {AppRoute, AuthorizationStatus } from '../components/constants/constants';
import { OfferData } from '../types/offer-data';


export const cityChange = createAction<string>('сityChange');

export const sortTypeSelect = createAction<string>('sortTypeSelect');

export const highlightMarker = createAction<{ id: string } | null>('highlightMarker');

export const loadOffers = createAction<Offer[]>('loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');

export const setError = createAction<string | null>('setError');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const saveUserEmail = createAction<string>('user/saveEmail');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const loadOfferData = createAction<OfferData>('loadOfferData');
