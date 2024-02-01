# Megaventory Test Case

This project is a web application designed to parse and display purchase orders retrieved from a simulated API. The application allows users to view a list of purchase orders and access detailed information about each order, with added features for product removal and order cancellation.

## Features

1. **Order List:**

   - Each list element displays the purchase order in the format `{PurchaseOrderTypeAbbreviation} – {PurchaseOrderNo}`.

2. **Order Details Popup:**

   - Clicking on an order opens a popup displaying additional information related to the order.

3. **Additional Information Fields:**

   - PurchaseOrderAddress
   - PurchaseOrderContactPerson
   - PurchaseOrderStatus
   - PurchaseOrderDetails (displayed as a table)

4. **Order Status Color Coding:**

   - Different colors represent various order statuses, enhancing visual understanding.
     - Green: Verified
     - Yellow: Pending
     - Red: Cancelled

5. **Order Actions:**

   - Users can remove products from the order.
   - Users can cancel the order.

6. **Sorting Table:**

   - Added sorting functionality to tables.
   - Users can sort any data (string or numeric).

## Usage

1. You can clone this repository

```bash
git clone https://github.com/Sezergumus/megaventory.git
```

2. I hosted it under my domain you can check it out from [here](https://megaventory.sezergumus.dev/).
