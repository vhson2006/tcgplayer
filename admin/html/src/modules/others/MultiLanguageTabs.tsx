import { useState } from "react"
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react"
import { supportLanguages, SupportLanguageTypes } from "commons/config"
import { t } from "commons/languages/helper"

const MultiLanguageTabs = (props: any) => {
  const { renderPanel } = props;
  const languageKeys = Object.keys(supportLanguages).filter((f: any) => f !== '/').sort()
  const [ lang, setLang ] = useState<any>(languageKeys[0]);

  return (
    <Tabs isLazy variant='soft-rounded' colorScheme='green'>
      <TabList>
        {
          languageKeys.map((k: any, idx: number) => (
              <Tab key={idx} onClick={() => setLang(k)}>
                {t(supportLanguages[k as keyof SupportLanguageTypes]?.name)}
              </Tab>
            ))
        }
      </TabList>
      <TabPanels>
        {
          languageKeys
            .map((f: any, idx: number) => (
              <TabPanel key={idx}>
                {renderPanel(lang)}
              </TabPanel>
            ))
        }
      </TabPanels>
    </Tabs>
  )
}

export default MultiLanguageTabs