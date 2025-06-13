import { ButtonGroup, Button, IconButton } from "@chakra-ui/react";
import { FIRST_PAGE, PAGE_SIZE } from "commons/config";
import { useState } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { createQuery, usePath } from "utils/link";

export const PaginationButton = (props: any) => {
  const { total = 0 } = props;
  const [ current, setCurrent ] = useState<any>(0);
  const { params } = usePath();
  const navigate = useNavigate();
  const location = useLocation();
  const { page = FIRST_PAGE, size = PAGE_SIZE } = params;

  const gotoPage = (page: number) => {
    navigate(`${location.pathname}?${createQuery({ ...params, page, size })}`)
  }

  const pageButton = (index: any) => (
    <Button
      key={index}
      variant={index + 1 === parseInt(page) ? "primary" : "secondary"}
      onClick={() => {
        if (index + 1 >= (current + 1) * 5 && current + 1 < Math.ceil(Math.ceil(total/size)/5)) {
          setCurrent(current + 1)
        }
        gotoPage(index + 1)
      }}
    >
      {index + 1}
    </Button>
  );

  const beforePagination = () => {
    if (current > 0) {
      setCurrent(current - 1)
    }
  }
  const nextPagination = () => {
    if (current + 1 < Math.ceil(Math.ceil(total/size)/5)) {
      setCurrent(current + 1)
    }
  }

  return (
    <ButtonGroup
      spacing="3"
      justifyContent="space-center"
      width={{ base: "full", md: "auto" }}
    >
      <IconButton variant="secondary" aria-label="Before pagination" onClick={beforePagination}>
        <MdOutlineNavigateBefore />
      </IconButton>
      {Array.from(Array(Math.ceil(total/size)).keys()).splice(current * 5, 5).map(pageButton)}
      <IconButton variant="secondary" aria-label="Next pagination" onClick={nextPagination}>
        <MdOutlineNavigateNext />
      </IconButton>
    </ButtonGroup>
  );
};
export default PaginationButton;