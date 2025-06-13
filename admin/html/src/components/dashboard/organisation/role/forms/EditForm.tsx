import { useEffect, useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as roleActions } from "components/dashboard/organisation/role/slice";
import PermissionsSelect from "components/dashboard/organisation/role/inputs/Permissions";
import TextInput from "modules/forms/TextInput";
import { useParams } from "react-router-dom";
import { jsonParse } from "utils/json";

const EditRoleForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ roleGroup, setRoleGroup ] = useState<any>();
  const { lang, submitRef } = props;
  const { detail } = useSelector((state: any) => state.roleReducer); 
  const { type, typeName, permissions } = detail;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 
  const { roleId } = useParams();

  useEffect(() => {
    if (typeName) {
      form.setValue('name', jsonParse(typeName)[lang])
    }
  }, [lang, typeName]);

  useEffect(() => {
    form.setValue('type', type)
  }, [type]);

  useEffect(() => {
    if (permissions) {
      setRoleGroup(permissions.map((v: any) => ({ 
        value: `${v.type} - ${v.group}`, 
        label: `${jsonParse(v.typeName)[activedLanguage]} - ${jsonParse(v.groupName)[activedLanguage]}`
      })))
    }
  }, [activedLanguage, permissions]);

  const editRoleHandler = (data: any) => {
    const editParams = {
      ...data,
      permissions: roleGroup,
      lang,
      id: roleId
    };
    dispatch(roleActions.UPDATE_ASYNC(editParams));
  }

  return (
    <form onSubmit={form.handleSubmit(editRoleHandler)}>
      <Card w='100%'>
        <CardBody>
          <Stack spacing="5" divider={<StackDivider />}>
            <TextInput {...form} typical='role-type' />
            <TextInput {...form} typical='role-name' />
            <PermissionsSelect value={roleGroup} onChange={(value: any) => setRoleGroup(value)}/>
            <VisuallyHidden>
              <Button type="submit" ref={submitRef}/>
            </VisuallyHidden>
          </Stack> 
        </CardBody>
      </Card>
    </form>
  )
}

export default EditRoleForm;