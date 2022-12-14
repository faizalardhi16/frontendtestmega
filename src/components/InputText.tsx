import React from "react";
import styles from "./styles.module.scss";

export interface InputTextProps{
    name?: string;
    value: string;
    placeholder: string;
    onChange: (e: any) => void;
    label?: string;
}

const InputText: React.FC<InputTextProps> = (props) => {

    const {placeholder, value, name, onChange, label} = props;

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
                <input className={styles.input} placeholder={placeholder} name={name} value={value} onChange={onChange}/>
            </div>
        </div>
    )
}

export default InputText;