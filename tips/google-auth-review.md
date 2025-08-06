# Google 로그인 기능 검토 및 개선 제안

## 파일
- `oauth-login/useGoogleAuth.ts`
- `oauth-login/GoogleSignInButton.tsx`

## 분석

전반적으로 Google 로그인 기능은 잘 구현되어 있으나, 몇 가지 잠재적인 문제점과 개선할 점이 있습니다.

### 1. 스크립트 정리 로직 문제 (가장 중요)

**파일**: `oauth-login/useGoogleAuth.ts`

**문제점**:
`useEffect` 훅의 cleanup 함수가 컴포넌트가 언마운트될 때 Google 로그인 스크립트 태그를 DOM에서 제거합니다.
```typescript
// oauth-login/useGoogleAuth.ts

    return () => {
      if (document.getElementById(scriptId)) {
        document.head.removeChild(script);
      }
    };
```
만약 여러 컴포넌트나 페이지에서 `useGoogleAuth` 훅을 사용할 경우, 한 컴포넌트가 언마운트되면 다른 컴포넌트에서 필요한 스크립트가 사라져 Google 로그인이 동작하지 않는 심각한 문제가 발생할 수 있습니다. 스크립트는 한 번 로드되면 애플리케이션 전역에서 계속 사용 가능하도록 두는 것이 일반적입니다.

**해결책**:
`useEffect`의 cleanup 함수를 제거하여 스크립트가 제거되지 않도록 합니다.
```typescript
// oauth-login/useGoogleAuth.ts (수정 제안)

  useEffect(() => {
    const scriptId = "google-identity-script";
    if (document.getElementById(scriptId)) {
      setScriptLoaded(true);
      return; // 이미 스크립트가 있으므로 여기서 종료
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = (e) => {
      console.error("Failed to load Google Identity Services script", e);
      if (onError) onError(e);
    };
    document.head.appendChild(script);

    // cleanup 함수를 제거합니다.
    /*
    return () => {
      if (document.getElementById(scriptId)) {
        document.head.removeChild(script);
      }
    };
    */
  }, [onError]);
```

### 2. Google 초기화 함수 중복 호출 가능성

**파일**: `oauth-login/useGoogleAuth.ts`

**문제점**:
`window.google.accounts.id.initialize` 함수가 `scriptLoaded`, `clientId`, `onSuccess`, `onError`에 의존하는 `useEffect` 안에서 호출됩니다. `onSuccess`나 `onError` 콜백 함수가 부모 컴포넌트에서 렌더링마다 재생성되는 경우(예: `useCallback`으로 감싸지 않은 경우), 이 `useEffect`가 불필요하게 재실행되어 `initialize` 함수가 여러 번 호출될 수 있습니다. Google의 공식 문서에서는 이 함수를 한 번만 호출하도록 권장합니다.

**해결책**:
초기화가 한 번만 실행되도록 `useRef` 같은 장치를 사용하여 방지하거나, `initialize`를 의존성 배열이 비어있는 별도의 `useEffect`로 분리하는 것을 고려할 수 있습니다.

```typescript
// oauth-login/useGoogleAuth.ts (수정 제안)
  const initialized = useRef(false);

  useEffect(() => {
    if (scriptLoaded && window.google && !initialized.current) {
      initialized.current = true; // 초기화되었음을 표시
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: GoogleAuthResponse) => {
          // ... 기존 콜백 로직
        },
      });
    }
  }, [scriptLoaded, clientId, onSuccess, onError]);
```
또한, `useGoogleAuth` 훅을 사용하는 부모 컴포넌트에서 `onSuccess`와 `onError` 함수를 `useCallback`으로 감싸서 전달하는 것이 좋습니다.

### 3. Client ID 관리

**파일**: `oauth-login/GoogleSignInButton.tsx`, `oauth-login/useGoogleAuth.ts`

**문제점**:
`clientId`가 컴포넌트의 프롭(props)으로 전달되고 있습니다. 이는 유연성을 제공하지만, 모든 사용처에서 ID를 직접 입력해야 하므로 실수를 유발하거나 ID가 변경될 때 여러 파일을 수정해야 하는 번거로움이 있습니다.

**해결책**:
Next.js의 환경 변수(`.env.local`)를 사용하여 `clientId`를 관리하는 것이 좋습니다.
1.  프로젝트 루트에 `.env.local` 파일을 만들고 클라이언트 ID를 추가합니다.
    ```
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
    ```
2.  코드에서 환경 변수를 사용합니다.
    ```typescript
    // oauth-login/useGoogleAuth.ts 또는 GoogleSignInButton.tsx
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    // clientId를 props로 받지 않고 직접 할당
    ```
    이렇게 하면 `clientId`를 한 곳에서 관리할 수 있어 유지보수가 용이해지고, 민감한 정보가 코드에 직접 노출되지 않아 보안에도 도움이 됩니다.
