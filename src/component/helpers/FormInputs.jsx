import { useField } from "formik";
import React from "react";
import { NumericFormat, PatternFormat } from "react-number-format";

export const InputTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "error-show" : null}
      >
        {label}
      </label>
      <textarea
        className={meta.touched && meta.error ? "error-show" : null}
        {...field}
        {...props}
      ></textarea>
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputText = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  if (props.num === "num") {
    return (
      <>
        <NumericFormat
          {...field}
          {...props}
          allowLeadingZeros
          thousandSeparator=","
          decimalScale={4}
          autoComplete="off"
          // prefix={"P "}
          className={meta.touched && meta.error ? "error-show" : null}
        />

        <label htmlFor={props.id || props.name}>{label}</label>
        {meta.touched && meta.error ? (
          <span className="error-show">{meta.error}</span>
        ) : null}
      </>
    );
  }

  if (props.tin === "tin") {
    return (
      <>
        <PatternFormat
          {...field}
          {...props}
          format="###-###-###-###"
          allowEmptyFormatting
          mask="_"
          autoComplete="off"
          className={meta.touched && meta.error ? "error-show" : null}
        />

        <label htmlFor={props.id || props.name}>{label}</label>
        {meta.touched && meta.error ? (
          <span className="error-show">{meta.error}</span>
        ) : null}
      </>
    );
  }

  if (props.landline === "landline") {
    return (
      <>
        <PatternFormat
          {...field}
          {...props}
          format="(###) ####"
          allowEmptyFormatting
          mask="_"
          autoComplete="off"
          className={meta.touched && meta.error ? "error-show" : null}
        />

        <label htmlFor={props.id || props.name}>{label}</label>
        {meta.touched && meta.error ? (
          <span className="error-show">{meta.error}</span>
        ) : null}
      </>
    );
  }

  if (props.mobile === "mobile") {
    return (
      <>
        <PatternFormat
          {...field}
          {...props}
          format="+63 (###) #### ###"
          allowEmptyFormatting
          mask="_"
          autoComplete="off"
          className={meta.touched && meta.error ? "error-show" : null}
        />

        <label htmlFor={props.id || props.name}>{label}</label>
        {meta.touched && meta.error ? (
          <span className="error-show">{meta.error}</span>
        ) : null}
      </>
    );
  } else {
    return (
      <>
        <input
          {...field}
          {...props}
          className={meta.touched && meta.error ? "error-show" : null}
          autoComplete="off"
        />
        <label htmlFor={props.id || props.name}>{label}</label>

        {meta.touched && meta.error ? (
          <span className="error-show">{meta.error}</span>
        ) : null}
      </>
    );
  }
};

export const InputSelect = ({ label, onChange, ...props }) => {
  const [field, meta] = useField(props);

  if (
    props.name === "savings_category" ||
    props.name === "patronage_product_id" ||
    props.name === "supplier_id" ||
    props.name === "category_id" ||
    props.name === "orders_product_id" ||
    props.name === "orders_is_paid" ||
    props.name === "month" ||
    props.name === "capital_year" ||
    props.name === "posMember" ||
    props.name === "stocks_product_id" ||
    props.name === "product_supplier_id"
  ) {
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>

        <select
          {...field}
          {...props}
          className={meta.touched && meta.error ? "error-show" : null}
          onChange={(e) => {
            onChange(e);
            field.onChange(e);
          }}
        />

        {meta.touched && meta.error ? (
          <span className="error-show">{meta.error}</span>
        ) : null}
      </>
    );
  }
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>

      <select
        {...field}
        {...props}
        className={meta.touched && meta.error ? "error-show" : null}
        onChange={(e) => {
          // handleChangeLeave(e);
          field.onChange(e);
        }}
      />

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputFileUpload = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <span className="error--msg">{meta.error}</span>
      ) : null}
    </>
  );
};
export const MyRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input {...field} {...props} />
      <label
        htmlFor={props.id || props.name}
        className={meta.touched && meta.error ? "error-show" : ""}
      >
        {label}
      </label>

      {/* {meta.touched && meta.error ? (
        <p className="error-msg">{meta.error}</p>
      ) : null} */}
    </>
  );
};

export const MyRadioError = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const MyEmpty = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return meta.touched && meta.error ? (
    <span className="error-show">{meta.error}</span>
  ) : null;
};

export const MyRecpatcha = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div
        className="g-recaptcha"
        data-sitekey="6Lc7UxYjAAAAAB3xCb7xGm279HSHfsATbUjn_ss8"
      ></div>

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const MyCheckbox = ({ label, open, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "error-show w-8" : "w-8"}
      />
      <label className="label" htmlFor={props.id || props.name}>
        {label}
      </label>
      {/* <span htmlFor={props.id || props.name}>{label}</span> */}
      {meta.touched && meta.error ? (
        <small className="msg--error">{meta.error}</small>
      ) : null}
    </>
  );
};
