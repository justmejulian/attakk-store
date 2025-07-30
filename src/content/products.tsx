export type Product = {
  id: string;
  imageUrls: [string, string];
  title: string;
  price: number;
};

const products: Product[] = [
  {
    id: '1',
    imageUrls: [
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      'https://images.unsplash.com/photo-1523381140794-a1eef18a37c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjQ2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
    ],
    title: 'Basic Tee',
    price: 40,
  },
];

export function getProducts(): Product[] {
  return products;
}
