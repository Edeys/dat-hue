import sharp from "sharp"
import { readdirSync, statSync } from "fs"
import { join, parse } from "path"
import { rename, rm } from "fs/promises"

const inputDir = "public/images"
const maxWidth = 1600
const quality = 80

const files = readdirSync(inputDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))

for (const file of files) {
  const inputPath = join(inputDir, file)
  const { name } = parse(file)
  const outputPath = join(inputDir, `${name}.jpg`)
  const tmpWritePath = join(inputDir, `_new_${name}.jpg`)

  const info = await sharp(inputPath).metadata()
  const originalSize = statSync(inputPath).size
  let pipeline = sharp(inputPath)

  if ((info.width ?? 0) > maxWidth) {
    pipeline = pipeline.resize(maxWidth)
  }

  await pipeline.jpeg({ quality, mozjpeg: true }).toFile(tmpWritePath)
  const newSize = statSync(tmpWritePath).size
  const pct = ((1 - newSize / originalSize) * 100).toFixed(1)

  await rm(inputPath)
  await rename(tmpWritePath, outputPath)

  console.log(`${file}: ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${pct}%)`)
}

console.log("Done!")
