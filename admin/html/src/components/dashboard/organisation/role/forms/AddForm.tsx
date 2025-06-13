import { useState } from "react";
import { Stack, Button, StackDivider, VisuallyHidden } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { defaultForm } from "utils/form";
import { actions as roleActions } from "components/dashboard/organisation/role/slice";
import PermissionsSelect from "components/dashboard/organisation/role/inputs/Permissions";
import TextInput from "modules/forms/TextInput";
import { usePath } from "utils/link";

const AddRoleForm = (props: any) => {
  const dispatch = useDispatch();
  const form = defaultForm(useForm);
  const [ roleGroup, setRoleGroup ] = useState();
  const { submitRef } = props;
  const { params } = usePath();

  const addRoleHandler = (data: any) => {
    const addParams = {
      ...data,
      roleGroup,
      params,
    };
    dispatch(roleActions.ADD_ASYNC(addParams));
  }

  return (
    <form onSubmit={form.handleSubmit(addRoleHandler)}>
      <Stack spacing="5" divider={<StackDivider />}>
        <TextInput {...form} typical='role-type' />
        <TextInput {...form} typical='role-name' />
        <PermissionsSelect value={roleGroup} onChange={(value: any) => setRoleGroup(value)}/>
        <VisuallyHidden>
          <Button type="submit" ref={submitRef}/>
        </VisuallyHidden>
      </Stack> 
    </form>
  )
}

export default AddRoleForm;