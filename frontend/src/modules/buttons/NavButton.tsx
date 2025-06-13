import { Button, Tooltip } from '@chakra-ui/react'
import NextLink from "next/link";
import { makeUrl } from 'utils/link';
import { GeneralButton } from 'modules/buttons/GeneralButton';
import useTranslation from 'next-translate/useTranslation';

export const NavButton = (props: any) => {
  const { icon, label, href, permission, variant, isActived, onClick, isFull = true, ...buttonProps } = props
  const { t, lang } = useTranslation("common");

  if (href === '') {
    return (
      <GeneralButton
        isFull={isFull}
        variant={variant ? variant : "ghost-on-accent" } 
        icon={icon} 
        label={label} 
        onClick={onClick}
      />
    )
  }
    
  return isFull ? (
    <NextLink href={makeUrl(href, lang)} >
      <Button 
        className={isActived ? "class-actived" : ""} 
        variant={variant ? variant : "tertiary"} 
        justifyContent="start" 
        {...buttonProps}
        leftIcon={icon ? icon : <></>}
      >
        {t(label)}
      </Button>
    </NextLink>
  ) : (
    <Tooltip label={t(label)}>
      <NextLink href={makeUrl(href, lang)} >
        <Button 
          className={isActived ? "class-actived" : ""} 
          variant={variant ? variant : "tertiary"} 
          justifyContent="start" 
          {...buttonProps}
          leftIcon={icon ? icon : <></>}
        >
          {t(label)}
        </Button>
      </NextLink>
    </Tooltip>
  )
}
