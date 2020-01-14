export function part1 (puzzleInput: string): number {
  const imageWidth = 25
  const imageHeight = 6
  const encodedImageLayers = puzzleInput
    .trim()
    .split('')
    .map(Number)
    .reduce(
      (
        layers: Array<Array<number>>,
        pixel: number,
        pixelIndex: number
      ): Array<Array<number>> => {
        const x = pixelIndex % imageWidth
        const y = pixelIndex % imageHeight
        if (x === 0 && y === 0) {
          layers.push([])
        }
        const layer = layers[layers.length - 1]
        layer.push(pixel)
        return layers
      },
      []
    )

  const zeroesPerLayer = encodedImageLayers
    .map(layer => {
      return layer
        .filter(pixel => pixel === 0)
        .length
    })
  const leastZeroesCount = Math.min(...zeroesPerLayer)
  const layerWithLeastZeroes = zeroesPerLayer.indexOf(leastZeroesCount)
  const layer1s = encodedImageLayers[layerWithLeastZeroes]
    .filter(pixel => pixel === 1)
    .length

  const layer2s = encodedImageLayers[layerWithLeastZeroes]
    .filter(pixel => pixel === 2)
    .length
  return layer1s * layer2s
}

export function part2 (puzzleInput: string) {
  const imageWidth = 25
  const imageHeight = 6
  const encodedImageLayers = puzzleInput
    .trim()
    .split('')
    .map(Number)
    .reduce(
      (
        layers: Array<Array<number>>,
        pixel: number,
        pixelIndex: number
      ): Array<Array<number>> => {
        const x = pixelIndex % imageWidth
        const y = pixelIndex % imageHeight
        if (x === 0 && y === 0) {
          layers.push([])
        }
        const layer = layers[layers.length - 1]
        layer.push(pixel)
        return layers
      },
      []
    )

  const compiledImage = encodedImageLayers
    .reduce(
      (compositeImage: Array<number>, layer: Array<number>) => {
        for (let i = 0; i < layer.length; i++) {
          if (compositeImage[i] === 2) {
            compositeImage[i] = layer[i]
          }
        }
        return compositeImage
      }, new Array(imageWidth * imageHeight).fill(2)
    )
  return compiledImage
}
