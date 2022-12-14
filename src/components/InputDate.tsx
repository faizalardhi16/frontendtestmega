import React from "react";
import styles from "./styles.module.scss";

export interface InputDateProps{
    name?: string;

    placeholder: string;
    onChange: (e: any) => void;
    label?: string;
}

const InputDate: React.FC<InputDateProps> = (props) => {

    const {placeholder, name, onChange, label} = props;

    const renderLabel = () => {
        if(label){
            return(
                <label className={styles.label}>
                    {label}
                </label>
            )
        }

        return null
    }

    return(
        <div className={styles.textInput}>
            <div className={styles.boxLabel}>
                {renderLabel()}
            </div>
            <div className={styles.boxInput}>
                <input type="date" className={styles.input} placeholder={placeholder} name={name} onChange={onChange}/>
            </div>
        </div>
    )
}

export default InputDate;