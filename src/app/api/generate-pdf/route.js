import { NextResponse } from "next/server";
import {
  Document,
  Page,
  Text,
  renderToBuffer
} from "@joshuajaco/react-pdf-renderer-bundled";

export async function POST(req) {
  try {
    const buffer = await renderToBuffer(
      <Document>
        <Page size={"A4"}>
          <Text>myu content</Text>
        </Page>
      </Document>
    );
    // const chunks = [];
    // for await (const chunk of buffer) {
    //   chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    // }
    // const bff = Buffer.from(chunks)
    const headers = new Headers();
    headers.set("Content-Type", "application/octet-stream");
    headers.set(
      "Content-Disposition",
      `attachment; filname=${"Sachin-" + Math.floor(Math.random() * 1000)}.pdf`
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
