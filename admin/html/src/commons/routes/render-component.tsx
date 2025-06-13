import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AuthAccess, PrivateAccess, PublicAccess } from "commons/securities";
import ErrorFallback from "commons/routes/error-boundary/error-fallback";
import RenderLoading from 'commons/routes/error-boundary/render-loading';
import HelmetComponent from "commons/header";
import LanguageComponent from "commons/languages";

const DashboardLayout = lazy(() => import("commons/layouts/dashboard"));
const AuthLayout = lazy(() => import("commons/layouts/auth"));

export const renderPublicComponent = (element: any) => {
  const isClient = !!(
    (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
  );
  
  return (
    <PublicAccess>
      <LanguageComponent>
        <HelmetComponent>
        {
          isClient ?
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={RenderLoading()}>
              <AuthLayout>
                {element}
              </AuthLayout>
            </Suspense>
          </ErrorBoundary> :
          {element}
        }
        </HelmetComponent>
      </LanguageComponent>
    </PublicAccess>
  )
}

export const renderAuthComponent = (element: any) => {
  const isClient = !!(
    (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
  );
  
  return (
    <AuthAccess>
      <LanguageComponent>
        <HelmetComponent>
        {
          isClient ?
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={RenderLoading()}>
              <AuthLayout>
                {element}
              </AuthLayout>
            </Suspense>
          </ErrorBoundary> :
          {element}
        }
        </HelmetComponent>
      </LanguageComponent>
    </AuthAccess>
  )
}

export const renderPrivateComponent = (element: any) => {
  const isClient = !!(
    (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
  );
  
  return (
    <PrivateAccess>
      <LanguageComponent>
        <HelmetComponent>
        {
          isClient ?
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={RenderLoading()}>
              <DashboardLayout>
                {element}
              </DashboardLayout>
            </Suspense>
          </ErrorBoundary> :
          {element}
        }
        </HelmetComponent>
      </LanguageComponent>
    </PrivateAccess>
  )
}