import { FormattedMessage, useIntl } from 'react-intl'

export const t = (message: string) => {
  return <FormattedMessage id={message} />
}

export const useFormatMessage = (param: any) => {
  const intl = useIntl()
  return intl.formatMessage(param)
}
