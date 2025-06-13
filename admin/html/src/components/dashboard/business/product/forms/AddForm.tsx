import { useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as productActions } from "components/dashboard/business/product/slice";
import TextInput from "modules/forms/TextInput";
import ProductType from "components/dashboard/business/product/inputs/ProductType";
import ProductStatus from "components/dashboard/business/product/inputs/ProductStatus";
import ProductCategory from "components/dashboard/business/product/inputs/ProductCategory";
import ProductTag from "components/dashboard/business/product/inputs/ProductTag";
import ProductDuration from "components/dashboard/business/product/inputs/ProductDuration";
import { usePath } from "utils/link";
import Dropzone from "modules/forms/Dropzone";

const AddProductForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ uploadedFiles, setUploadedFiles ] = useState<any[]>([]);
  const [ productType, setProductType ] = useState<any>();
  const [ productStatus, setProductStatus ] = useState<any>();
  const [ productCategory, setProductCategory ] = useState<any>();
  const [ productTags, setProductTags ] = useState<any>();
  const [ selectedDates, setSelectedDates ] = useState<Date[]>([new Date(), new Date()]);
  const { submitRef } = props;
  const { params } = usePath();

  const addProductHandler = (data: any) => {
    const addParams = {
      ...data,
      type: productType?.value,
      status: productStatus?.value,
      category: productCategory?.value,
      tags: productTags?.map((v: any) => v.value),
      selectedDates,
      image: uploadedFiles[0]?.id,
      params
    };
    dispatch(productActions.ADD_ASYNC(addParams));
  }

  return (
    <form onSubmit={form?.handleSubmit(addProductHandler)}>
      <Stack spacing="5" divider={<StackDivider />}>
        <TextInput {...form} typical='product-name' />
        <TextInput {...form} typical='product-description' />
        <TextInput {...form} typical='product-price' />
        <TextInput {...form} typical='product-discount' />
        <ProductType value={productType} onChange={setProductType} />
        <TextInput {...form} typical='product-quantity' />
        <ProductDuration value={selectedDates} onChange={setSelectedDates}/>
        <ProductStatus value={productStatus} onChange={setProductStatus} />
        <ProductCategory value={productCategory} onChange={setProductCategory}/>
        <ProductTag value={productTags} onChange={setProductTags}/>
        <Dropzone mx={1} width="full" isMulti={false} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
        <VisuallyHidden>
          <Button type="submit" ref={submitRef}/>
        </VisuallyHidden>
      </Stack> 
    </form>
  )
}

export default AddProductForm;