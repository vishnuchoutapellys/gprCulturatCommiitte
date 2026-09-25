// Type declarations for image imports
declare module '*.jpg' {
  const value: string
  export default value
}
declare module '*.jpeg' {
  const value: string
  export default value
}
declare module '*.png' {
  const value: string
  export default value
}
declare module '*.svg' {
  import * as React from 'react'
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default content
}
declare module '*.webp' {
  const value: string
  export default value
}
