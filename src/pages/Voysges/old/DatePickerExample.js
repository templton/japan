import React from "react"
import { DatePicker, Form } from "material-ui-pack"

export function DatePickerExample(props) {
  const [state, setState] = React.useState({
    myDate: props.date ? props.date : "1978-09-22",
    myClearableDate: null,
  })
  const [busy, setBusy] = React.useState(false)
  return (
    <Form
      onSubmit={() => setBusy(true)}
      state={state}
      setState={setState}
      busy={busy}
      margin="dense"
      debug
    >
      <DatePicker name="myDate" />
      {/*<DatePicker name="myClearableDate" clearable />*/}
    </Form>
  )
}
