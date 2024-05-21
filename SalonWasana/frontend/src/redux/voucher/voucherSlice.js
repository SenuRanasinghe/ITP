import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";


const initialState = {
    items: [],
    status :null,
    error : null,
};



export const voucherFetch = createAsyncThunk(
  "vouchers/vouchersFetch",
  async (_, { signal, rejectWithValue }) => {
    try {
      const response = await fetch("/api/voucher/get-vouchers", { signal });
      if (!response.ok) {
        throw new Error("Failed to fetch vouchers");
      }
      const data = await response.json(); // Parse JSON response
      return data;
    } catch (error) {
      return rejectWithValue(error.message); // Pass error message to rejected action
    }
  }
);

const voucherSlice = createSlice({
    name :"vouchers",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(voucherFetch.pending, (state, action) => {
            state.status = "pending";
          })
          .addCase(voucherFetch.fulfilled, (state, action) => {
            state.status = "success";
            state.items = action.payload;
          })
          .addCase(voucherFetch.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
          });
    },
});

export default voucherSlice.reducer;

