declare interface Client {
  prompt: () => Promise<string>
  output: (s: number) => void
}
