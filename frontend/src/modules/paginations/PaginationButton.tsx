import { ButtonGroup, Button, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

const PaginationButton = (props: any) => {
  const { page, totalPage, gotoPage } = props;
  const [ current, setCurrent ] = useState<any>(0);
  const pageButton = (index: any) => (
    <Button
      key={index}
      variant={index + 1 == page ? "primary" : "secondary"}
      onClick={() => {
        if (index + 1 >= (current + 1) * 5 && current + 1 < Math.ceil(totalPage/5)) {
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
    if (current + 1 < Math.ceil(totalPage/5)) {
      setCurrent(current + 1)
    }
  }
  
  return (
    <ButtonGroup spacing="3" justifyContent="center" width={{ base: "full", md: "auto" }}>
      <IconButton variant="secondary" aria-label="Before pagination" onClick={beforePagination}>
        <MdOutlineNavigateBefore />
      </IconButton>
      {Array.from(Array(totalPage).keys()).splice(current * 5, 5).map(pageButton)}
      <IconButton variant="secondary" aria-label="Next pagination" onClick={nextPagination}>
        <MdOutlineNavigateNext />
      </IconButton>
    </ButtonGroup>
  );
};

export default PaginationButton
