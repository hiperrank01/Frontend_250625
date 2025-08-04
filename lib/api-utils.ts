interface ErrorDataType {
  message: string;
  detail: string;
}

export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: ErrorDataType;
    try {
      errorData = await response.json();
    } catch (e) {
      throw new Error(`${e}: ${response.status} - ${response.statusText}`);
    }

    throw new Error(
      errorData.detail || errorData.message || "알 수 없는 오류가 발생했습니다."
    );
  }
  return response.json();
}
