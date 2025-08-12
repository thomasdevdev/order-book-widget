"use client";

/* TODO:
   – connect to /api/order-stream via EventSource or fetch‑stream
   – maintain bid/ask list in React state
   – render Material UI table, last price ticker, loading/error states
   – clean up on unmount
*/

import { useEffect, useState } from "react";
import get from "lodash/get";

type Price = {
  price: number;
  date: Date;
};

export default function OrderBook() {
  const [prices, setPrices] = useState<Price[]>([]);

  console.log("prices", prices);

  useEffect(() => {
    const source = new EventSource("/api/orders");

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setPrices((oldPrices) => [
        { price: get(data, "price", 0), date: new Date() },
        ...oldPrices,
      ]);
    };

    source.onerror = (err) => {
      source.close();
    };

    return () => {
      source.close();
    };
  }, []);

  return <div>OrderBookComponent</div>;
}
