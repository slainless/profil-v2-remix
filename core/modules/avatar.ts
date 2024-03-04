import { createAvatar } from "@dicebear/core"
import * as initials from "@dicebear/initials"

// export const createShape = (seed: string) =>
//   createAvatar(shapes, {
//     seed,
//   }).toDataUriSync()

// export const createThumb = (seed: string) =>
//   createAvatar(thumbs, {
//     seed,
//   }).toDataUriSync()

export const createInitial = (seed: string) =>
  createAvatar(initials, {
    seed,
    scale: 90,
    backgroundType: ["gradientLinear"],
    fontWeight: 600,
    fontFamily: ["sans-serif"],
  }).toDataUriSync()
