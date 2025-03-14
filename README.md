# Food Store Ooca API

This project is a NestJS-based API for calculating the total cost of an order at a food store. The API includes support for membership discounts, special item discounts, and validation for incoming orders.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [POST /order/calculate](#post-ordercalculate)
- [Testing](#testing)

## Overview

This API allows users to submit an order and calculate the total cost based on the menu items and their quantities. The service also handles membership discounts and special set discounts for certain items.

### Features:

- **Order Calculation**: Calculates the total cost based on item prices.
- **Member Discounts**: Members receive a discount (10% off total).
- **Set Discounts**: Some menu items apply special discounts when ordered in specific quantities.
- **Validation**: All input is validated using class-validator to ensure correct data formatting.

## Installation

### Prerequisites

Ensure the following tools are installed:

- Node.js (v18 or later)
- pnpm (package manager)

### Steps to Set Up:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/food-store-ooca-api.git
   cd food-store-ooca-api
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables (if required, create a `.env` file in the root directory).

4. Run the application in development mode:

   ```bash
   pnpm start:dev
   ```

   This will start the NestJS server at `http://localhost:3000`.

## Usage

### API Endpoints

#### POST /api/order/calculate

This endpoint calculates the total cost of an order based on the items selected and their quantities. Optionally, it also applies a membership discount if the `isMember` flag is set to `true`.

##### Request Body:

```json
{
  "order": [
    {
      "name": "Red",
      "quantity": 2
    },
    {
      "name": "Blue",
      "quantity": 1
    }
  ],
  "isMember": false
}
```

- **order**: An array of objects where each object represents an item in the order.
  - **name**: The name of the item (must be one of the available menu items: `Red`, `Blue`, `Pink`, `Green`, `Orange`, `Yellow`, `Purple`).
  - **quantity**: Quantity of the item ordered (must be >= 1).
- **isMember**: Optional boolean value. If `true`, applies a 10% member discount..


## Testing

This project uses Jest for testing. You can run tests for the application using the following commands:

- **Run Unit Tests**:

   ```bash
   pnpm test
   ```

