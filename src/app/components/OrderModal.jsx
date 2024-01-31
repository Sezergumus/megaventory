import React, { useState } from "react";
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

function OrderModal({
  isOpen,
  onOpenChange,
  selectedOrder,
  selectedProductData,
}) {
  const [selectedProducts, setSelectedOrders] = useState(new Set());

  const deleteOrder = () => {
    alert("Order deleted");
  };

  const removeProduct = () => {
    alert("Product removed");
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"5xl"}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Product {selectedOrder}
            </ModalHeader>
            <ModalBody>
              {selectedProductData && (
                <>
                  <p>Address: {selectedProductData.PurchaseOrderAddress}</p>
                  <p>
                    Contact: {selectedProductData.PurchaseOrderContactPerson}
                  </p>
                  <p>Order Status: {selectedProductData.PurchaseOrderStatus}</p>
                  <Table
                    color="primary"
                    selectionMode="multiple"
                    aria-label="Example static collection table"
                    selectedKeys={selectedProducts}
                  >
                    <TableHeader>
                      <TableColumn>Product SKU</TableColumn>
                      <TableColumn>Quantity Ordered</TableColumn>
                      <TableColumn>Unit Price</TableColumn>
                      <TableColumn>Total Amount</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {selectedProductData.PurchaseOrderDetails.map(
                        (detail) => (
                          <TableRow key={detail.PurchaseOrderRowDetailId}>
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
              <Button color="danger" variant="light" onPress={deleteOrder}>
                Cancel Order
              </Button>
              <Button color="primary" onPress={removeProduct}>
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
