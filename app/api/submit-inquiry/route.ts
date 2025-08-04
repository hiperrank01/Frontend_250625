export async function POST(request: Request) {
  const formData = await request.json();
  console.log("Next.js에서 받은 formData:", formData);
  try {
    const googleRes = await fetch(
      "https://script.google.com/macros/s/AKfycbyxLK6MpqVilovMrG7XHGzLU5JH-k33GOF_Eu8TZ3mp5BEw_hdt5dsdwvxKXB1hUAuwDQ/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await googleRes.json();

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Google Sheet 전송 실패:", err);
    return new Response(JSON.stringify({ message: "구글 시트 전송 오류" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
