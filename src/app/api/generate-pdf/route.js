import { NextResponse } from "next/server";
import {
  Document,
  Image,
  Link,
  Page,
  Text,
  View,
  renderToBuffer
} from "@joshuajaco/react-pdf-renderer-bundled";

export async function POST(req) {
  try {
    const data = await req.json();

    let buffer;
    if (data.type === "cutoff") {
        buffer = await renderToBuffer(
          <Document
            author="Get Your College"
            creator="Get Your College"
            title={`${data.name} - Cutoff`}
          >
            <Page size={"A4"} style={{ padding: 20 }}>
              <Link src='https://www.getyourcollege.com'>
                <Image
                  src={"https://www.getyourcollege.com/logo_pdf.png"}
                  style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                  }}
                  alt='summa'
                />
              </Link>
              <Text style={{ fontSize: "14px" }}>Name: {data.name}</Text>
              <Text style={{ fontSize: "14px" }}>Register No.: {data.registerNo}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "6px",
                  marginTop: "12px",
                  borderRadius: "6px",
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    textAlign: "left",
                    width: "50%",
                    paddingLeft: "5px",
                  }}
                >
                  Subject
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    textAlign: "left",
                    width: "50%",
                    paddingLeft: "5px",
                  }}
                >
                  Marks
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "6px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "14px",
                    textAlign: "left",
                    width: "50%",
                    paddingLeft: "5px"
                  }}
                >
                  Physics
                </Text>
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "14px",
                    textAlign: "left",
                    width: "50%",
                    paddingLeft: "5px"
                  }}
                >
                  {data.physics}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "6px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "14px",
                    textAlign: "left",
                    width: "50%",
                    paddingLeft: "5px"
                  }}
                >
                  Chemistry
                </Text>
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "14px",
                    textAlign: "left",
                    width: "50%",
                    paddingLeft: "5px"
                  }}
                >
                  {data.chemistry}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "6px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "14px",
                    textAlign: "left",
                    width: "50%",
                    paddingLeft: "5px"
                  }}
                >
                  Maths
                </Text>
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "14px",
                    textAlign: "left",
                    width: "50%",
                    paddingLeft: "5px"
                  }}
                >
                  {data.maths}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "6px",
                  borderRadius: "6px",
                  borderTopLeftRadius: "0px",
                  borderTopRightRadius: "0px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "14px",
                    textAlign: "left",
                    width: "50%",
                    paddingLeft: "5px"
                  }}
                >
                  Cutoff
                </Text>
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "14px",
                    textAlign: "left",
                    width: "50%",
                    paddingLeft: "5px"
                  }}
                >
                  {data.cutoff}
                </Text>
              </View>
            </Page>
          </Document>
        );
    }

    if (data.type === "choice") {
        buffer = await renderToBuffer(
          <Document
            author='Get Your College'
            creator='Get Your College'
            title={`${data.name} - Cutoff`}
          >
            <Page size={"A4"} style={{ padding: 20 }}>
              <Link src='https://www.getyourcollege.com'>
                <Image
                  src={"https://www.getyourcollege.com/logo_pdf.png"}
                  style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                  }}
                  alt='summa'
                />
              </Link>
              <Text style={{ fontSize: "12px" }}>Name: {data.name}</Text>
              <Text style={{ fontSize: "12px", marginTop: "6px" }}>
                Register No.: {data.registerNo}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "5px",
                  border: "1px solid #e2e8f0",
                  marginTop: "10px",
                  borderRadius: "6px",
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "9px",
                    flexShrink: 1,
                    textAlign: "left",
                    width: "11%",
                    paddingLeft: "2px",
                  }}
                >
                  Choice Order
                </Text>
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "9px",
                    textAlign: "left",
                    width: "11%",
                    paddingLeft: "5px",
                  }}
                >
                  College Code
                </Text>
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "9px",
                    textAlign: "left",
                    width: "45%",
                    paddingLeft: "5px",
                  }}
                >
                  College Name
                </Text>
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "9px",
                    textAlign: "left",
                    width: "33%",
                    paddingLeft: "5px",
                  }}
                >
                  Branch Name
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: "5px",
                  borderBottom: "1px solid #e2e8f0",
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "8px",
                    textAlign: "left",
                    width: "11%",
                    paddingLeft: "5px",
                  }}
                >
                  1
                </Text>
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "8px",
                    textAlign: "left",
                    width: "11%",
                    paddingLeft: "5px",
                  }}
                >
                  1
                </Text>
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "8px",
                    textAlign: "left",
                    width: "45%",
                    paddingLeft: "5px",
                  }}
                >
                  Anna University Group of studies blah blah blah, Chennai, CEG campus
                </Text>
                <Text
                  style={{
                    fontWeight: "medium",
                    fontSize: "8px",
                    textAlign: "left",
                    width: "33%",
                    paddingLeft: "5px",
                  }}
                >
                  INFORMATION TECHNOLOGY (SS)
                </Text>
              </View>
            </Page>
          </Document>
        );
    }

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      `attachment; filname=${data.name + ' Cutoff'}.pdf`
    );
    return new NextResponse(buffer, { headers: headers, status: 200, statusText: "OK" });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { error: "Server error in generating PDF" },
      { status: 500 }
    );
  }
}
