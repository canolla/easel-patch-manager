import { connect } from "react-redux";

import { dispatchUpdateSwitch } from "../store/dispatch";
import { State } from "../store/reducer";

import { SwitchValue } from "../types";
import { LabelText } from "./labelText";

export interface ToggleSwitchProps {
    color: string;
    top: number;
    left: number;

    topOption?: string;
    middleOption?: string
    bottomOption?: string;

    module: string;
    param: string;
    twoWay?: boolean;

    value: SwitchValue;
    onChange: (value: SwitchValue) => void;


    dispatchUpdateSwitch: (module: string, param: string, value: SwitchValue) => void;
}

const TOGGLE_HEIGHT = 50;
const TOGGLE_WIDTH = 20;
const TOGGLE_HANDLE_RADIUS_RATIO = 0.75;


export const ToggleSwitchImpl = (props: ToggleSwitchProps) => {
    const { color, left, top, value, topOption, middleOption, bottomOption, module, param, twoWay, onChange, dispatchUpdateSwitch } = props;

    let cy = TOGGLE_WIDTH / 2;

    if (value === "middle") {
        cy = TOGGLE_HEIGHT / 2;
    }
    else if (value === "bottom") {
        cy = TOGGLE_HEIGHT - (TOGGLE_WIDTH / 2);
    }

    const onClick = () => {
        switch (value) {
            case "bottom": return dispatchUpdateSwitch(module, param, "top");
            case "middle": return dispatchUpdateSwitch(module, param, "bottom");
            case "top": return dispatchUpdateSwitch(module, param, twoWay ? "bottom" : "middle");
        }
    }


    return <g transform={`translate(${left}, ${top})`} onClick={onClick}>
        <rect className="easel-toggle-bg"
            fill={"#dedede"}
            height={TOGGLE_HEIGHT}
            width={TOGGLE_WIDTH}
            rx={TOGGLE_WIDTH / 2}
            stroke="var(--color-outline)"
            x={0}
            y={0} />
        <circle
            cx={TOGGLE_WIDTH / 2}
            cy={cy}
            r={TOGGLE_HANDLE_RADIUS_RATIO * TOGGLE_WIDTH / 2}
            fill={color}
            stroke="var(--color-outline)"
            />
        {topOption &&
            <LabelText
                x={TOGGLE_WIDTH + 15}
                y={TOGGLE_WIDTH / 2}
                text={topOption}
                alignment="middle"
                />
        }
        {middleOption &&
            <LabelText
                x={TOGGLE_WIDTH + 15}
                y={(TOGGLE_HEIGHT / 2)}
                text={middleOption}
                alignment="middle"
                />
        }
        {bottomOption &&
            <LabelText
                x={TOGGLE_WIDTH + 15}
                y={TOGGLE_HEIGHT - TOGGLE_WIDTH / 2}
                text={bottomOption}
                alignment="middle"
                />
        }
    </g>
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
        value: (state.patch as any)[ownProps.module]?.[ownProps.param],
    }
}

const mapDispatchToProps = {
    dispatchUpdateSwitch,
};

export const ToggleSwitch = connect(mapStateToProps, mapDispatchToProps)(ToggleSwitchImpl);