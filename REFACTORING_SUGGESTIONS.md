# 구글 로그인 로직 개선 사항 정리

기존 구글 로그인 로직의 보안, 안정성, 코드 효율성 및 사용자 경험을 개선하기 위해 다음과 같이 리팩토링을 진행했습니다.

---

### 1. 보안 및 설정 관리 강화 (환경 변수 사용)

**문제점 (Before):**
Google Client ID가 코드 내에 직접 하드코딩되어 있어 보안에 취약하고, 개발/프로덕션 환경에 따라 다른 ID를 사용하기 어려웠습니다.

```tsx
// components/modal/login-modal.tsx (Before)
<GoogleSignInButton
  clientId="81819910903-50gnefig8q092lfihklimae08cebf2of.apps.googleusercontent.com" // ID가 코드에 노출됨
  onSuccess={handleGoogleSuccess}
  onError={handleGoogleError}
  // ...
/>
```

**개선 내용 (After):**
Next.js의 환경 변수 기능을 활용하여 Client ID를 코드와 분리했습니다.

1.  프로젝트 루트에 `.env.local` 파일을 생성하고 환경 변수를 등록합니다.
    ```
    # .env.local
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=81819910903-50gnefig8q092lfihklimae08cebf2of.apps.googleusercontent.com
    ```
2.  코드에서는 `process.env`를 통해 안전하게 값을 불러옵니다.

```tsx
// components/modal/login-modal.tsx (After)
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

// ...

<GoogleSignInButton
  clientId={clientId} // 환경 변수 사용
  // ...
/>
```

**기대 효과:**
-   **보안 강화:** 민감할 수 있는 정보를 소스 코드에서 분리하여 Git과 같은 버전 관리에 노출되지 않도록 합니다.
-   **유연성 증대:** 각 배포 환경(.env.development, .env.production)에 맞는 설정 파일을 통해 손쉽게 다른 Client ID를 적용할 수 있습니다.

---

### 2. 로직 단일화 및 효율성 증대

**문제점 (Before):**
구글 로그인 성공 시의 로직(`handleGoogleSuccess`)이 여러 책임을 동시에 수행하고 있었습니다.
-   백엔드 API 호출
-   프론트엔드에서 자체적으로 토큰 디코딩
-   디코딩한 정보로 전역 상태 업데이트

이는 백엔드의 역할과 중복되며, 상태 관리의 신뢰성을 떨어뜨리는 원인이 됩니다.

```tsx
// components/modal/login-modal.tsx (Before)
const handleGoogleSuccess = (response) => {
  const idToken = response.credential;
  if (idToken) {
    loginWithGoogle(idToken); // 1. 백엔드 요청
  }
  if (idToken) { // 2. 불필요한 중복 체크
    const decoded = decodeGoogleIdToken(idToken); // 3. 프론트에서 토큰 해석
    if (decoded) {
      useAuthStore.getState().setAuth("google", decoded.email, decoded.name); // 4. 프론트 기준으로 상태 변경
      onClose();
    }
  }
};
```

**개선 내용 (After):**
역할과 책임을 명확히 분리했습니다.
-   **컴포넌트 (`LoginModal`)**: 구글로부터 받은 ID 토큰을 백엔드에 전송하는 **요청 트리거** 역할만 수행합니다.
-   **React Query 훅 (`useGoogleLogin`)**: API 요청의 `onSuccess` 콜백에서 **모든 성공 로직** (토큰 저장, 전역 상태 업데이트, UI 피드백)을 처리합니다. 이제 백엔드 응답이 **신뢰의 유일한 원천(Single Source of Truth)**이 됩니다.

```tsx
// components/modal/login-modal.tsx (After)
// 1. 성공/실패 처리는 모두 useGoogleLogin 훅에 위임
const { mutate: loginWithGoogle, isPending: isGoogleLoginPending } = useGoogleLogin(
  (data) => {
    // 백엔드가 검증 후 내려준 데이터로만 상태를 업데이트 (신뢰성 확보)
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    useAuthStore.getState().setAuth(data.access, data.user.eml_adr, data.user.nm);
    toast.success("Google 계정으로 로그인되었습니다!");
    onClose();
  },
  (err) => { /* 에러 처리 */ }
);

// 2. 핸들러 함수는 API 호출만 담당하도록 단순화
const handleGoogleSuccess = (response) => {
  if (response.credential) {
    loginWithGoogle(response.credential);
  }
};
```

**기대 효과:**
-   **코드 품질 향상:** 컴포넌트와 비즈니스 로직의 역할이 명확히 분리됩니다.
-   **안정성 및 일관성:** 백엔드 응답을 기준으로만 상태를 변경하므로 데이터 정합성이 보장되며, 일반 로그인과 구글 로그인의 성공 로직이 통일됩니다.

---

### 3. API 통신 안정성 강화

**문제점 (Before):**
`api/auth-api.ts`의 `googleLogin` 함수에서 서버 응답이 실패(e.g., 4xx, 5xx 에러)했을 때, 응답이 JSON이 아닐 경우 에러를 발생시키며 앱이 멈출 수 있었습니다.

```typescript
// api/auth-api.ts (Before)
export async function googleLogin(idToken: string) {
  const res = await fetch(/* ... */);
  const data = await res.json(); // 응답 성공 여부와 관계없이 JSON 파싱 시도

  if (!res.ok) { // 이후에 상태 체크
    throw new Error(data.message || "구글 로그인 실패");
  }
  return data;
}
```

**개선 내용 (After):**
`res.ok` 프로퍼티를 통해 HTTP 상태 코드를 먼저 확인하고, 실패했을 경우에만 에러 응답에 대한 JSON 파싱을 시도하도록 순서를 변경하여 안정성을 높였습니다.

```typescript
// api/auth-api.ts (After)
export async function googleLogin(idToken: string) {
  const res = await fetch(/* ... */);

  if (!res.ok) { // 1. 응답 상태 먼저 체크
    let errorData;
    try {
      errorData = await res.json(); // 2. 실패 시에만 JSON 파싱 시도
    } catch (e) {
      throw new Error(`서버 에러: ${res.status} - ${res.statusText}`);
    }
    throw new Error(errorData.message || "구글 로그인에 실패했습니다.");
  }

  return res.json(); // 3. 성공 시에만 JSON 파싱
}
```

**기대 효과:**
-   **안정성 향상:** 예상치 못한 서버 에러(HTML 에러 페이지 등)에도 앱이 중단되지 않고 에러를 정상적으로 처리할 수 있습니다.

---

### 4. 사용자 경험(UX) 개선

**문제점 (Before):**
구글 로그인 버튼 클릭 후 백엔드 응답이 오기까지 아무런 시각적 피드백이 없었습니다. 이로 인해 사용자는 요청이 처리 중인지 알 수 없었고, 버튼을 중복 클릭할 위험이 있었습니다.

**개선 내용 (After):**
React Query가 제공하는 `isPending` 상태를 활용하여 로딩 중임을 명확히 알려줍니다.
-   로그인 요청이 진행 중일 때(`isPending === true`):
    -   모달 전체에 로딩 스피너가 있는 오버레이를 표시합니다.
    -   모든 버튼(일반 로그인, 구글 로그인, 회원가입)을 비활성화하여 중복 요청을 방지합니다.

```tsx
// components/modal/login-modal.tsx (After)
const isPending = isLoginPending || isGoogleLoginPending;

return (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      {isPending && ( // 로딩 오버레이 표시
        <div className="absolute inset-0 ...">
          <LoadingSpinner />
        </div>
      )}
      {/* ... */}
      <DialogFooter>
        {/* 버튼들에 disabled={isPending} 속성 추가 */}
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
```

**기대 효과:**
-   **사용자 경험 향상:** 사용자가 시스템이 요청을 처리하고 있음을 인지하여 안정감을 느끼고, 불필요한 액션을 방지할 수 있습니다.