import { useEffect, useState } from "react";
import { Stack, StackDivider, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import TextInput from "modules/forms/TextInput";
import ProductType from "components/dashboard/business/product/inputs/ProductType";
import ProductDuration from "components/dashboard/business/product/inputs/ProductDuration";
import ProductCategory from "components/dashboard/business/product/inputs/ProductCategory";
import ProductStatus from "components/dashboard/business/product/inputs/ProductStatus";
import ProductTag from "components/dashboard/business/product/inputs/ProductTag";
import { jsonParse } from "utils/json";
import Gallery from "modules/others/Gallery";

const ViewProductForm = (props: any) => {
  const form = defaultForm(useForm);
  const [ images, setImages ] = useState<any[]>([]);
  const [ productType, setProductType ] = useState<any>();
  const [ productStatus, setProductStatus ] = useState<any>();
  const [ productCategory, setProductCategory ] = useState<any>();
  const [ productTags, setProductTags ] = useState<any>();
  const [ selectedDates, setSelectedDates ] = useState<Date[]>([new Date(), new Date()]);
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { detail } = useSelector((state: any) => state.productReducer); 

  useEffect(() => {
    form.setValue('name', detail?.name);
    form.setValue('description', detail?.description);
    form.setValue('price', detail?.price);
    form.setValue('discount', detail?.discount);
    form.setValue('quantity', detail?.quantity);
    setProductType({value: detail?.productType?.type, label: jsonParse(detail?.productType?.typeName)[activedLanguage]});
    setProductStatus({value: detail?.productStatus?.type, label: jsonParse(detail?.productStatus?.typeName)[activedLanguage]});
    setProductCategory({value: detail?.productCategory?.type, label: jsonParse(detail?.productCategory?.typeName)[activedLanguage]});
    setProductTags(detail?.productTags?.map((v: any) => ({value: v.type, label: jsonParse(v.typeName)[activedLanguage]})));
    setSelectedDates([detail.startTime, detail.endTime]);
    setImages(detail.productImages);
  }, [
    detail.name, detail.description, detail.price, detail.discount, detail.quantity,
    detail.productType?.id, detail.productStatus?.id, detail.productTags?.length, detail.productCategory?.id,
    detail.productImages?.length, detail.startTime, detail.endTime
  ]);

  return (
    <Card w='100%'>
      <CardBody>
        <Stack spacing="5" divider={<StackDivider />}>
          <TextInput {...form} typical='product-name' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='product-description' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='product-price' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='product-discount' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='product-quantity' isDisabled={true} bg={'gray.100'}/>
          <ProductType value={productType} onChange={setProductType} isDisabled={true}/>
          <ProductDuration value={selectedDates} onChange={setSelectedDates} isDisabled={true}/>
          <ProductStatus value={productStatus} onChange={setProductStatus} isDisabled={true}/>
          <ProductCategory value={productCategory} onChange={setProductCategory} isDisabled={true}/>
          <ProductTag value={productTags} onChange={setProductTags} isDisabled={true}/>
          <Gallery value={images} onChange={setImages}/>
        </Stack> 
      </CardBody>
    </Card>
  )
}

export default ViewProductForm;