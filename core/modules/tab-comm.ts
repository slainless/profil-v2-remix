/* eslint-disable @typescript-eslint/no-explicit-any */

export const createMessage = (data: any, channel: string) =>
  JSON.stringify({
    __data: data,
    __channel: channel,
  })

export const parseMessage = (data: any, channel: string) => {
  try {
    const d = JSON.parse(data)
    if (d.__channel == null || "__data" in d == false) return
    if (d.__channel !== channel) return
    return d.__data
  } catch (e) {
    return
  }
}

// export class WindowMessageChannel {
//   private channelID: string
//   private listener: (e: MessageEvent<any>) => void
//   private receivers: Array<(data: any) => void> = []

//   constructor(
//     private window: Window,
//     private channel: string,
//   ) {
//     this.channelID = randomUUID()

//     this.listener = (e) => {
//       try {
//         const data = JSON.parse(e.data)
//         if (data.__channelID == null || data.__channel == null) return
//         if (data.__channelID !== this.channelID || data.__channel != channel)
//           return
//         for (const receiver of this.receivers) receiver(data.data)
//       } catch (e) {
//         return
//       }
//     }

//     window.addEventListener("message", this.listener)
//   }

//   post(data: any) {
//     this.window.postMessage(
//       JSON.stringify({
//         __channelID: this.channelID,
//         __channel: this.channel,
//         data,
//       }),
//     )
//   }

//   onReceive(fn: (data: any) => void) {
//     this.receivers.push(fn)
//   }

//   close() {
//     window.removeEventListener("message", this.listener)
//   }
// }
