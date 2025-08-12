import { useEffect, useState } from "react";
import get from "lodash/get";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { Order } from "../../app/types";
import OrderRow from "../OrdersRow/OrdersRow";
import isEqual from "lodash/isEqual";

const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const source = new EventSource("/api/orders");

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setOrders((prevOrders) => [
        { price: get(data, "price", 0), date: new Date() },
        ...prevOrders.slice(0, 19),
      ]);
    };

    source.onerror = () => {
      source.close();
    };

    return () => {
      source.close();
    };
  }, []);

  return (
    <TableContainer
      component={Paper}
      style={{ maxWidth: 400, margin: "auto", marginTop: 20 }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <OrderRow
              key={index}
              order={order}
              prevOrder={get(orders, [
                isEqual(index, orders.length + 1) ? index : index + 1,
              ])}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
