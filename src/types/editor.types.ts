export interface EditorTool {
    id: string
    name: string
    description: string
    img?: string
    category?: string
    href: string // Add href for navigation
    beforeSrc?: string
    afterSrc?: string
  }
  
  export interface EditorToolsProps {
    tools?: EditorTool[]
    selectedToolId?: string
    className?: string
    // Remove onToolSelect callback
  }
  