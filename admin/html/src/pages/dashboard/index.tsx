import { Card, CardBody, HStack, SimpleGrid, Stack } from "@chakra-ui/react";
import AreaChart from "components/dashboard/components/AreaChart";
import BarChart from "components/dashboard/components/BarChart";
import LineChart from "components/dashboard/components/LineChart";

const DashboardPage = (props: any) => {
  
  return (
    <SimpleGrid columns={{base: 1, lg: 2}} spacing={{ base: '8', lg: '6' }}>
      <Card>
        <CardBody>
          <AreaChart/>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <BarChart/>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <LineChart/>
        </CardBody>
      </Card>
    </SimpleGrid>
  )
}

export default DashboardPage