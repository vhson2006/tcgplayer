import { 
  Popover, PopoverBody, PopoverContent, PopoverTrigger, PopoverArrow, 
  PopoverCloseButton, PopoverHeader, Button 
} from "@chakra-ui/react";
import { MdNotificationsNone } from "react-icons/md";
import NotificationList from "commons/layouts/dashboard/notification/components/NotificationList";
import { t } from "commons/languages/helper";

const NotificationComponent = (props: any) => {
  const { color, variant } = props;
  
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button color={color} variant={variant}>
          <MdNotificationsNone  />
        </Button>
      </PopoverTrigger>
      <PopoverContent >
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{t('notification.header')}</PopoverHeader>
        <PopoverBody>
          <NotificationList/>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default NotificationComponent;