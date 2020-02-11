// FIXME: fix types of NumberFormat.
import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, TextField, Checkbox } from "@material-ui/core";
import { FieldDataInput } from "../hooks";
import NumberFormat from 'react-number-format';

const DEFAULT_TYPES = [
  "integer",
  "float",
  "string",
  "boolean"
];

type DEFAULT_TYPE_TYPE = "integer" | "float" | "string" | "boolean" | null;

type DefaultSelectorProps = {
  _default: FieldDataInput | null | undefined,
  handleChange: (_default: FieldDataInput) => void
};

const DefaultSelector = (props: DefaultSelectorProps) => {
  let defaultType: DEFAULT_TYPE_TYPE = null;
  let valueEditor = null;

  if (!props._default) {
    valueEditor = null;
  } else if (props._default.stringValue) {
    defaultType = "string";
    valueEditor = (
      <TextField
        id="defaultValue"
        label="Value of default"
        value={props._default.stringValue}
        onChange={(event) => {props.handleChange({stringValue: event.target.value})}}
        margin="normal"
      />
    )
  } else if (props._default.integerValue) {
    defaultType = "integer";
    valueEditor = (
      <NumberFormat 
        decimalScale={0}
        inputRef={(el: any) => (this as any).inputElem = el} 
        customInput={TextField} 
        onValueChange={values => {props.handleChange({integerValue: values.floatValue})}}
        value={props._default.integerValue}
      />
    )
  } else if (props._default.floatValue) {
    defaultType = "float";
    valueEditor = (
      <NumberFormat 
        inputRef={(el: any) => (this as any).inputElem = el} 
        customInput={TextField} 
        onValueChange={values => {props.handleChange({integerValue: values.floatValue})}}
        value={props._default.floatValue}
      />
    )
  } else if (props._default.booleanValue) {
    defaultType = "boolean";
    valueEditor = (
      <Checkbox
        id="optional"
        onChange={event => {props.handleChange({booleanValue: !event.target.value})}}
        checked={props._default.booleanValue}
      />
    )
  }

  function changeType(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "string") {
      props.handleChange({stringValue: ""});
    } else if (event.target.value === "integer") {
      props.handleChange({integerValue: 0});
    } else if (event.target.value === "float") {
      props.handleChange({floatValue: 0});
    } else if (event.target.value === "boolean") {
      props.handleChange({booleanValue: true});
    } else {
      props.handleChange({});
    }
  }

  return (
    <React.Fragment>
      <FormControl>
        <InputLabel htmlFor="select-field">Default Type</InputLabel>
        <Select
          value={defaultType}
          onChange={changeType}
          inputProps={{id: 'select-field'}}
        >
        {
          DEFAULT_TYPES.map(
            defaultType =>
              <MenuItem key={defaultType} value={defaultType} >
                {defaultType}
              </MenuItem>
          )
        }
        </Select>
      </FormControl>
      <FormControl>{valueEditor}</FormControl>
    </React.Fragment>
  );
}

export default DefaultSelector;