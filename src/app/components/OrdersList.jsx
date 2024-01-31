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
              className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer text-lg"
            >
              {order.PurchaseOrderTypeAbbreviation +
                " - " +
                order.PurchaseOrderId}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersList;
