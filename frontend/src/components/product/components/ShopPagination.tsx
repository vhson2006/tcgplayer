import PaginationButton from "modules/paginations/PaginationButton";
import { createQuery, usePath } from "utils/link";
import { FIRST_PAGE, PAGE_SIZE } from "commons/consts";
import { useRouter } from "next/router";

const ShopPagination = (props: any) => {
  const { total = 0 } = props;
  const { params } = usePath();
  const { page = FIRST_PAGE, size = PAGE_SIZE } = params;
  const router = useRouter();

  const gotoPage = (page: number) => {
    router.push(`${router.pathname}?${createQuery({ ...params, page, size })}`)
  }

  return (
    <PaginationButton page={page} totalPage={Math.ceil(total/size)} gotoPage={gotoPage} />
  );
};

export default ShopPagination