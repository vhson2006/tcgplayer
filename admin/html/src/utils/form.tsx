export const defaultForm = (hookForm: any) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = hookForm();

  return {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    errors,
  }
}