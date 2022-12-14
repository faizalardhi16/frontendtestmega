import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

export interface SelectProps{
    name?: string;
    value: string;
    onChange: (e: any) => void;
    onSelect?: (e: any) => void;
    label?: string;
    children: ReactNode;
}

const Select: React.FC<SelectProps> = (props) => {

    const {value, name, onChange, label, children} = props;

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
                <select className={styles.input} onChange={onChange}>
                    {children}
                </select>
            </div>
        </div>
    )
}

export default Select;