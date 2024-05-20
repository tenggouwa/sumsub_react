import { useEffect, useState } from 'react';
import axios from 'axios';
import SumsubWebSdk from "@sumsub/websdk-react";
import './App.css';

function App() {
  const [token, setToken] = useState('_act-sbx-jwt-eyJhbGciOiJub25lIn0.eyJqdGkiOiJfYWN0LXNieC1iMjI4ODM4OC0zY2U1LTQ1ODEtODM3Zi1hOTM2MGQyOGIyN2UtdjIiLCJ1cmwiOiJodHRwczovL2FwaS5zdW1zdWIuY29tIn0.-v2')
  useEffect(() => {
    getToken()
  }, [])

  const applicantEmail = "";
  const applicantPhone = "";
  const getToken = async () => {
    const res = await axios.get('https://kyc.blockpayend.com/api/public/kyc/access-token?userId=1');
    if (res?.data?.success) {
      setToken(res?.data?.data?.token)
    }
  }
  return (
    <div className="App">
      {
        token && (
          <SumsubWebSdk
            accessToken={token}
            updateAccessToken={() => console.log("updateAccessToken")}
            expirationHandler={() => Promise.resolve(token)}
            config={{
              lang: "zh-tw",
              email: applicantEmail,
              phone: applicantPhone,
              i18n: {
                document: {
                  subTitles: {
                    IDENTITY: "Upload a document that proves your identity"
                  }
                }
              },
              onMessage: (type, payload) => {
                console.log("WebSDK onMessage", type, payload);
              },
              uiConf: {
                customCssStr:
                  ":root {\n  --black: #000000;\n   --grey: #F5F5F5;\n  --grey-darker: #B2B2B2;\n  --border-color: #DBDBDB;\n}\n\np {\n  color: var(--black);\n  font-size: 16px;\n  line-height: 24px;\n}\n\nsection {\n  margin: 40px auto;\n}\n\ninput {\n  color: var(--black);\n  font-weight: 600;\n  outline: none;\n}\n\nsection.content {\n  background-color: var(--grey);\n  color: var(--black);\n  padding: 40px 40px 16px;\n  box-shadow: none;\n  border-radius: 6px;\n}\n\nbutton.submit,\nbutton.back {\n  text-transform: capitalize;\n  border-radius: 6px;\n  height: 48px;\n  padding: 0 30px;\n  font-size: 16px;\n  background-image: none !important;\n  transform: none !important;\n  box-shadow: none !important;\n  transition: all 0.2s linear;\n}\n\nbutton.submit {\n  min-width: 132px;\n  background: none;\n  background-color: var(--black);\n}\n\n.round-icon {\n  background-color: var(--black) !important;\n  background-image: none !important;\n}"
              },
              onError: (error) => {
                console.error("WebSDK onError", error);
              }
            }}
            options={{ addViewportTag: false, adaptIframeHeight: true }}
            onMessage={(type, payload) => {
              console.log("onMessage", type, payload);
            }}
            onError={(data) => console.log("onError", data)}
          />
        )
      }
    </div>
  );
}

export default App;
