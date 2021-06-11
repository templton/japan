import { ExtraItem } from "./ExtraItem";

export const Dimensions = (props) => {
    const { extra, changeCargoFieldHandler } = props;

    return (
        <>
            <ExtraItem extra={extra} extraField="width" changeCargoFieldHandler={changeCargoFieldHandler} />
            <ExtraItem extra={extra} extraField="height" changeCargoFieldHandler={changeCargoFieldHandler} />
            <ExtraItem extra={extra} extraField="length" changeCargoFieldHandler={changeCargoFieldHandler} />
        </>
    );
}
