type AddWidgetDialogProps = {
  onSubmit: (widgetName: string) => void;
  show: boolean;
  setShow: (show: boolean) => void,
  widgets: Widget[]
};
