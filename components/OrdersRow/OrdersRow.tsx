import get from "lodash/get";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import type { Order } from "../../app/types";
import isNumber from "lodash/isNumber";
import isDate from "lodash/isDate";
import { format } from "date-fns";

interface OrderRowProps {
  order: Order;
}

const OrderRow = ({ order }: OrderRowProps) => {
  const price = isNumber(get(order, "price"))
    ? new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
      }).format(order.price)
    : 0;
  const date = isDate(get(order, "date"))
    ? format(order.date, "yyyy-MM-dd HH:mm:ss")
    : 0;

  return (
    <TableRow>
      <TableCell>{price}</TableCell>
      <TableCell>{date}</TableCell>
    </TableRow>
  );
};

export default OrderRow;
