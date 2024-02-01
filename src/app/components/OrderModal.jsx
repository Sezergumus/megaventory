import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";

function OrderModal({
  isOpen,
  onOpenChange,
  selectedOrder,
  selectedProductData,
  setSelectedProductData,
  purchaseOrders,
  setPurchaseOrders,
}) {
  const [selectedProducts, setSelectedProducts] = useState(new Set([]));
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "ProductSKU",
    direction: "descending",
  });

  const cancelOrder = () => {
    const updatedPurchaseOrders = purchaseOrders.map((order) => {
      if (order.PurchaseOrderId === selectedOrder) {
        if (order.PurchaseOrderStatus === "Cancelled") {
          toast.error("Order already cancelled");
          return order;
        }
        toast.success("Order cancelled");
        return { ...order, PurchaseOrderStatus: "Cancelled" };
      } else {
        return order;
      }
    });

    setPurchaseOrders(updatedPurchaseOrders);
  };

  const removeProduct = () => {
    const updatedSet = new Set(selectedProducts);

    const removeAll = selectedProducts === "all";

    const updatedPurchaseOrders = purchaseOrders.map((order) => {
      if (removeAll) {
        if (order.PurchaseOrderId === selectedOrder) {
          return { ...order, PurchaseOrderDetails: [] };
        }
      }

      const updatedDetails = order.PurchaseOrderDetails.filter((detail) => {
        return !updatedSet.has(detail.PurchaseOrderRowDetailID.toString());
      });

      return { ...order, PurchaseOrderDetails: updatedDetails };
    });

    setSelectedProducts(new Set([]));

    setPurchaseOrders(updatedPurchaseOrders);
    toast.success("Product(s) removed from order");
  };

  const sortPurchaseOrderDetails = (details) => {
    const { column, direction } = sortDescriptor;

    const sortedDetails = [...details];

    sortedDetails.sort((a, b) => {
      const aValue = a[`PurchaseOrderRow${column}`];
      const bValue = b[`PurchaseOrderRow${column}`];

      const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

      if (isNumeric(aValue) && isNumeric(bValue)) {
        return direction === "ascending" ? aValue - bValue : bValue - aValue;
      } else {
        return direction === "ascending"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      }
    });

    return sortedDetails;
  };

  useEffect(() => {
    if (selectedProductData) {
      const updatedProductData = {
        ...selectedProductData,
        PurchaseOrderDetails: sortPurchaseOrderDetails(
          selectedProductData.PurchaseOrderDetails
        ),
      };

      setSelectedProductData(updatedProductData);
    }
  }, [sortDescriptor]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(value) => {
        onOpenChange(value);
        setSelectedProducts(new Set([]));
      }}
      size={"5xl"}
      backdrop={"blur"}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Order {selectedOrder}
            </ModalHeader>
            <ModalBody>
              {selectedProductData && (
                <>
                  <p className="font-bold">
                    Address:{" "}
                    <span className="opacity-60 font-normal">
                      {selectedProductData.PurchaseOrderAddress}
                    </span>
                  </p>
                  <p className="font-bold">
                    Contact:{" "}
                    <span className="opacity-60 font-normal">
                      {selectedProductData.PurchaseOrderContactPerson}
                    </span>
                  </p>
                  <p className="font-bold">
                    Order Status:{" "}
                    <span className="opacity-60 font-normal">
                      {selectedProductData.PurchaseOrderStatus}
                    </span>
                  </p>
                  <Table
                    color="primary"
                    selectionMode="multiple"
                    aria-label="Example static collection table"
                    selectedKeys={selectedProducts}
                    onSelectionChange={(keys) => {
                      setSelectedProducts(keys);
                    }}
                    sortDescriptor={sortDescriptor}
                    onSortChange={(sort) => {
                      setSortDescriptor({
                        column: sort.column,
                        direction: sort.direction,
                      });
                    }}
                  >
                    <TableHeader>
                      <TableColumn key="ProductSKU" allowsSorting>
                        Product SKU
                      </TableColumn>
                      <TableColumn key="Quantity" allowsSorting>
                        Quantity Ordered
                      </TableColumn>
                      <TableColumn
                        key="UnitPriceWithoutTaxOrDiscount"
                        allowsSorting
                      >
                        Unit Price
                      </TableColumn>
                      <TableColumn key="TotalAmount" allowsSorting>
                        Total Amount
                      </TableColumn>
                    </TableHeader>
                    <TableBody>
                      {selectedProductData.PurchaseOrderDetails.map(
                        (detail) => (
                          <TableRow key={detail.PurchaseOrderRowDetailID}>
                            <TableCell>
                              {detail.PurchaseOrderRowProductSKU}
                            </TableCell>
                            <TableCell>
                              {detail.PurchaseOrderRowQuantity}
                            </TableCell>
                            <TableCell>
                              {
                                detail.PurchaseOrderRowUnitPriceWithoutTaxOrDiscount
                              }
                            </TableCell>
                            <TableCell>
                              {detail.PurchaseOrderRowTotalAmount}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={cancelOrder}>
                Cancel Order
              </Button>
              <Button
                color="primary"
                isDisabled={selectedProducts.size === 0}
                onPress={removeProduct}
              >
                Remove Product
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default OrderModal;
