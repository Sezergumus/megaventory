"use client";

import { Link } from "@nextui-org/react";
import data from "./purchaseorders.json";
import { Button } from "@nextui-org/button";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPurchaseOrders(data.mvPurchaseOrders);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {loading ? (
        <div>
          Loading... &#40;Simulating a 1 second API call with timeout&#41;
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-bold">Purchase Orders</h1>
          <ul>
            {purchaseOrders.map((order) => (
              <li key={order.PurchaseOrderId}>
                <a
                  onClick={() => {
                    console.log(
                      "Clicked on Purchase Order: " + order.PurchaseOrderId
                    );
                  }}
                  className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  {order.PurchaseOrderTypeAbbreviation +
                    " - " +
                    order.PurchaseOrderId}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
