import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../../types/offer';
import {OffersState} from '../../types/state.ts';
import {NameSpace} from '../../constants/constants.ts';
import {OfferData} from '../../types/offer-data.ts';
import {Review} from '../../types/review.ts';
import {updateOffer} from '../../utils.ts';


const initialState: OffersState = {
  currentOffer: {
    offerInfo: null,
    nearestOffers: [],
    reviews: [],
  },
  offers: [],
  selectedMarker: null,
  isOffersDataLoading: false,
  favorites: [],
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    updateOffers: (state, action: PayloadAction<Offer>) => {
      updateOffer(state.offers, action.payload);
    },
    loadOffers(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload;
    },
    setOffersDataLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isOffersDataLoading = action.payload;
    },
    loadOfferData(state, action: PayloadAction<OfferData>) {
      state.selectedMarker = {id: action.payload.offerInfo.id};
      state.currentOffer = action.payload;
    },
    sendReview(state, action: PayloadAction<Review>) {
      state.currentOffer.reviews = [...state.currentOffer.reviews, action.payload];
    },
    highlightMarker(state, action: PayloadAction<{ id: string } | null>) {
      state.selectedMarker = action.payload;
    },
    loadFavorites(state, action: PayloadAction<Offer[]>) {
      state.favorites = action.payload;
    },
  },
});
export const {
  loadOffers,
  setOffersDataLoadingStatus,
  loadOfferData,
  sendReview,
  highlightMarker,
  updateOffers,
  loadFavorites
} = offersProcess.actions;
