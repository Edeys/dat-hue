import sharp from "sharp"
import { readdirSync, mkdirSync, existsSync } from "fs"
import { join, parse } from "path"

const inputDir = "public/images"
const maxWidth = 1600
const quality = 80

if (!existsSync(inputDir)) {
  console.error("Input dir not found:", inputDir)
  process.exit(1)
}

const files = readdirSync(inputDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))

for (const file of files) {
  const inputPath = join(inputDir, file)
  const { name } = parse(file)
  const outputPath = join(inputDir, `${name}.jpg`)

  const info = await sharp(inputPath).metadata()
  let pipeline = sharp(inputPath)

  if ((info.width ?? 0) > maxWidth) {
    pipeline = pipeline.resize(maxWidth)
  }

  await pipeline
    .jpeg({ quality, mozjpeg: true })
    .toFile(outputPath + ".tmp")

  const originalSize = (await sharp(inputPath).toBuffer()).length
  const newSize = (await sharp(outputPath + ".tmp").toBuffer()).length
  const pct = ((1 - newSize / originalSize) * 100).toFixed(1)

  await sharp(outputPath + ".tmp").toFile(outputPath)

  const { rmSync } = await import("fs")
  rmSync(outputPath + ".tmp")

  console.log(`${file}: ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${pct}%)`)
}

console.log("Done!")
