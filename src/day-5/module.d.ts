declare interface Client {
  messages: Array<string>
  prompt: () => Promise<string>
  output: (s: number) => void
}
