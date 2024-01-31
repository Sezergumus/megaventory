"use client";

import data from "./purchaseorders.json";
import OrdersList from "./components/OrdersList";
import OrderModal from "./components/OrderModal";
import { useDisclosure } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

import { CircularProgress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProductData, setSelectedProductData] = useState(null);
  const [loadingValue, setLoadingValue] = useState(0);

  useEffect(() => {
    setPurchaseOrders(data.mvPurchaseOrders);

    const interval = setInterval(() => {
      setLoadingValue((v) => {
        if (v >= 100) {
          setLoading(false);
          clearInterval(interval);
          return 0;
        } else {
          return v + 10;
        }
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      setSelectedProductData(
        purchaseOrders.find((order) => order.PurchaseOrderId === selectedOrder)
      );
    }
  }, [selectedOrder, purchaseOrders]);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {loading ? (
        <>
          <CircularProgress
            aria-label="Loading..."
            size="lg"
            value={loadingValue}
            color="primary"
            showValueLabel={true}
            label="Loading..."
          />
        </>
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
        setSelectedProductData={setSelectedProductData}
        purchaseOrders={purchaseOrders}
        setPurchaseOrders={setPurchaseOrders}
      />
      <Toaster position="bottom-right" />
    </div>
  );
}
