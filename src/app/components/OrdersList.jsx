import React from "react";

function OrdersList({ purchaseOrders, onOpen, setSelectedOrder }) {
  return (
    <div>
      <h1 className="text-xl font-bold">Purchase Orders</h1>
      <ul>
        {purchaseOrders.map((order) => (
          <li key={order.PurchaseOrderId}>
            <a
              onClick={() => {
                setSelectedOrder(order.PurchaseOrderId);
                onOpen();
              }}
              className={`opacity-80 hover:opacity-100 transition-opacity cursor-pointer text-lg
              ${
                order.PurchaseOrderStatus === "Cancelled"
                  ? "text-cancelled"
                  : ""
              }
                ${order.PurchaseOrderStatus === "Pending" ? "text-pending" : ""}
                ${
                  order.PurchaseOrderStatus === "Verified"
                    ? "text-verified"
                    : ""
                }
              `}
            >
              {order.PurchaseOrderTypeAbbreviation +
                " - " +
                order.PurchaseOrderId}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white">
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-pending"></div>
          <p>Pending</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-verified"></div>
          <p>Verified</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-cancelled"></div>
          <p>Cancelled</p>
        </div>
      </div>
    </div>
  );
}

export default OrdersList;
