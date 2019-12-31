import { FormComponentProps, ActionFormHOC } from "./ActionForm"
import React from "react";
import { GQLNewServiceActionInput, GQLAddFieldTypeActionInput, GQLRequiredFieldTypeActionInput, GQLOptionalFieldTypeActionInput, GQLDeleteFieldTypeActionInput, GQLRemoveDefaultFieldTypeActionInput } from "../hooks";
import { FormControl, TextField } from "@material-ui/core";
import TypeSelector from "./TypeSelector";
import FieldSelector from "./FieldSelector";

type FieldInputTypes = GQLRequiredFieldTypeActionInput | GQLOptionalFieldTypeActionInput 
  | GQLDeleteFieldTypeActionInput | GQLRemoveDefaultFieldTypeActionInput;

function FieldTypeActionFormHOC<I extends FieldInputTypes>() {
  const InnerComponent = ActionFormHOC(
    function (props: FormComponentProps<I>) {
      return (
        <React.Fragment>
          <TypeSelector
            types={props.types}
            handleChange={props.handleRenameSetType}
            value={props.value.typeName}
          />
          <FieldSelector
            types={props.types}
            handleChange={props.handleChange('name')}
            value={props.value.name}
            selectedType={props.value.typeName}
          />
        </React.Fragment>
      );
    }
  );

  return InnerComponent;
}

export default FieldTypeActionFormHOC;
