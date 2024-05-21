import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const voucherApi = createApi({
  reducerPath: "voucherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getVouchers: builder.query({
      query: () => ({
        url: "api/voucher/get-vouchers",
      }),
    }),
  }),
});

export const { useGetVouchersQuery } = voucherApi;
