import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { supportLanguages } from "commons/config";
import {renderAuthComponent, renderPrivateComponent, renderPublicComponent} from "commons/routes/render-component";
import { useSelector } from "react-redux";
import { targetHaveValueInSource } from "utils/array";

const NotFound = lazy(() => import("pages/not-found"));
const HomePage = lazy(() => import("pages"));

/* authentication */
// const RegisterPage = lazy(() => import("pages/authentication/register"));
const LoginPage = lazy(() => import("pages/authentication"));

/* dashboard */
const DashboardPage = lazy(() => import("pages/dashboard"));

/* organisation */
const EmployeePage = lazy(() => import("pages/dashboard/organisation/employee"));
const DetailEmployeePage = lazy(() => import("pages/dashboard/organisation/employee/detail"));
const EditEmployeePage = lazy(() => import("pages/dashboard/organisation/employee/edit"));
const RolePage = lazy(() => import("pages/dashboard/organisation/role"));
const DetailRolePage = lazy(() => import("pages/dashboard/organisation/role/detail"));
const EditRolePage = lazy(() => import("pages/dashboard/organisation/role/edit"));

/* announce */
const NewsPage = lazy(() => import("pages/dashboard/announce/news"));
const DetailNewsPage = lazy(() => import("pages/dashboard/announce/news/detail"));
const EditNewsPage = lazy(() => import("pages/dashboard/announce/news/edit"));
const GeneratePage = lazy(() => import("pages/dashboard/announce/generate"));
const DetailGeneratePage = lazy(() => import("pages/dashboard/announce/generate/detail"));
const EditGeneratePage = lazy(() => import("pages/dashboard/announce/generate/edit"));

/* business */
const ProductPage = lazy(() => import("pages/dashboard/business/product"));
const DetailProductPage = lazy(() => import("pages/dashboard/business/product/detail"));
const EditProductPage = lazy(() => import("pages/dashboard/business/product/edit"));
const OrderPage = lazy(() => import("pages/dashboard/business/order"));
const DetailOrderPage = lazy(() => import("pages/dashboard/business/order/detail"));
const EditOrderPage = lazy(() => import("pages/dashboard/business/order/edit"));

/* customer */
const CustomerPage = lazy(() => import("pages/dashboard/customer/customer"));
const DetailCustomerPage = lazy(() => import("pages/dashboard/customer/customer/detail"));
const EditCustomerPage = lazy(() => import("pages/dashboard/customer/customer/edit"));

const VoucherPage = lazy(() => import("pages/dashboard/customer/voucher"));
const DetailVoucherPage = lazy(() => import("pages/dashboard/customer/voucher/detail"));
const EditVoucherPage = lazy(() => import("pages/dashboard/customer/voucher/edit"));

/* setting */
const TagPage = lazy(() => import("pages/dashboard/setting/tag"));
const DetailTagPage = lazy(() => import("pages/dashboard/setting/tag/detail"));
const EditTagPage = lazy(() => import("pages/dashboard/setting/tag/edit"));

const CategoryPage = lazy(() => import("pages/dashboard/setting/category"));
const DetailCategoryPage = lazy(() => import("pages/dashboard/setting/category/detail"));
const EditCategoryPage = lazy(() => import("pages/dashboard/setting/category/edit"));

const EmailPage = lazy(() => import("pages/dashboard/setting/email"));
const DetailEmailPage = lazy(() => import("pages/dashboard/setting/email/detail"));
const EditEmailPage = lazy(() => import("pages/dashboard/setting/email/edit"));

const SchedulePage = lazy(() => import("pages/dashboard/setting/comment"));
const AccessCodePage = lazy(() => import("pages/dashboard/setting/access-code"));
const DetailAccessCodePage = lazy(() => import("pages/dashboard/setting/access-code/detail"));
const EditAccessCodePage = lazy(() => import("pages/dashboard/setting/access-code/edit"));

const MediaPage = lazy(() => import("pages/dashboard/setting/media"));
const DetailMediaPage = lazy(() => import("pages/dashboard/setting/media/detail"));
const EditMediaPage = lazy(() => import("pages/dashboard/setting/media/edit"));

/* account */
// const ProfilePage = lazy(() => import("pages/dashboard/account"));

const RouterComponent = () => {
  const { permission } = useSelector((state: any) => state.authenticationReducer); 

  const baseRoute = [
    { path: "", element: renderPublicComponent(<HomePage/>), permission: false },
    { path: "authentication", element: renderAuthComponent(<LoginPage/>), permission: false },
    // { path: "authentication/register", element: renderAuthComponent(<RegisterPage/>), permission: false  },
    { path: "dashboard", element: renderPrivateComponent(<DashboardPage/>), permission: false },
    { path: "dashboard/organisation", element: renderPrivateComponent(<EmployeePage/>), permission: { employee: ['view'] }},
    { path: "dashboard/organisation/:employeeId", element: renderPrivateComponent(<DetailEmployeePage/>), permission: { employee: ['view'] } },
    { path: "dashboard/organisation/:employeeId/edit", element: renderPrivateComponent(<EditEmployeePage/>), permission: { employee: ['update'] } },

    { path: "dashboard/organisation/role", element: renderPrivateComponent(<RolePage/>), permission: { role: ['view'] } },
    { path: "dashboard/organisation/role/:roleId", element: renderPrivateComponent(<DetailRolePage/>), permission: { role: ['view'] } },
    { path: "dashboard/organisation/role/:roleId/edit", element: renderPrivateComponent(<EditRolePage/>), permission: { role: ['update'] } },

    { path: "dashboard/announce", element: renderPrivateComponent(<NewsPage/>), permission: { news: ['view'] } },
    { path: "dashboard/announce/:newsSlug", element: renderPrivateComponent(<DetailNewsPage/>), permission: { news: ['view'] } },
    { path: "dashboard/announce/:newsSlug/edit", element: renderPrivateComponent(<EditNewsPage/>), permission: { news: ['update'] } },

    { path: "dashboard/announce/generate", element: renderPrivateComponent(<GeneratePage/>), permission: { generate: ['view'] } },
    { path: "dashboard/announce/generate/:generateId", element: renderPrivateComponent(<DetailGeneratePage/>), permission: { generate: ['view'] } },
    { path: "dashboard/announce/generate/:generateId/edit", element: renderPrivateComponent(<EditGeneratePage/>), permission: { generate: ['update'] } },

    { path: "dashboard/business", element: renderPrivateComponent(<ProductPage/>), permission: { product: ['view'] } },
    { path: "dashboard/business/:productSlug", element: renderPrivateComponent(<DetailProductPage/>), permission: { product: ['view'] } },
    { path: "dashboard/business/:productSlug/edit", element: renderPrivateComponent(<EditProductPage/>), permission: { product: ['update'] } },

    { path: "dashboard/business/order", element: renderPrivateComponent(<OrderPage/>), permission: { order: ['view'] } },
    { path: "dashboard/business/order/:orderId", element: renderPrivateComponent(<DetailOrderPage/>), permission: { order: ['view'] } },
    { path: "dashboard/business/order/:orderId/edit", element: renderPrivateComponent(<EditOrderPage/>), permission: { order: ['update'] } },

    { path: "dashboard/customer", element: renderPrivateComponent(<CustomerPage/>), permission: { customer: ['view'] } },
    { path: "dashboard/customer/:customerId", element: renderPrivateComponent(<DetailCustomerPage/>), permission: { customer: ['view'] } },
    { path: "dashboard/customer/:customerId/edit", element: renderPrivateComponent(<EditCustomerPage/>), permission: { customer: ['update'] } },

    { path: "dashboard/customer/voucher", element: renderPrivateComponent(<VoucherPage/>), permission: { voucher: ['view'] } },
    { path: "dashboard/customer/voucher/:voucherId", element: renderPrivateComponent(<DetailVoucherPage/>), permission: { voucher: ['view'] } },
    { path: "dashboard/customer/voucher/:voucherId/edit", element: renderPrivateComponent(<EditVoucherPage/>), permission: { voucher: ['update'] } },

    { path: "dashboard/setting", element: renderPrivateComponent(<TagPage/>), permission: { tag: ['view'] } },
    { path: "dashboard/setting/:tagId", element: renderPrivateComponent(<DetailTagPage/>), permission: { tag: ['view'] } },
    { path: "dashboard/setting/:tagId/edit", element: renderPrivateComponent(<EditTagPage/>), permission: { tag: ['update'] } },

    { path: "dashboard/setting/category", element: renderPrivateComponent(<CategoryPage/>), permission: { category: ['view'] } },
    { path: "dashboard/setting/category/:categoryId", element: renderPrivateComponent(<DetailCategoryPage/>), permission: { category: ['view'] } },
    { path: "dashboard/setting/category/:categoryId/edit", element: renderPrivateComponent(<EditCategoryPage/>), permission: { category: ['update'] } },

    { path: "dashboard/setting/email", element: renderPrivateComponent(<EmailPage/>), permission: { email: ['view'] } },
    { path: "dashboard/setting/email/:emailId", element: renderPrivateComponent(<DetailEmailPage/>), permission: { email: ['view'] } },
    { path: "dashboard/setting/email/:emailId/edit", element: renderPrivateComponent(<EditEmailPage/>), permission: { email: ['update'] } },

    { path: "dashboard/setting/comment", element: renderPrivateComponent(<SchedulePage/>), permission: { comment: ['view'] } },

    { path: "dashboard/setting/access-code", element: renderPrivateComponent(<AccessCodePage/>), permission: { accesscode: ['view'] } },
    { path: "dashboard/setting/access-code/:accessCodeId", element: renderPrivateComponent(<DetailAccessCodePage/>), permission: { accesscode: ['view'] } },
    { path: "dashboard/setting/access-code/:accessCodeId/edit", element: renderPrivateComponent(<EditAccessCodePage/>), permission: { accesscode: ['update'] } },

    { path: "dashboard/setting/media", element: renderPrivateComponent(<MediaPage/>), permission: { media: ['view'] } },
    { path: "dashboard/setting/media/:mediaId", element: renderPrivateComponent(<DetailMediaPage/>), permission: { media: ['view'] } },
    { path: "dashboard/setting/media/:mediaId/edit", element: renderPrivateComponent(<EditMediaPage/>), permission: { media: ['update'] } },

    // { path: "dashboard/account", element: renderPrivateComponent(<ProfilePage/>), permission: false },
  ]
  const router = createBrowserRouter([
    ...Object.keys(supportLanguages).reduce((list: any, current) => {
      return [ 
        ...list, 
        { 
          path: current, 
          children: baseRoute.filter((b: any) => {
            if (b.permission === false) {
              return true;
            }

            return Object.keys(b.permission).reduce((pre: any, cur: any) => {
              if (pre === true) {
                return pre;
              }
              if (permission && permission.hasOwnProperty(cur)) {
                if (targetHaveValueInSource(b.permission[cur], permission[cur])) {
                  return true
                }
              }
              return false
            }, false)
          }) 
        } 
      ]
    }, []),
    { path: "*",  element: renderPublicComponent(<NotFound/>) }
  ]);

  return <RouterProvider router={router} />
};

export default RouterComponent;
