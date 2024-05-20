export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/login"],
      disallow: ["/otp", "/home", "/report", "/report/generate", "/colleges", "/settings", "/contact", "/discover"]   
    }
  }
}
