type ElfsightWidgetProps = {
  appId: string
  lazy?: boolean
  className?: string
}

export function ElfsightWidget({ appId, lazy = true, className }: ElfsightWidgetProps) {
  const widgetClass = className ? `${className} elfsight-app-${appId}` : `elfsight-app-${appId}`
  return (
    <div
      className={widgetClass}
      data-elfsight-app-lazy={lazy ? true : undefined}
    />
  )
}
