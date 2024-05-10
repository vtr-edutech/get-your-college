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
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import UserModel from "@/models/UserModel";
import ChoiceListModel from "@/models/ChoiceListModel";

export async function POST(req) {
  try {
    const data = await req.json();

    const userSession = await getServerSession(authOptions);
    const userId = await userSession?.user?.id;

    let buffer;
    if (data.type === "cutoff") {
        
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
              <Text style={{ fontSize: "14px" }}>Name: {data.name}</Text>
              <Text style={{ fontSize: "14px" }}>
                Register No.: {data.registerNo}
              </Text>
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
                    paddingLeft: "5px",
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
                    paddingLeft: "5px",
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
                    paddingLeft: "5px",
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
                    paddingLeft: "5px",
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
                    paddingLeft: "5px",
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
                    paddingLeft: "5px",
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
                    paddingLeft: "5px",
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
                    paddingLeft: "5px",
                  }}
                >
                  {data.cutoff}
                </Text>
              </View>
              <Link
                src='https://www.youtube.com/c/A2KDK'
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                  flexDirection: "row",
                }}
              >
                <Image
                  alt='YT'
                  style={{
                    width: 22,
                    height: 15,
                  }}
                  src={"https://www.getyourcollege.com/yt.png"}
                />
                <Text
                  color='blue'
                  style={{
                    fontSize: "8px",
                  }}
                >
                  {" "}
                  Official Youtube Channel | Admission & Counselling - Guides,
                  Updates
                </Text>
              </Link>
            </Page>
          </Document>
        );

        UserModel.findByIdAndUpdate(userId, {
          $push: {
            cutoff: {
              physics: data.physics,
              chemistry: data.chemistry,
              maths: data.maths
            }
          }
        }).then(result => {
          if (result) {
            console.log("CUTOFF: ", data.name + ' cutoff updated!');
          } else {
            console.log("CUTOFF: ", data.name + ' cutoff was not updated!');
          }
        }).catch(error => {
          console.error("CUTOFF: ", data.firstName + ' ' + data.lastName + ' cutoff update failed!' + err);
        });
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
                    fontSize: "10px",
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
                    fontSize: "10px",
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
                    fontSize: "10px",
                    textAlign: "left",
                    width: "33%",
                    paddingLeft: "5px",
                  }}
                >
                  Branch Name
                </Text>
              </View>
              {data.colleges.map((college, i) => (
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
                  key={i}
                >
                  <Text
                    style={{
                      fontWeight: "medium",
                      fontSize: "9px",
                      textAlign: "left",
                      width: "11%",
                      paddingLeft: "5px",
                    }}
                  >
                    {i + 1}
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
                    {college["College Code"]}
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
                    {college["College Name"]}
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
                    {college["Branch Name"]}
                  </Text>
                </View>
              ))}
              <Link src='https://www.youtube.com/c/A2KDK' style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                flexDirection: "row"
              }}>
                <Image alt='YT' style={{
                    width: 22,
                    height: 15
                }} src={"https://www.getyourcollege.com/yt.png"} />
                <Text color="blue" style={{
                    fontSize: "8px",
                }}>
                  {" "}
                  Official Youtube Channel | Admission & Counselling - Guides,
                  Updates
                </Text>
              </Link>
              <Text style={{
                  fontSize: "8px",
                  marginTop: "5px"
              }}>
                NOTE: This data is based on 2023 TNEA Vacancy list. 
                Data available in this PDF may not exactly correspond to TNEA choice list that you may have generated.
                Consider this PDF as a trial and a point of reference only. Make careful choices when selecting choice list 
                during the time of couselling. Consider this choice list generation through Get Your College as a trial.
              </Text>
            </Page>
          </Document>
        );
        
        ChoiceListModel.create({
          userId: userId,
          list: data.colleges.map(college => ({
            collegeCode: college["College Code"],
            branchCode: college["Branch Code"]
          }))
        }).then(res => {
          if (res) {
            console.log("CHOICE: ", data.name + ' choice list updated!');
          }
        }).catch(err => {
          console.error("CHOICE: ", data.name + ' choice list failed to update!' + err);
        });
    }

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      `attachment; filname=${data.name + (data.type === "cutoff"?' Cutoff':' Choice List')}.pdf`
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
