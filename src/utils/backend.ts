const ATTAKK_BACKEND_API_URL =
  import.meta.env?.ATTAKK_BACKEND_API_URL || process.env.ATTAKK_BACKEND_API_URL;

export type LineItem = {
  price_id: string;
  quantity: number;
};

export type CreateOrderRequest = {
  email: string;
  phone: string;
  line_items: LineItem[];
};

export type CreateOrderResponseData = {
  reference_number: string;
  email: string;
  created_at: string;
};

export type ErrorResponse = {
  code: string;
  message: string;
};

export type CreateOrderResponse = {
  success: boolean;
  data?: CreateOrderResponseData;
  error?: string | ErrorResponse;
};

export async function createOrder(
  email: string,
  phone: string,
  lineItems: LineItem[],
): Promise<string> {
  const body: CreateOrderRequest = {
    email,
    phone,
    line_items: lineItems,
  };

  if (!ATTAKK_BACKEND_API_URL) {
    console.error('ERROR: Missing ATTAKK_BACKEND_API_URL environment variable');
    throw new Error('Missing ATTAKK_BACKEND_API_URL');
  }

  const url = `${ATTAKK_BACKEND_API_URL}/orders`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to create order:', errorText);
    throw new Error(`Failed to create order: ${response.status}`);
  }

  const result: CreateOrderResponse = await response.json();

  if (!result.success || !result.data?.reference_number) {
    const errorMessage =
      typeof result.error === 'string'
        ? result.error
        : (result.error as ErrorResponse)?.message || 'Failed to create order';
    throw new Error(errorMessage);
  }

  return result.data.reference_number;
}

export type Order = {
  id: string;
  email: string;
  phone: string;
  line_items: LineItem[];
  created_at: string;
};

export type GetOrdersResponse = {
  success: boolean;
  data?: Order[];
  error?: string | ErrorResponse;
};

export async function getOrders(): Promise<Order[]> {
  if (!ATTAKK_BACKEND_API_URL) {
    console.error('ERROR: Missing ATTAKK_BACKEND_API_URL environment variable');
    throw new Error('Missing ATTAKK_BACKEND_API_URL');
  }
  const url = `${ATTAKK_BACKEND_API_URL}/orders`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to fetch orders:', errorText);
    throw new Error(`Failed to fetch orders: ${response.status}`);
  }

  const result: GetOrdersResponse = await response.json();

  if (!result.success || !result.data) {
    const errorMessage =
      typeof result.error === 'string'
        ? result.error
        : (result.error as ErrorResponse)?.message || 'Failed to fetch orders';
    throw new Error(errorMessage);
  }

  return result.data;
}

export type ProductStat = {
  price_id: string;
  total_quantity: number;
};

export type ProductStatsResponse = {
  success: boolean;
  data?: {
    products: ProductStat[];
    summary: {
      total_orders: number;
      total_items: number;
    };
  };
  error?: string | ErrorResponse;
};

export async function getOrderedQuantities(): Promise<Record<string, number>> {
  const url = `${ATTAKK_BACKEND_API_URL}/stats/products`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to fetch product stats:', errorText);
    throw new Error(`Failed to fetch product stats: ${response.status}`);
  }

  const result: ProductStatsResponse = await response.json();

  if (!result.success || !result.data) {
    const errorMessage =
      typeof result.error === 'string'
        ? result.error
        : (result.error as ErrorResponse)?.message ||
          'Failed to fetch product stats';
    throw new Error(errorMessage);
  }

  const quantities: Record<string, number> = {};

  for (const product of result.data.products) {
    quantities[product.price_id] = product.total_quantity;
  }

  return quantities;
}
