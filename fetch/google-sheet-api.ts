import { GoogleData } from "@/types/google-sheet";

export const sendInquiryToSheet = async (formData: GoogleData) => {
  const res = await fetch(`/api/submit-inquiry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Google Sheet API 요청 실패");
  }

  return res.json();
};
