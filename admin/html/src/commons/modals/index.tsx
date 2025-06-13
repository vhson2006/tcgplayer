import { lazy, Suspense } from "react";
import ErrorFallback from "commons/routes/error-boundary/error-fallback";
import RenderLoading from "commons/routes/error-boundary/render-loading";
import { ErrorBoundary } from "react-error-boundary";
import { DELETE_CONFIRMATION_MODAL } from "commons/modals/components/DeleteConfirmationModal";
import { DOWNLOAD_CONFIRMATION_MODAL } from "commons/modals/components/DownloadConfirmationModal";
import { MASS_CHANGE_EMPLOYEE_MODAL } from "components/dashboard/organisation/employee/popups/ChangeEmployeeModal";
import { MASS_CHANGE_COMMENT_MODAL } from "components/dashboard/setting/comment/popups/ChangeCommentModal";

const DeleteConfirmationModal = lazy(() => import("commons/modals/components/DeleteConfirmationModal"));
const DownloadConfirmationModal = lazy(() => import("commons/modals/components/DownloadConfirmationModal"));
const MassChangeEmployeeModal = lazy(() => import("components/dashboard/organisation/employee/popups/ChangeEmployeeModal"));
const MassChangeCommentModal = lazy(() => import("components/dashboard/setting/comment/popups/ChangeCommentModal"));

const renderComponent = (element: any) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={RenderLoading()}>
        {element}
      </Suspense>
    </ErrorBoundary>
  )
}

const ModalComponent = (props: any) => {
  const { type, data = {} } = props;
  switch(type) {
    case DELETE_CONFIRMATION_MODAL: 
      return renderComponent(<DeleteConfirmationModal {...data}/>)
    case MASS_CHANGE_EMPLOYEE_MODAL:
      return renderComponent(<MassChangeEmployeeModal {...data}/>)
    case DOWNLOAD_CONFIRMATION_MODAL:
      return renderComponent(<DownloadConfirmationModal {...data}/>)
    case MASS_CHANGE_COMMENT_MODAL:
      return renderComponent(<MassChangeCommentModal {...data}/>)  
  }
  
  return <></>
}

export default ModalComponent;