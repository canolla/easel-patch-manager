import * as React from "react";
import { connect } from "react-redux";
import { State } from "../store/reducer";
import { EaselKind } from "../types";

export interface SkewProps {
    kind: EaselKind;
    currentKind: EaselKind;
}

export const SkewImpl = (props: React.PropsWithChildren<SkewProps>) => {
    const { kind, currentKind, children } = props;

    return <g>
        { kind === currentKind && children }
    </g>
}

function mapStateToProps(state: State, ownProps: any) {
    if (!state) return {};

    return {
        ...ownProps,
        currentKind: state.kind,
    }
}

const mapDispatchToProps = {
};

export const Skew = connect(mapStateToProps, mapDispatchToProps)(SkewImpl);