export const fetchProductInfo = async (
  data: { keyword: string; url: string },
  accessToken: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ncc/product-info/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error("상품 정보 조회 실패");
  return res.json();
};
