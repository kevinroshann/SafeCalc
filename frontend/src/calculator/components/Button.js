import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const getStyleName = (btn) => {
    const className = {
        '=': 'equals',
        'x': 'opt',
        '-': 'opt',
        '+': 'opt',
        '/': 'opt',
    };
    return className[btn];
};

const Button = ({ value }) => {
    const { calc, setCalc } = useContext(CalcContext);

    // Function to handle comma (decimal point) button click
    const commaClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
        });
    };

    // Function to handle reset (clear) button click
    const resetClick = () => {
        setCalc({
            sign: '',
            num: 0,
            res: 0,
        });
    };

    const percentClick = () => {
        setCalc({
            num: (calc.num / 100),
            res: (calc.res / 100),
            sign: ''
        })
    }

    const invertClick = () => {
        setCalc({
            num: calc.num ? calc.num * -1 : 0,
            res: calc.res ? calc.res * -1 : 0,
            sign: ''
        })
    }

    const signClick = () => {
        setCalc({
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0
        })
    }

    const numberClick = () => {
        setCalc({
            ...calc,
            num: calc.num !== 0 && value !== 0 ? Number(calc.num.toString() + value.toString()) : value,
        })
    }

    const equalsClick = () => {
        if (calc.res && calc.num) {
            const math = (a, b, sign) => {
                const result = {
                    '+': (a, b) => a + b,
                    '-': (a, b) => a - b,
                    'x': (a, b) => a * b,
                    '/': (a, b) => a / b,
                }
                return result[sign](a, b);
            }

            setCalc({
                res: math(calc.res, calc.num, calc.sign),
                sign: '',
                num: 0
            })
        } 
    }

    // Main function that handles button clicks
    const handelBtnClick = () => {
        const results = {
            '.' : commaClick,
            'C' : resetClick,
            '=' : equalsClick,
            '%' : percentClick,
            '+-': invertClick
        };
        // Check if the `value` has an associated function, then call it
        if (results[value]) {
            results[value](); // Call the function
        } else if (Number.isFinite(value)) {
            return numberClick();
        } else {
            return signClick();
        }
    };

    return (
        <button onClick={handelBtnClick} className={`${getStyleName(value)} button`}>
            {value}
        </button>
    );
};

export default Button;
