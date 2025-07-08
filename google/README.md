# Google OAuth 2.0 프론트엔드 통합

이 폴더에는 프론트엔드에서 Google OAuth 2.0 통합을 용이하게 하는 컴포넌트 및 훅이 포함되어 있습니다. 클라이언트 측 인증을 위해 Google Identity Services를 사용합니다.

## 1. Google Cloud Console 설정

이 컴포넌트들을 사용하기 전에 Google Cloud Console에서 프로젝트를 설정해야 합니다:

1.  **프로젝트 생성**: 프로젝트가 없다면 [Google Cloud Console](https://console.cloud.google.com/)에서 새 프로젝트를 생성합니다.
2.  **Google Identity API 활성화**: "API 및 서비스" > "라이브러리"로 이동하여 "Google Identity API"를 검색합니다. 이를 활성화합니다.
3.  **OAuth 동의 화면 생성**: "API 및 서비스" > "OAuth 동의 화면"으로 이동합니다.
    - 사용자 유형으로 "외부"를 선택하고 필요한 정보(앱 이름, 사용자 지원 이메일, 개발자 연락처 정보)를 입력합니다.
    - 앱이 "테스트" 상태인 경우 테스트 사용자를 추가합니다.
4.  **사용자 인증 정보 생성**: "API 및 서비스" > "사용자 인증 정보"로 이동합니다.
    - "사용자 인증 정보 만들기" > "OAuth 클라이언트 ID"를 클릭합니다.
    - 애플리케이션 유형으로 "웹 애플리케이션"을 선택합니다.
    - 이름을 지정합니다 (예: "프론트엔드 OAuth 클라이언트").
    - **승인된 JavaScript 원본**: 개발 및 프로덕션 URL을 추가합니다 (예: `http://localhost:3000`, `https://your-domain.com`).
    - **승인된 리디렉션 URI**: 클라이언트 측 Google Identity Services (GSI)는 리디렉션을 내부적으로 처리하므로 일반적으로 필요하지 않습니다. 그러나 기존 OAuth 흐름을 사용할 계획이라면 여기에 리디렉션 URI를 추가합니다.
    - 생성 후 **클라이언트 ID**를 받게 됩니다. 이는 프론트엔드에 매우 중요합니다.

## 2. 컴포넌트 및 사용법

### `useGoogleAuth.ts`

이 커스텀 훅은 Google Identity Services JavaScript 라이브러리 로딩 및 Google Sign-In 클라이언트 초기화를 처리합니다. `GoogleSignInButton`과 같은 다른 컴포넌트에서 내부적으로 사용하도록 설계되었습니다.

**사용법 (내부):**

```typescript
import { useGoogleAuth } from "./useGoogleAuth";

const MyComponent = () => {
  const { scriptLoaded } = useGoogleAuth({
    clientId: "YOUR_GOOGLE_CLIENT_ID",
    onSuccess: (response) => {
      // ID 토큰 (response.credential)을 백엔드로 보내 검증합니다.
    },
    onError: (error) => {
      console.error("Google Auth Error:", error);
    },
  });

  // ... 컴포넌트의 나머지 부분
};
```

### `GoogleSignInButton.tsx`

이 React 컴포넌트는 사용자 정의 가능한 Google Sign-In 버튼을 렌더링합니다. 인증 흐름을 처리하기 위해 `useGoogleAuth`를 활용합니다.

**속성 (Props):**

- `clientId`: Google OAuth 2.0 클라이언트 ID (필수).
- `onSuccess`: 인증 성공 시 실행되는 콜백 함수. `credential` (ID 토큰) 및 `select_by`를 포함하는 객체를 받습니다.
- `onError`: 선택 사항. 인증 중 오류가 발생하면 실행되는 콜백 함수.
- `buttonText`: 선택 사항. 버튼 텍스트 (기본값: 'Sign in with Google').
- `theme`: 선택 사항. 버튼 테마 ('outline' | 'filled_blue' | 'filled_black', 기본값: 'outline').
- `size`: 선택 사항. 버튼 크기 ('large' | 'medium' | 'small', 기본값: 'large').
- `type`: 선택 사항. 버튼 유형 ('standard' | 'icon', 기본값: 'standard').
- `shape`: 선택 사항. 버튼 모양 ('rectangular' | 'pill' | 'circle' | 'square', 기본값: 'rectangular').
- `width`: 선택 사항. 버튼 너비 (예: '200px', '100%').

**사용법:**

```typescript jsx
import { GoogleSignInButton } from "./google/GoogleSignInButton";

const LoginPage = () => {
  const handleGoogleSuccess = (response: { credential?: string }) => {
    // ID 토큰을 백엔드 서버로 보내 검증
    // 백엔드는 토큰의 유효성, 발급자, 대상, 만료를 검증한 다음 사용자를 생성/인증
  };

  const handleGoogleError = (error: any) => {
    console.error("Google Sign-In Error:", error);
  };

  return (
    <div>
      <h1>로그인</h1>
      <GoogleSignInButton
        clientId="YOUR_GOOGLE_CLIENT_ID"
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        buttonText="Google로 로그인"
        theme="filled_blue"
        size="large"
        type="standard"
        shape="pill"
      />
    </div>
  );
};

export default LoginPage;
```

## 3. 보안 고려 사항 (매우 중요)

- **ID 토큰 검증**: `onSuccess`에서 받은 `credential`은 [JSON Web Token (JWT)](https://jwt.io/)입니다. **프론트엔드에서 이 토큰을 직접 신뢰해서는 안 됩니다.** 이 ID 토큰을 백엔드 서버로 보내 검증해야 합니다. 백엔드는 Google API 클라이언트 라이브러리(예: Node.js용 `google-auth-library`, Python용 `google-auth`)를 사용하여 토큰의 진위 여부, 발급자, 대상, 만료를 검증해야 합니다.
- **백엔드 인증**: 성공적인 검증 후 백엔드는 새 사용자 계정을 생성하거나(처음 로그인하는 경우) 기존 사용자를 로그인해야 합니다. 그런 다음 백엔드는 자체 세션 토큰(예: JWT, 세션 쿠키)을 프론트엔드로 발급해야 합니다. 이렇게 하면 애플리케이션의 인증 시스템이 제어권을 갖게 됩니다.
- **클라이언트 ID 노출**: Google 클라이언트 ID는 공개되며 프론트엔드에 노출되도록 되어 있습니다. 이는 비밀이 아닙니다.

## 4. 문제 해결

- **"잘못된 클라이언트 ID"**: Google Cloud Console에서 `clientId`를 다시 확인하고 코드에 사용된 것과 일치하는지 확인하십시오.
- **"원본 불일치"**: Google Cloud Console OAuth 클라이언트 ID 설정의 "승인된 JavaScript 원본"에 프론트엔드 애플리케이션이 실행되는 정확한 URL(포트 포함)이 포함되어 있는지 확인하십시오 (예: `http://localhost:3000`).
- **스크립트 로드 안 됨**: 브라우저의 개발자 콘솔에서 `https://accounts.google.com/gsi/client`와 관련된 네트워크 오류를 확인하십시오.
- **버튼 렌더링 안 됨**: 버튼의 `div` 요소에 `ref`가 있고 `GoogleSignInButton`의 `useEffect`가 실행되기 전에 DOM에 렌더링되는지 확인하십시오.
