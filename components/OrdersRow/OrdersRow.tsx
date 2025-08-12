import get from "lodash/get";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import type { Order } from "../../app/types";
import isNumber from "lodash/isNumber";
import isDate from "lodash/isDate";
import { format } from "date-fns";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowsAltH } from "react-icons/fa";

interface OrderRowProps {
  order: Order;
  prevOrder: Order;
}

const OrderRow = ({ order, prevOrder }: OrderRowProps) => {
  const price = isNumber(get(order, "price"))
    ? new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
      }).format(order.price)
    : 0;
  const date = isDate(get(order, "date"))
    ? format(order.date, "yyyy-MM-dd HH:mm:ss")
    : 0;
  const status =
    !isNumber(get(order, "price")) || !isNumber(get(prevOrder, "price")) ? (
      <FaArrowsAltH style={{ color: "orange" }} />
    ) : order.price > prevOrder.price ? (
      <FaArrowUp style={{ color: "green" }} />
    ) : order.price < prevOrder.price ? (
      <FaArrowDown style={{ color: "red" }} />
    ) : (
      <FaArrowsAltH style={{ color: "orange" }} />
    );

  return (
    <TableRow>
      <TableCell>{price}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{status}</TableCell>
    </TableRow>
  );
};

export default OrderRow;
