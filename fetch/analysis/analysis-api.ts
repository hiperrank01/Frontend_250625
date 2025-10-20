export const fetchProductInfo = async (
  data: { keyword: string; url: string },
  accessToken: string
) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL이 설정되지 않았습니다. 환경 변수를 확인해주세요.");
  }

  const res = await fetch(`${apiUrl}/api/ncc/product-info/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("상품 정보 조회 실패");
  return res.json();
};
