"use client";

import data from "./purchaseorders.json";
import OrdersList from "./components/OrdersList";
import OrderModal from "./components/OrderModal";
import { useDisclosure } from "@nextui-org/react";

import React, { useEffect, useState } from "react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProductData, setSelectedOrderData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setPurchaseOrders(data.mvPurchaseOrders);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      setSelectedOrderData(
        purchaseOrders.find((order) => order.PurchaseOrderId === selectedOrder)
      );
    }
  }, [selectedOrder]);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {loading ? (
        <div>
          Loading... &#40;Simulating a 1 second API call with timeout&#41;
        </div>
      ) : (
        <OrdersList
          purchaseOrders={purchaseOrders}
          onOpen={onOpen}
          setSelectedOrder={setSelectedOrder}
        />
      )}
      <OrderModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedOrder={selectedOrder}
        selectedProductData={selectedProductData}
      />
    </div>
  );
}
