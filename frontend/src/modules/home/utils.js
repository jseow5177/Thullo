import labelColors from '../../assets/styles/labelColors.module.scss'

/**
 * Create Image Object
 */
const createImage = (url) => (
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = url
  })
)

/**
 * Convert angle in degree to radian
 * 
 * @param {Number} degree Angle in degree
 */
const getRadianValue = (degree) => {
  return (degree * Math.PI) / 180
}

/**
 * Crop image according to pixelCrop and rotation angle
 * 
 * Helper function from https://ricardo-ch.github.io/react-easy-crop/
 */
export async function getCroppedImage(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc) // Create image object
  const canvas = document.createElement('canvas') // Create HTML canvas
  const ctx = canvas.getContext('2d') // Get canvas context

  const maxSideLength = Math.max(image.width, image.height) // Get the max dimension of the image
  const safeLength = 2 * ((maxSideLength / 2) * Math.sqrt(2))

  /**
   * Sets each dimension of canvas to double the largest dimension of image
   * This creates a safe area for the image to rotate without being clipped by canvas context
   */
  canvas.width = safeLength
  canvas.height = safeLength

  // Move to center of canvas to allow rotate around the center
  ctx.translate(safeLength / 2, safeLength / 2)
  ctx.rotate(getRadianValue(rotation))
  // Go back to top left corner
  ctx.translate(-safeLength / 2, -safeLength / 2)

  // draw rotated image and store data.
  ctx.drawImage(image, safeLength / 2 - image.width * 0.5, safeLength / 2 - image.height * 0.5)
  const data = ctx.getImageData(0, 0, safeLength, safeLength)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeLength / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeLength / 2 + image.height * 0.5 - pixelCrop.y)
  )

  // As a blob
  return new Promise(resolve => {
    canvas.toBlob(file => resolve(file), 'image/jpeg')
  })
}

/**
 * Return an array of default labels when a board is created
 * 
 * @param {String} boardId The id of a board
 */
export const getBoardDefaultLabels = () => ([
  { title: 'Story', color: labelColors.LGreen },
  { title: 'Feature', color: labelColors.LYellow },
  { title: 'Bug', color: labelColors.LRed },
  { title: 'Frontend', color: labelColors.LPurple },
  { title: 'Backend', color: labelColors.LDarkBlue },
  { title: 'Task', color: labelColors.LLightBlue }
])