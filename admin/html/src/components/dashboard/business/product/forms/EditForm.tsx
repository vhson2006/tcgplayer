import { useEffect, useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as productActions } from "components/dashboard/business/product/slice";
import TextInput from "modules/forms/TextInput";
import ProductType from "components/dashboard/business/product/inputs/ProductType";
import ProductDuration from "components/dashboard/business/product/inputs/ProductDuration";
import ProductCategory from "components/dashboard/business/product/inputs/ProductCategory";
import ProductStatus from "components/dashboard/business/product/inputs/ProductStatus";
import ProductTag from "components/dashboard/business/product/inputs/ProductTag";
import { jsonParse } from "utils/json";
import Dropzone from "modules/forms/Dropzone";
import Gallery from "modules/others/Gallery";

const EditProductForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ uploadedFiles, setUploadedFiles ] = useState<any[]>([]);
  const [ images, setImages ] = useState<any[]>([]);
  const [ productType, setProductType ] = useState<any>();
  const [ productStatus, setProductStatus ] = useState<any>();
  const [ productCategory, setProductCategory ] = useState<any>();
  const [ productTags, setProductTags ] = useState<any>();
  const [ selectedDates, setSelectedDates ] = useState<Date[]>([new Date(), new Date()]);
  const { submitRef } = props;
  const { detail } = useSelector((state: any) => state.productReducer); 
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 

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
    setProductType({value: detail?.productType?.type, label: jsonParse(detail?.productType?.typeName)[activedLanguage]});
    setImages(detail.productImages)
  }, [
    detail.name, detail.description, detail.price, detail.discount, detail.quantity,
    detail.productType?.id, detail.productStatus?.id, detail.productTags?.length, detail.productCategory?.id,
    detail.productImages?.length, detail.startTime, detail.endTime
  ]);

  const editProductHandler = (data: any) => {
    const editParams = {
      ...data,
      id: detail.id,
      slug: detail.slug,
      type: productType?.value,
      status: productStatus?.value,
      category: productCategory?.value,
      tags: productTags?.map((v: any) => v.value),
      removeImages: detail.productImages
        .filter((p: any) => images.find((i: any) => i.id === p.id) === undefined)
        .map((e: any) => e.id),
      image: uploadedFiles[0]?.id,
      selectedDates,
    };
    dispatch(productActions.UPDATE_ASYNC(editParams));
    setUploadedFiles([]);
  }

  return (
    <form onSubmit={form.handleSubmit(editProductHandler)}>
      <Card w='100%'>
        <CardBody>
          <Stack spacing="5" divider={<StackDivider />}>
            <TextInput {...form} typical='product-name' />
            <TextInput {...form} typical='product-description' />
            <TextInput {...form} typical='product-price' />
            <TextInput {...form} typical='product-discount' />
            <TextInput {...form} typical='product-quantity' />
            <ProductType value={productType} onChange={setProductType} />
            <ProductDuration value={selectedDates} onChange={setSelectedDates}/>
            <ProductStatus value={productStatus} onChange={setProductStatus} />
            <ProductCategory value={productCategory} onChange={setProductCategory}/>
            <ProductTag value={productTags} onChange={setProductTags}/>
            <Gallery value={images} onChange={setImages}/>
            <Dropzone mx={1} width="full" isMulti={false} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
            <VisuallyHidden>
              <Button type="submit" ref={submitRef}/>
            </VisuallyHidden>
          </Stack> 
        </CardBody>
      </Card>
    </form>
  )
}

export default EditProductForm;