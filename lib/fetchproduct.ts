// lib/fetchProduct.ts
const BASE_URL = 'http://localhost:3000';
// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
export async function getProductByName(productname: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/products`, {
      method: 'POST',  // Change to POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productname }),  // Send productname in the payload
      cache: 'no-store',
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error('Error fetching product:', err);
    return null;
  }
}
