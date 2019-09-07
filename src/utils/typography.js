import Typography from "typography"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  bodyFontFamily: ["Roboto Mono"],
  headerFontFamily: ["Roboto Mono"],
  headerWeight: 400,
  googleFonts: [
    { name: "Roboto Mono", styles: ["400", "400i", "700", "700i"] },
  ],
})

export default typography
