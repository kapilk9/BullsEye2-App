import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCoinData = createAsyncThunk('fetchCoin', async () => {
  try {
    const response = await axios.get(
      'https://scripts.bulleyetrade.com/api/getMarket',
    );
    const result = response.data.Data;
    return result;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
});

export const getLiveTrade = createAsyncThunk('LiveTrade', async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      'https://scripts.bulleyetrade.com/api/trades?type=active',
      config,
    );
    const Data = response.data.Data.activeTrades; // <-- Corrected property name
    return Data;
    // console.log('livekkk', Data);
  } catch (error) {
    console.log('error', error);
  }
});



export const getPastTrade = createAsyncThunk('PastTrade', async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      'https://scripts.bulleyetrade.com/api/trades?type=past',
      config,
    );
    const Data = response.data.Data.pastTrades; // <-- Corrected property name
    return Data;
    console.log('past Trade', response);
  } catch (error) {
    console.log('error', error);
  }
});

export const initWatchlistData = createAsyncThunk('initWatchlist', async () => {
  try {
    const storedData = await AsyncStorage.getItem('watchlistData');
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return [];
    }
  } catch (error) {
    console.log('error', error);
    throw error;
  }
});

export const coinSlice = createSlice({
  name: 'coin',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
    isTradeModalVisible: false,
    counter: 1,
    watchlistData: [],
    liveTradedata: [],
    pastTradedata: [],
  },
  reducers: {
    setIsTradeModalVisible: (state, action) => {
      state.isTradeModalVisible = action.payload;
    },
    incrementCounter: (state, action) => {
      state.counter += 1;
    },
    decrementCounter: (state, action) => {
      state.counter -= 1;
    },
    addToWatchlist: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.watchlistData.find(
        item => item.id === newItem.id,
      );
      if (!existingItem) {
        state.watchlistData.push(newItem);
        AsyncStorage.setItem(
          'watchlistData',
          JSON.stringify(state.watchlistData),
        );
      }
      // console.log("SDs",existingItem)
    },

    removeAllFromWatchlist: state => {
      return [];
    },

    removeFromWatchlist: (state, action) => {
      const itemId = action.payload;
      state.watchlistData = state.watchlistData.filter(
        item => item.id !== itemId,
      );
      AsyncStorage.setItem(
        'watchlistData',
        JSON.stringify(state.watchlistData),
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCoinData.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchCoinData.fulfilled, (state, action) => {
      // console.log("response",response)
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCoinData.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });

    // watchlist added app refresh data come
    builder.addCase(initWatchlistData.fulfilled, (state, action) => {
      state.watchlistData = action.payload;
    });

    //  Live Trade data fetch here

    builder.addCase(getLiveTrade.fulfilled, (state, action) => {
      state.liveTradedata = action.payload;
    });

    // paast trade data fetch here

    builder.addCase(getPastTrade.fulfilled, (state, action) => {
      state.pastTradedata = action.payload;
    });
  },
});

export const {
  setIsTradeModalVisible,
  incrementCounter,
  decrementCounter,
  addToWatchlist,
  removeFromWatchlist,
  removeAllFromWatchlist,
} = coinSlice.actions;
export default coinSlice.reducer;
export const selectIsTradeModalVisible = state =>
  state.coin.isTradeModalVisible;
