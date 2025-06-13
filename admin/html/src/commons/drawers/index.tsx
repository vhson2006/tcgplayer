import { lazy, Suspense } from "react";
import ErrorFallback from "commons/routes/error-boundary/error-fallback";
import RenderLoading from "commons/routes/error-boundary/render-loading";
import { ErrorBoundary } from "react-error-boundary";
import { ADD_EMPLOYEE_DRAWER } from "components/dashboard/organisation/employee/popups/AddEmployeeDrawer";
import { ADD_NEWS_DRAWER } from "components/dashboard/announce/news/popups/AddDrawer";
import { ADD_TAG_DRAWER } from "components/dashboard/setting/tag/popups/AddDrawer";
import { ADD_CATEGORY_DRAWER } from "components/dashboard/setting/category/popups/AddDrawer";
import { ADD_EMAIL_DRAWER } from "components/dashboard/setting/email/popups/AddDrawer";
import { ADD_MEDIA_DRAWER } from "components/dashboard/setting/media/popups/AddDrawer";
import { ADD_ACCESS_CODE_DRAWER } from "components/dashboard/setting/access-code/popups/AddDrawer";
import { ADD_ROLE_DRAWER } from "components/dashboard/organisation/role/popups/AddDrawer";
import { ADD_GENERATE_DRAWER } from "components/dashboard/announce/generate/popups/AddDrawer";
import { ADD_PRODUCT_DRAWER } from "components/dashboard/business/product/popups/AddDrawer";
import { ADD_ORDER_DRAWER } from "components/dashboard/business/order/popups/AddDrawer";
import { ADD_CUSTOMER_DRAWER } from "components/dashboard/customer/customer/popups/AddDrawer";
import { ADD_VOUCHER_DRAWER } from "components/dashboard/customer/voucher/popups/AddDrawer";

const AddEmployeeDrawer = lazy(() => import("components/dashboard/organisation/employee/popups/AddEmployeeDrawer"));
const AddNewsDrawer = lazy(() => import("components/dashboard/announce/news/popups/AddDrawer"));
const AddTagDrawer = lazy(() => import("components/dashboard/setting/tag/popups/AddDrawer"));
const AddCategoryDrawer = lazy(() => import("components/dashboard/setting/category/popups/AddDrawer"));
const AddEmailDrawer = lazy(() => import("components/dashboard/setting/email/popups/AddDrawer"));
const AddMediaDrawer = lazy(() => import("components/dashboard/setting/media/popups/AddDrawer"));
const AddAccessCodeDrawer = lazy(() => import("components/dashboard/setting/access-code/popups/AddDrawer"));
const AddRoleDrawer = lazy(() => import("components/dashboard/organisation/role/popups/AddDrawer"));
const AddGenerateDrawer = lazy(() => import("components/dashboard/announce/generate/popups/AddDrawer"));
const AddProductDrawer = lazy(() => import("components/dashboard/business/product/popups/AddDrawer"));
const AddOrderDrawer = lazy(() => import("components/dashboard/business/order/popups/AddDrawer"));
const AddCustomerDrawer = lazy(() => import("components/dashboard/customer/customer/popups/AddDrawer"));
const AddVoucherDrawer = lazy(() => import("components/dashboard/customer/voucher/popups/AddDrawer"));

const renderComponent = (element: any) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={RenderLoading()}>
        {element}
      </Suspense>
    </ErrorBoundary>
  )
}

const DrawerComponent = (props: any) => {
  const { type, size, data = {} } = props;
  switch(type) {
    case ADD_EMPLOYEE_DRAWER: 
      return renderComponent(<AddEmployeeDrawer size={size} {...data}/>)
    case ADD_NEWS_DRAWER:
      return renderComponent(<AddNewsDrawer size={size} {...data}/>)
    case ADD_TAG_DRAWER:
      return renderComponent(<AddTagDrawer size={size} {...data}/>)
    case ADD_CATEGORY_DRAWER:
      return renderComponent(<AddCategoryDrawer size={size} {...data}/>)
    case ADD_EMAIL_DRAWER:
      return renderComponent(<AddEmailDrawer size={size} {...data}/>)
    case ADD_MEDIA_DRAWER:
      return renderComponent(<AddMediaDrawer size={size} {...data}/>)
    case ADD_ACCESS_CODE_DRAWER:
      return renderComponent(<AddAccessCodeDrawer size={size} {...data}/>)
    case ADD_ROLE_DRAWER:
      return renderComponent(<AddRoleDrawer size={size} {...data}/>)
    case ADD_GENERATE_DRAWER:
      return renderComponent(<AddGenerateDrawer size={size} {...data}/>)
    case ADD_PRODUCT_DRAWER:
      return renderComponent(<AddProductDrawer size={size} {...data}/>)
    case ADD_ORDER_DRAWER:
      return renderComponent(<AddOrderDrawer size={size} {...data}/>)
    case ADD_CUSTOMER_DRAWER:
      return renderComponent(<AddCustomerDrawer size={size} {...data}/>)
    case ADD_VOUCHER_DRAWER:
      return renderComponent(<AddVoucherDrawer size={size} {...data}/>)
  }
  
  return <></>
}

export default DrawerComponent;