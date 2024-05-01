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
    const { name, registerNo, physics, maths, chemistry, cutoff, type } = await req.json();
    
    const buffer = await renderToBuffer(
      <Document
        author="Get Your College"
        creator="Get Your College"
        title={`${name} - Cutoff`}
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
          <Text style={{ fontSize: "14px" }}>Name: {name}</Text>
          <Text style={{ fontSize: "14px" }}>Register No.: {registerNo}</Text>
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
                fontWeight: "medium",
                fontSize: "14px",
              }}
            >
              Subject
            </Text>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "14px",
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
              }}
            >
              Physics
            </Text>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "14px",
              }}
            >
              {physics}
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
              }}
            >
              Chemistry
            </Text>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "14px",
              }}
            >
              {chemistry}
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
              }}
            >
              Maths
            </Text>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "14px",
              }}
            >
              {maths}
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
              }}
            >
              Cutoff
            </Text>
            <Text
              style={{
                fontWeight: "medium",
                fontSize: "14px",
              }}
            >
              {cutoff}
            </Text>
          </View>
        </Page>
      </Document>
    );
    // const chunks = [];
    // for await (const chunk of buffer) {
    //   chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    // }
    // const bff = Buffer.from(chunks)
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      `attachment; filname=${name + ' Cutoff'}.pdf`
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
