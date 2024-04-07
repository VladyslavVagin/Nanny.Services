// @ts-nocheck
import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { WhatReason, FieldsGroup, RadioBtn, Label, GroupInputs, InputUser } from "./FormUser.styled";

const valuesField = [
  {
    id: 1,
    forLabel: "Career and business",
    forValue: "career",
  },
  {
    id: 2,
    forLabel: "Lesson for kids",
    forValue: "lesson",
  },
  {
    id: 3,
    forLabel: "Living abroad",
    forValue: "living",
  },
  {
    id: 4,
    forLabel: "Exams and coursework",
    forValue: "exams",
  },
  {
    id: 5,
    forLabel: "Culture, travel or hobby",
    forValue: "culture",
  },
];

const FormUser = () => {
  const initialValues = {
    reason: "",
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <WhatReason>
            What is your main reason for learning English?
          </WhatReason>
          <FieldsGroup>
            {valuesField.map((vl) => {
              return (
                <Label key={vl.id} htmlFor="reason">
                  <RadioBtn type="radio" name="reason" value={vl.forValue} />
                  {vl.forLabel}
                </Label>
              );
            })}
          </FieldsGroup>
          <GroupInputs>
            <InputUser
              type="text"
              name="name"
              placeholder="Full Name"
              required
              aria-label="Input for typing Full Name"
            />
            <InputUser
              type="email"
              name="email"
              placeholder="Email"
              required
              aria-label="Input for typing Email"
            />
            <InputUser
              type="tel"
              name="phone"
              placeholder="Phone number"
              required
              aria-label="Input for typing phone number"
            />
          </GroupInputs>
        </Form>
      </Formik>
    </>
  );
};

export default FormUser;
