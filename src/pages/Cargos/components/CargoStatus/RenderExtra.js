import {translate} from "../../../../utils/translate";

export const RenderExtra = (props) => {
    const { extra } = props;

    const fields = Object.keys(extra);

    return (
        <div>
            <hr/>
            {fields.map( (item, index) => {
                const info = extra[item];
                const title = info.title ? translate(info.title) : null;
                const value = info.value ? info.value : null;
                return (
                    <div key={index}><b>{title}</b>:{value}</div>
                )
            })}
        </div>
    );
}
