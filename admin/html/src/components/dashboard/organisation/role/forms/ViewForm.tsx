import { useEffect, useState } from "react";
import { Stack, StackDivider, CardBody, Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultForm } from "utils/form";
import PermissionsSelect from "components/dashboard/organisation/role/inputs/Permissions";
import TextInput from "modules/forms/TextInput";
import { jsonParse } from "utils/json";

const ViewRoleForm = (props: any) => {
  const form = defaultForm(useForm);
  const [ roleGroup, setRoleGroup ] = useState<any>();
  const { lang } = props;
  const { detail } = useSelector((state: any) => state.roleReducer); 
  const { type, typeName, permissions } = detail;
  const { activedLanguage } = useSelector((state: any) => state.languageReducer); 

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

  return (
    <Card w='100%'>
      <CardBody>
        <Stack spacing="5" divider={<StackDivider />}>
          <TextInput {...form} typical='role-type' isDisabled={true} bg={'gray.100'}/>
          <TextInput {...form} typical='role-name' isDisabled={true} bg={'gray.100'}/>
          <PermissionsSelect isDisabled={true} value={roleGroup} onChange={(value: any) => setRoleGroup(value)}/>
        </Stack> 
      </CardBody>
    </Card>
  )
}

export default ViewRoleForm;