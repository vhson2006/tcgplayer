import { ADD_ORDER_DRAWER } from "components/product/popups/CartList";
import dynamic from "next/dynamic";

const AddOrderDrawer = dynamic(() => import("components/product/popups/CartList"), { ssr: false });

const DrawerComponent = (props: any) => {
  const { type, size, data = {} } = props;
  switch(type) {
    case ADD_ORDER_DRAWER: 
      return <AddOrderDrawer size={size} {...data}/>
    
  }
  
  return <></>
}

export default DrawerComponent;