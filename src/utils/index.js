import * as jose from "jose";

export function testNumber(number) {
  const regex = /^[5-9]\d{9}$/;
  return regex.test(number);
}

export async function issueJWT(userId, userName) {
  // const token = jwt.sign({
  //   id: userId,
  //   name: userName
  // }, process.env.JWT_SECRET, { expiresIn: '20m' })
  const token = await new jose.SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime('2hrs')
    .setSubject({ id: userId, name: userName })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return token;
}

export async function issueRegistrationJWT(userId) {
  const token = await new jose.SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime('1d')
    .setSubject({ id: userId })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return token;
}

export async function verifyRegistrationJWT(token) {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload.sub.id;
  } catch (error) {
    console.log("🚀 ~ verifyRegistrationJWT ~ error:", error);
    return null;
  }
}

export async function verifyJWT(token) {
  try {
    const decoded = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    // console.log("🚀 ~ verifyJWT ~ decoded:", decoded);
    return decoded.payload;
  } catch (error) {
    console.log("🚀 ~ verifyRegistrationJWT ~ error:", error);
    return null;
  }
}
